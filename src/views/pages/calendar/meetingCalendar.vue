<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import listPlugin from "@fullcalendar/list";

import {required} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import moment from "moment";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import {categories} from "./data-calendar";
import {meetingService} from "@/helpers/backend/meeting.service";
import {providerService} from "@/helpers/backend/provider.service";
import {calendarComputed, calendarMethods} from "@/state/helpers";
import Multiselect from "vue-multiselect";
import KeycloakUserApi from "@/helpers/backend/keycloak-user-api";
import eventbus from "@/eventbus";
import Footer from "@/components/footer";

/**
 * Calendar component
 */
export default {
  page: {
    title: "Calendar",
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {Footer, FullCalendar, Layout, PageHeader, Multiselect},
  data() {
    return {
      slotRequestModal: false,
      slotRequestListModal: false,
      param_id: this.$route.params.id,
      showSearchModal: false,
      searchTitle: "Arama",
      eventEditable: true,
      providerFilter: "",
      currentUser: {},
      userCanEdit: true,
      userCanView: true,
      keycloakUserApi: new KeycloakUserApi(),
      changeSlotRequest: {
        id: "",
        title: "",
        startDate: "",
        endDate: "",
        organizer: "",
        description: "",
        creator: "",
        meeting: "",
        requestStatus: "",
        meetingLink: ""
      },
      providers: [],
      recipientFilter: "",
      recipients: [],
      slotRequests: [],
      title: "Calendar",
      items: [
        {
          text: "Apps",
        },
        {
          text: "Calendar",
          active: true,
        },
      ],
      calEvents: [],
      // calendarEvents: this.EVENTS,
      calendarOptions: {
        customButtons: {
          searchButton: {
            text: 'Ara',
            click: this.openSearchModal,
          },
          listButton: {
            text: 'Ara',
            click: this.handleListViewSelected(),
          },
          nextSearchButton: {
            text: '>>',
            click: this.nextSearchButtonClicked,
          },
          previousSearchButton: {
            text: '<<',
            click: this.previousSearchButtonClicked,
          }
        },
        views: {
          listYear: {
            duration: {years: 2}
          }
        },
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listYear",
        },
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          bootstrapPlugin,
          listPlugin,
        ],
        viewDidMount: this.handleEventViewChanged,
        slotDuration: '00:15:00',
        initialView: "dayGridMonth",
        themeSystem: "bootstrap",
        events: this.getEvents,
        editable: true,
        locale: "tr",
        droppable: true,
        eventResizableFromStart: true,
        dateClick: this.handleAddEvent,
        eventClick: this.handleEventSelected,
        eventsSet: this.handleEvents,
        weekends: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
      },
      isUserParticipant: false,
      currentEvents: [],
      showModal: false,
      modalTitle: "",
      showRecipientsModal: false,
      externalRecipient: "",
      categories: categories,
      submitted: false,
      submit: false,
      edit: {},
      deleteId: {},
      event: {
        id: "",
        title: "",
        description: "",
        recipients: [],
        meetingProvider: {},
        slotRequests: [],
        start: "",
        end: "",
        category: "info",
        organizer: "",
        meetingURL: "",
        providerAccount: "",
        changeSlotRequest: {
          id: "",
          title: "",
          startDate: "",
          endDate: "",
          organizer: "",
          description: "",
          creator: "",
          meeting: "",
          requestStatus: "",
          meetingLink: ""
        }
      },
      searchParam: {
        title: null,
        description: null,
        recipient: null,
        queryObject: {
          pageSize: 10,
          pageNumber: 1
        }
      }
    };
  },
  validations: {
    event: {
      title: {required},
      meetingProvider: {required},
    },
  },
  computed: {
    ...calendarComputed
  },
  mounted() {
    this.getProviders();
    this.currentUser = JSON.parse(sessionStorage.getItem("authUser"));
    this.subscribeEvents();
  },
  methods: {
    ...calendarMethods,
    handleProviderFilterSelected(e) {
      let calendarApi = this.$refs.fullCalendar.getApi();
      const start = Date.parse(calendarApi.view.currentStart);
      const end = Date.parse(calendarApi.view.currentEnd);
      meetingService.getMeetingsByProviderIdBtwDates(e.id, start, end).then(resp => {
        calendarApi.removeAllEvents();
        resp.forEach(event => {
          calendarApi.addEvent({
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end
          })
        });
      })
    },
    getAllUsers() {
      this.keycloakUserApi.getAllUsers().then(users => {
        let recipients = [];
        users.forEach(user => {
          recipients.push({
            id: null,
            name: user.email
          });
          this.recipients = recipients;
        })
      });
    },
    handleSlotRequetsApproved(slotRequest) {
      this.createSlotRequestApproval(slotRequest, true);
    },
    handleSlotRequetsRejected(slotRequest) {
      this.createSlotRequestApproval(slotRequest, false);
    },
    handleListViewSelected() {

      // let api = this.$refs.fullCalendar.getApi();
      // api.removeAllEvents();
      // api.changeView("listYear")
    },
    nextSearchButtonClicked() {
      this.searchParam.queryObject.pageNumber++;
      this.handleSearch();
    },
    previousSearchButtonClicked() {
      this.searchParam.queryObject.pageNumber--;
      this.handleSearch();
    },
    openSearchModal() {
      this.showSearchModal = true;
    },

    handleProviderFilterRemoved(e) {
      let api = this.$refs.fullCalendar.getApi();
      api.refetchEvents();
    },
    subscribeEvents() {
      eventbus.$on('eventCreated', (payload) => {
        let event = payload.data;
        if (this.currentUser.email !== event.organizer) {
          let calendarApi = this.$refs.fullCalendar.getApi();

          switch (payload.actionType) {
            case 'CREATED':
              this.event.id = event.id;
              calendarApi.addEvent({
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end
              });
              break;
            case 'DELETED':
              let calendarEvent = calendarApi.getEventById(event.id);
              calendarEvent.remove();
              break;
            case 'UPDATED':
              let calendarEventUpdated = calendarApi.getEventById(event.id);
              calendarEventUpdated.remove();
              this.event.id = event.id;
              calendarApi.addEvent({
                id: this.event.id,
                title: event.title,
                start: event.start,
                end: event.end
              });
              break;
          }

        }
      });
    },
    handleEventViewChanged(obj) {
      if (obj.view.type === 'listYear') {
        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.removeAllEvents();
        this.searchParam.queryObject.pageNumber = 1;
        this.calendarOptions.headerToolbar = {
          left: "searchButton",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay, listButton",
        };
      } else {
        this.calendarOptions.headerToolbar = {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listYear",
        }
      }
    },
    handleSearchRecipientSelected(e) {
      this.searchParam.recipient = e.name;
    },
    handleSearch() {
      meetingService.searchMeetings(this.searchParam).then(resp => {
        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.removeAllEvents();
        resp.forEach(event => {
          calendarApi.addEvent({
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end
          })
        });
        this.calendarOptions.headerToolbar = {
          left: "searchButton previousSearchButton nextSearchButton",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay listYear",
        };
        this.showSearchModal = false;
      });
    },
    getEvents: function (info, successCallback, failureCallback) {
      meetingService.getMeetingsBtwDates(info.start.valueOf(), info.end.valueOf())
          .then(resp => {

            successCallback(
                resp ? resp : []
            );
            if (this.param_id) {
              this.handleEventSelected(this.param_id);
            }
          });
    },
    openRecipientsModal(e) {
      this.showRecipientsModal = true;
      this.recipients = this.recipients.filter(value => value.id && value.id != "");
    },
    hideRecipientsModal(e) {
      this.showRecipientsModal = false;
    },
    insertNewRecipient(e) {
      this.event.recipients.push({
        id: "",
        name: ""
      })
    },
    addRecipient(e) {
      this.event.recipients.push( {id:"",name:this.externalRecipient });
      this.recipients.push({id:"",name:this.externalRecipient });
      this.externalRecipient ="";
      this.showRecipientsModal = false;
    },
    /**
     * Modal form submit
     */
    // eslint-disable-next-line no-unused-vars
    createOrUpdateMeeting(e) {
      this.submitted = true;
      // stop here if form is invalid
      let request = JSON.parse(JSON.stringify(this.event));
      request.start = Date.parse(this.event.start);
      request.end = Date.parse(this.event.end);
      let calendarApi = this.$refs.fullCalendar.getApi();
      this.startLoad();
      if (this.event.id && this.event.id !== "") {
        meetingService.updateMeeting(request).then(response => {
          this.successmsg();
          this.showModal = false;
          calendarApi.refetchEvents();
        }).catch(reason => {
          this.errormsg(error.response.data.message)
        });

      } else {
        meetingService.createMeeting(request).then(response => {

          this.successmsg();
          this.showModal = false;
          calendarApi.refetchEvents();
        }).catch(error => {
          this.errormsg(error.response.data.message)
        });
      }
    },
    createSlotRequestApproval(slotRequest, isApproved) {
      this.startLoad();
      slotRequest.meetingId = this.event.id
      slotRequest.startDate = Date.parse(slotRequest.startDate);
      slotRequest.endDate = Date.parse(slotRequest.endDate);
      meetingService.createSlotRequestApproval(slotRequest, isApproved).then(result => {
        this.successmsg();
        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.refetchEvents();
        this.hideSlotListModal();
        this.hideModal();
      }).catch(error => {
        this.errormsg(error.response.data.message)
      });

    },
    // eslint-disable-next-line no-unused-vars
    hideModal(e) {
      this.submitted = false;
      this.showModal = false;
      this.eventEditable = false;
      this.setEventDefault();
      if (this.param_id) {
        this.param_id = null;
        this.$router.push({name: 'home'});
      }
    },
    hideSearchModal() {
      this.showSearchModal = false;
    },
    hideSlotRequestModal(e) {
      this.slotRequestModal = false;
    },
    createSlotChangeRequest(e) {
      this.startLoad();
      this.changeSlotRequest.title = this.createChangeMailTitle();
      this.changeSlotRequest.startDate = Date.parse(this.changeSlotRequest.startDate);
      this.changeSlotRequest.endDate = Date.parse(this.changeSlotRequest.endDate);
      this.changeSlotRequest.creator = this.currentUser.email;
      this.changeSlotRequest.organizer = this.event.organizer;
      this.changeSlotRequest.meetingId = this.event.id
      this.changeSlotRequest.title = this.createChangeMailTitle();
      this.changeSlotRequest.meetingLink = `http://localhost:9095/meeting/${this.event.id}`;
      //TODO enuma al
      this.changeSlotRequest.requestStatus = 'WAITING';
      meetingService.createChangeSlotRequest(this.changeSlotRequest).then(response => {
        this.successmsg();
        this.slotRequestModal = false;
        this.event.slotRequests.push(this.convertSlotRequestDTO(response));
      }).catch(error => {
        this.errormsg(error.response.data.message)
      });
    },
    deleteSlotRequest(id) {
      this.startLoad();
      meetingService.deleteSlotRequest(id).then(response => {
        this.successmsg();
        this.event.slotRequests = this.event.slotRequests.filter(sr => sr.id !== response.id);
        this.hideSlotListModal();

      }).catch(error => {
        this.errormsg(error.response.data.message)
      });
    },
    deleteMeeting(id) {
      this.startLoad();
      meetingService.deleteMeeting(id).then(response => {
        this.successmsg();
        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.refetchEvents();
        this.hideModal();
      }).catch(error => {
        this.errormsg(error.response.data.message)
      });
    },
    /**
     * Modal open for add event
     */
    handleAddEvent(info) {
      this.getAllUsers();
      if (info.date < new Date()) {
        this.errormsg('Geçmişe yönelik görüşme oluşturulamaz');
        return;
      }
      this.getActiveProviders();
      this.setEventDefault();
      this.eventEditable = true;
      this.event.start = info.dateStr.split('+')[0];
      this.event.end = info.dateStr.split('+')[0];
      this.modalTitle = "Görüşme Oluştur"
      this.showModal = true;

    },
    setEventDefault() {
      this.event.id = '';
      this.event.title = '';
      this.event.description = '';
      this.event.meetingURL = '';
      this.event.organizer = this.currentUser.email;
      this.event.recipients = [];
      this.event.meetingProvider = null;
    },
    getProviders() {
      providerService.getAll().then(resp => {
        this.providers = resp.map(provider => {
          return {
            name: provider.name,
            id: provider.id,
            meetingProviderType: provider.meetingProviderType,
            conferenceType: provider.conferenceType
          };
        })
      });
    },
    getActiveProviders() {
      providerService.getActiveProviders(this.currentUser.roleGroups).then(resp => {
        this.providers = resp.map(provider => {
          return {
            name: provider.name,
            id: provider.id,
            meetingProviderType: provider.meetingProviderType,
            conferenceType: provider.conferenceType
          };
        })
      });
    },
    dateRangeSelected(info) {
      debugger;
      console.log(info);
    },
    // kuullanıcı, rolü standart kullanıcı değilse, katılmcı veya eventi yaratansa edit yapabilir
    setUserPermissions() {
      this.isUserParticipant = this.isUserRecipient();
      this.userCanEdit = this.currentUser && (this.isUserOrganizerOrAdmin()
          || this.event.organizer === this.currentUser.email);
      this.userCanView = this.userCanEdit || this.isUserParticipant
    },
    isUserRecipient() {
      let recipients = this.event.recipients.filter(recipient => recipient.name === this.currentUser.email);
      return recipients && recipients.length > 0
    },
    isUserOrganizerOrAdmin() {
      let role = this.currentUser.roles.find(role => role === 'ADMIN' || role === 'ORGANIZER');
      return role && role.length > 0;
    },
    checkUserCanAsk() {
      return this.currentUser && this.event.organizer !== this.user.email && this.event.id !== "";
    },
    handleEventSelected(info) {
      const id = info && info.event ? info.event.id : info;
      this.getAllUsers();
      this.getProviders();
      meetingService.getMeetingById(id).then(resp => {
        this.eventEditable = info && info.event ? info.event.start >= new Date() : true;
        this.event = resp;
        this.event.start = moment(resp.start).format().split('+')[0];
        this.event.end = moment(resp.end).format().split('+')[0];
        this.event.changeSlotRequest = {};
        this.event.meetingProvider =
            {
              id: resp.meetingProvider.id,
              meetingProviderType: resp.meetingProvider.meetingProviderType,
              conferenceType: resp.meetingProvider.conferenceType,
              name: resp.meetingProvider.name
            };
        this.modalTitle = "Update"

        this.setUserPermissions();
        if (this.userCanView) {
          this.showModal = true;
        } else {
          this.setEventDefault();
        }
      });
    },

    createChangeMailTitle() {
      const start = moment(this.changeSlotRequest.startDate).format(('DD-MM-YYYY hh:mm'));
      const end = moment(this.changeSlotRequest.endDate).format(('DD-MM-YYYY hh:mm'));
      return `Change Meeting Date Request For: ${start} and ${end} `;
    },
    closeModal() {
      this.eventModal = false;
    },
    addSlotRequest: function () {


      this.changeSlotRequest = {
        id: "",
        title: "",
        startDate: "",
        endDate: "",
        organizer: "",
        description: "",
        creator: "",
        meeting: "",
        requestStatus: ""
      };
      this.slotRequestModal = true;

    },
    openSlotListModal() {
      this.slotRequestListModal = true;
      meetingService.getSlotRequests(this.event.id).then(slotList => {
        this.event.slotRequests = slotList.map(req => {
          return this.convertSlotRequestDTO(req);
        });
      });

    },
    hideSlotListModal() {
      this.slotRequestListModal = false;
    },
    convertSlotRequestDTO(slotReq) {
      return {
        id: slotReq.id,
        description: slotReq.description,
        startDate: moment(slotReq.startDate).format().split('+')[0],
        endDate: moment(slotReq.endDate).format().split('+')[0],
        requestStatus: slotReq.requestStatus,
        creator: slotReq.creator
      }
    },
    confirmSlot() {
      Swal.fire({
        title: "Are You Sure ?",
        text: "You won't be able to delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.deleteSlotRequest(this.changeSlotRequest.id);
          Swal.fire("Deleted!", "Event has been deleted.", "success");
        }
      });
    },
    confirMeet(eventId) {
      Swal.fire({
        title: "Are You Sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes!",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.value) {
          this.deleteMeeting(eventId);
        }
      });
    },

    /**
     * Show list of events
     */
    handleEvents(events) {
      this.currentEvents = events;
    },

    /**
     * Show successfull Save Dialog
     */
    successmsg() {
      Swal.close();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Operation Successfully Completed",
        showConfirmButton: false,
        timer: 1000,
      });
    },
    errormsg(msg) {
      Swal.close();
      Swal.fire({
        position: "center",
        icon: "error",
        title: msg,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    startLoad() {
      Swal.fire({
        title: "Operation In Progress",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });
    }
  }
  ,
}
;
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="app-calendar">
              <div class="mb-3">
                <label class="form-label">Conference Provider</label>
                <multiselect
                    v-model="providerFilter"
                    class="form-control form-select"
                    name="meetingProviderfilter"
                    :options="this.providers"
                    :multiple="true"
                    @select="this.handleProviderFilterSelected"
                    @remove="this.handleProviderFilterRemoved"
                    track-by="name"
                    label="name"
                    placeholder="Filter with Provider"
                >
                </multiselect>
              </div>
              <FullCalendar
                  ref="fullCalendar"
                  :options="calendarOptions"
              ></FullCalendar>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
        v-model="showModal"
        :title="this.modalTitle"
        title-class="text-black font-18"
        header-class="py-3 px-4 border-bottom-0"
        body-class="p-4"
        hide-footer
        centered
    >
      <form @submit.prevent="createOrUpdateMeeting">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="title">Başlık</label>
              <input
                  id="title"
                  v-model="event.title"
                  type="text"
                  class="form-control"
                  placeholder="Başlık Ekle"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="title">Desciption</label>
              <textarea
                  id="description"
                  v-model="event.description"
                  type="text"
                  class="form-control"
                  placeholder="Desciption Ekle"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="title">Organizatör</label>
              <input
                  id="organizer"
                  v-model="event.organizer"
                  type="text"
                  class="form-control"
                  placeholder="Organizatör Ekle"
                  :readonly="!this.userCanEdit"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="title">Etinlik Bağlantı Adresi</label>
              <input
                  id="meetingURL"
                  v-model="event.meetingURL"
                  type="text"
                  class="form-control"
                  :readonly="true"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label class="form-label"
              >Start Date</label>
              <b-form-input
                  v-model="event.start"
                  type="datetime-local"
                  id="start"
              ></b-form-input>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label class="form-label"
              >End Date</label>
              <b-form-input
                  v-model="event.end"
                  type="datetime-local"
                  id="end"
              ></b-form-input>
            </div>
          </div>

          <div class="col-12">
            <div class="mb-3">
              <label>Recipients</label>
              <multiselect
                  :readonly=!this.eventEditable
                  v-model="event.recipients"
                  :options="this.recipients"
                  track-by="name"
                  label="name"
                  :multiple="true"
                  placeholder="Add Recipient"
              ></multiselect>
              <b-button variant="light" @click="openRecipientsModal">Add Recipient</b-button>

            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label class="form-label">Conference Provider</label>
              <select
                  v-model="event.meetingProvider"
                  class="form-control form-select"
                  name="meetingProvider"
              >
                <option
                    v-for="option in this.providers"
                    :key="option.id"
                    :value="option"
                >{{ option.name }}
                </option
                >
              </select>
            </div>
          </div>
        </div>

        <div class="text-end">
          <b-button
              v-if="this.eventEditable && event.id !== '' && (currentUser.email === event.organizer || currentUser.roles.filter(value => value === 'STANDART_USER').length<=0)"
              variant="danger" id="btn-delete-meet-event" @click="confirMeet(event.id)"
          >Sil
          </b-button>
          <b-button variant="light" @click="hideModal">Close</b-button>
          <b-button v-if="this.eventEditable" type="submit" variant="success" class="ms-1">Save</b-button>
          <b-button v-if=" this.event.id !== '' "
                    @click="openSlotListModal" variant="success" class="ms-1">Change Requests
          </b-button>
        </div>
      </form>
    </b-modal>

    <b-modal
        v-model="slotRequestModal"
        title="Tarih Değiştirme İsteği"
        title-class="text-black font-18"
        header-border-variant="py-3 px-4 border-bottom-0"
        hide-footer
        body-class="p-4"
        centered
    >
      <form>
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="slotDescription">Description</label>
              <textarea
                  id="slotDescription"
                  v-model="changeSlotRequest.description"
                  type="text"
                  class="form-control"
              />
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="mb-3">
            <label class="form-label"
            >Start Date</label>
            <b-form-input
                v-model="changeSlotRequest.startDate"
                type="datetime-local"
                id="slotStart"
            ></b-form-input>
          </div>
        </div>
        <div class="col-12">
          <div class="mb-3">
            <label class="form-label"
            >End Date</label>
            <b-form-input
                v-model="changeSlotRequest.endDate"
                type="datetime-local"
                id="end"
            ></b-form-input>
            <div
                class="invalid-feedback"
            >
              This value is required.
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="slotRequestStatus">Status</label>
              <input
                  id="slotRequestStatus"
                  v-model="changeSlotRequest.requestStatus"
                  type="text"
                  class="form-control"
                  :readonly="true"
              />
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-6">
            <b-button variant="danger" id="req-btn-delete-event" @click="confirmSlot"
            >Sil
            </b-button
            >
          </div>
          <div class="col-6 text-end">
            <b-button
                variant="light"
                class="btn btn-light me-1"
                @click="hideSlotRequestModal"
            >Close
            </b-button>

            <b-button variant="success" @click="createSlotChangeRequest">Kaydet</b-button>
          </div>
        </div>
      </form>
    </b-modal>
    <b-modal
        v-model="slotRequestListModal"
        title="Tarih Değiştirme İstekleri"
        title-class="text-black font-18"
        header-border-variant="py-3 px-4 border-bottom-0"
        hide-footer
        body-class="p-4"
        centered
        size="xl"
    >
      <form>
        <div class="row">

          <div class="table-responsive">
            <table class="table mb-0">
              <thead>
              <tr>
                <th>Kullanıcı adı</th>
                <th>Başlangıç Tarihi</th>
                <th>Bitiş Tarihi</th>
                <th>Statüs</th>

              </tr>
              </thead>
              <tbody>
              <tr v-for="(slotRequest,index) in this.event.slotRequests" :key="slotRequest.id">
                <td><input class="form-control" v-model="slotRequest.creator"/></td>
                <td><input class="form-control" v-model="slotRequest.startDate" type="datetime-local"/></td>
                <td><input class="form-control" v-model="slotRequest.endDate" type="datetime-local"/></td>
                <td><input class="form-control" v-model="slotRequest.requestStatus"/></td>
                <td>
                  <b-button v-if="currentUser.email !== event.organizer && slotRequest.requestStatus === 'WAITING'"
                            variant="danger" id="btn-delete-event" @click="deleteSlotRequest(slotRequest.id)"
                  >Sil
                  </b-button>
                </td>

                <td>
                  <b-button v-if="currentUser.email === event.organizer && slotRequest.requestStatus === 'WAITING'"
                            variant="light"
                            @click="handleSlotRequetsApproved(slotRequest)">Approve
                  </b-button>
                </td>
                <td>
                  <b-button v-if="currentUser.email === event.organizer && slotRequest.requestStatus === 'WAITING'"
                            variant="light"
                            @click="handleSlotRequetsRejected(slotRequest)">Reject
                  </b-button>
                </td>

              </tr>
              </tbody>
            </table>
            <footer>
              <b-button
                  v-if=" this.event.id !== '' && this.currentUser.email !== this.event.organizer && this.isUserParticipant"
                  @click="addSlotRequest" variant="success" class="ms-1">Add
              </b-button>
            </footer>
          </div>
        </div>
      </form>
    </b-modal>

    <b-modal
        v-model="showRecipientsModal"
        title="Recipients"
        title-class="text-black font-18"
        header-class="py-3 px-4 border-bottom-0"
        body-class="p-4"
        hide-footer
        centered
    >
      <form>
        <div class="row">
          <input
              v-model="externalRecipient"
              type="text"
              class="form-control"
          />
          <div class="text-end">
          <b-button class="ms-1" variant="light" @click="addRecipient">Add</b-button>
          <b-button variant="light" @click="hideRecipientsModal">Close</b-button>
        </div>
        </div>
      </form>
    </b-modal>
    <b-modal
        v-model="showSearchModal"
        :title="searchTitle"
        title-class="text-black font-18"
        header-class="py-3 px-4 border-bottom-0"
        body-class="p-4"
        hide-footer
        centered
    >
      <form autocomplete="off">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="title">Title</label>
              <input
                  id="search-title"
                  v-model="searchParam.title"
                  type="text"
                  class="form-control"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="title">Desciption</label>
              <textarea
                  id="search-description"
                  v-model="searchParam.description"
                  type="text"
                  class="form-control"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label class="form-label"
              >Start Date</label>
              <b-form-input
                  v-model="searchParam.start"
                  type="datetime-local"
                  id="start"
              ></b-form-input>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label class="form-label"
              >End Date</label>
              <b-form-input
                  v-model="searchParam.end"
                  type="datetime-local"
                  id="end"
              ></b-form-input>
            </div>
          </div>

          <div class="col-12">
            <div class="mb-3">
              <label>Recipients</label>
              <multiselect
                  :multiple=false
                  :readonly=!this.eventEditable
                  :options="this.recipients"
                  v-model="recipientFilter"
                  @select="this.handleSearchRecipientSelected"
                  track-by="name"
                  label="name"
                  value="name"
                  placeholder="Add Recipient"
              ></multiselect>

            </div>
          </div>
        </div>

        <div class="text-end">
          <b-button variant="light" @click="hideSearchModal">Close</b-button>
          <b-button @click="handleSearch" variant="success" class="ms-1">Start Search</b-button>
        </div>
      </form>
    </b-modal>
  </Layout>
</template>
