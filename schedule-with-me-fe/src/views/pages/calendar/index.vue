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
// import { calendarEvents, categories } from "./data-calendar";
import {meetingService} from "@/helpers/fakebackend/meeting.service";
import {providerService} from "@/helpers/fakebackend/provider.service";
import {calendarComputed, calendarMethods} from "@/state/helpers";
import Multiselect from "vue-multiselect";
import KeycloakUserApi from "@/helpers/fakebackend/keycloak-user-api";
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
      eventEditable: true,
      providerFilter: "",
      currentUser: {},
      userCanEdit:true,
      userCanView:true,
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
        meetingLink:""
      },
      providers: [],
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
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          bootstrapPlugin,
          listPlugin,
        ],
        slotDuration: '00:15:00',
        initialView: "dayGridMonth",
        themeSystem: "bootstrap",
        events: this.getEvents,
        editable: true,
        locale: "tr",
        droppable: true,
        eventResizableFromStart: true,
        dateClick: this.addEvent,
        eventClick: this.handleEventSelected,
        eventsSet: this.handleEvents,
        dateSelection: this.dateRangeSelected,
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
      categories: categories,
      submitted: false,
      submit: false,
      newEventData: {},
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
          meetingLink:""
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

    this.keycloakUserApi.getAllUsers().then(users => {
      let recipients = [];
      users.forEach(user => {
        recipients.push({
          id: user.id,
          name: user.email
        });
        this.recipients = recipients;
      })
    });
  },
  methods: {
    ...calendarMethods,
    handleProviderFilterSelected(e) {
      if (e.conferenceType === 'SINGLE') {
        let api = this.$refs.fullCalendar.getApi();
        api.removeAllEvents();
      }
    },
    handleSlotRequetsApproved(slotRequest) {
      this.createSlotRequestApproval(slotRequest, true);
    },
    handleSlotRequetsRejected(slotRequest) {
      this.createSlotRequestApproval(slotRequest, false);
    },
    createSlotRequestApproval(slotRequest, isApproved) {
      slotRequest.meetingId = this.event.id
      slotRequest.startDate = Date.parse(slotRequest.startDate);
      slotRequest.endDate = Date.parse(slotRequest.endDate);
      meetingService.createSlotRequestApproval(slotRequest, isApproved).then(result => {
        this.successmsg();
        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.refetchEvents();
        this.hideSlotListModal();
        this.hideModal();
      });

    },
    handleProviderFilterRemoved(e) {
      let api = this.$refs.fullCalendar.getApi();
      api.refetchEvents();
      // api.changeView('timeGridWeek');
    },
    subscribeEvents() {
      eventbus.$on('eventCreated', (payload) => {
        let calendarApi = this.$refs.fullCalendar.getApi();
        let event = payload.data.data;
        this.currentEvents = calendarApi.addEvent({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end
        });
        console.log(payload);
      })
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
      this.event.recipients = this.recipients;
      this.showRecipientsModal = false;
    },
    /**
     * Modal form submit
     */
    // eslint-disable-next-line no-unused-vars
    createOrUpdateMeeting(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.event.start = Date.parse(this.event.start);
        this.event.end = Date.parse(this.event.end);
        let calendarApi = this.$refs.fullCalendar.getApi();
        if(this.event.id && this.event.id !== ""){
          meetingService.updateMeeting(this.event).then(response => {
            this.successmsg();
            calendarApi.refetchEvents();

            this.showModal = false;
            this.event = {};
            this.newEventData = {};
          }).catch(reason => {
            console.log(reason);
          });

        }else {
          meetingService.createMeeting(this.event).then(response => {
            this.successmsg();
            calendarApi.refetchEvents();

            this.showModal = false;
            this.event = {};
            this.newEventData = {};
          }).catch(reason => {
            //TODO handle errors
            console.log(reason);
          });
        }




      }
      this.submitted = false;
      this.event = {};
    },
    // eslint-disable-next-line no-unused-vars
    hideModal(e) {
      this.$router.push({ name: 'home' });
      this.submitted = false;
      this.showModal = false;
      this.eventEditable = false;
      this.event = {};
    },
    hideSlotRequestModal(e) {
      this.slotRequestModal = false;
    },
    createSlotChangeRequest(e) {
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
      }).catch(reason => {
        //TODO handle errors
        console.log(reason);
      });
    },
    deleteSlotRequest(id){
      meetingService.deleteSlotRequest(id).then(response => {
        this.event.slotRequests = this.event.slotRequests.filter(sr => sr.id !== response.id );
        this.hideSlotListModal();
        console.log(response +" deleted");
      })
    },
    deleteMeeting(id){
      meetingService.deleteMeeting(id).then(response => {
        Swal.fire("Silindi!", "Görüşme başarıyla iptal edildi.", "success");

        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.refetchEvents();
        this.hideModal();
      });
    },
    /**
     * Modal open for add event
     */
    addEvent(info) {

      if(info.date < new Date()){
        this.errormsg('Geçmişe yönelik görüşme oluşturulamaz');
        return;
      }
      this.setEventDefault();
      this.eventEditable = true;
      this.newEventData = info;
      this.event.start = info.dateStr.split('+')[0];
      this.event.end = info.dateStr.split('+')[0];
      this.modalTitle = "Görüşme Oluştur"
      this.showModal = true;
      this.getActiveProviders();
    },
    setEventDefault() {
      this.event.id = '';
      this.event.title = '';
      this.event.description = '';
      this.event.meetingURL = '';
      this.event.organizer = this.currentUser.email;
      this.event.recipients=[];
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
      providerService.getActiveProviders().then(resp => {
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
    isUserRecipient(){
      let recipients = this.event.recipients.filter(recipient => recipient.name === this.currentUser.email);
      return recipients &&  recipients.length >0
    },
    isUserOrganizerOrAdmin(){
      let role = this.currentUser.roles.find(role => role === 'ADMIN' || role === 'ORGANIZER');
      return  role && role.length >0;
    },
    checkUserCanAsk() {
      return this.currentUser && this.event.organizer !== this.user.email && this.event.id !== "";
    },
    handleEventSelected(info) {


        this.getProviders();
        this.eventEditable = info.event.start >= new Date();
        meetingService.getMeetingById(info.event.id).then(resp => {
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
          this.modalTitle = "Güncelle"

          this.setUserPermissions();
          if(this.userCanView){
            this.showModal = true;
          }else{
            this.setEventDefault();
          }
        });
      },

    createChangeMailTitle() {
      //TODO ingilizce hale getir
      const start =  moment(this.changeSlotRequest.startDate).format(('DD-MM-YYYY hh:mm'));
      const end =  moment(this.changeSlotRequest.endDate).format(('DD-MM-YYYY hh:mm'));
      return `${start} ve ${end} Tarihleri için Değişiklik İsteği`;
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
      this.event.slotRequests = this.event.slotRequests.map(req => {
        return this.convertSlotRequestDTO(req);
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
        title: "Silmek İstediğinizden Etmek Emin Misiniz?",
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
        title: "Görüşmeyi İptal Etmek İstediğinizden Emin Misiniz?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Evet!",
        cancelButtonText:"Vazgeç"
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
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Event has been saved",
        showConfirmButton: false,
        timer: 1000,
      });
    },
    errormsg(msg) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: msg,
        showConfirmButton: false,
        timer: 1200,
      });
    },
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
                <label class="form-label">Konferans Sağlayıcı</label>
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
                    placeholder="Uygun Zaman için Filtreleme"
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
                  :class="{ 'is-invalid': submitted && $v.event.title.$error }"
              />
              <div
                  v-if="submitted && !$v.event.title.required"
                  class="invalid-feedback"
              >
                This value is required.
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="title">Açıklama</label>
              <textarea
                  id="description"
                  v-model="event.description"
                  type="text"
                  class="form-control"
                  placeholder="Açıklama Ekle"
                  :class="{ 'is-invalid': submitted && $v.event.description.$error }"
              />
              <div
                  v-if="submitted && !$v.event.description.required"
                  class="invalid-feedback"
              >
                This value is required.
              </div>
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
                  :class="{ 'is-invalid': submitted && $v.event.organizer.$error }"
              />
              <div
                  v-if="submitted && !$v.event.organizer.required"
                  class="invalid-feedback">
                This value is required.
              </div>
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
              >Başlangıç Tarihi</label>
              <b-form-input
                  v-model="event.start"
                  type="datetime-local"
                  id="start"
              ></b-form-input>
              <div
                  v-if="submitted && !$v.event.start.required"
                  class="invalid-feedback"
              >
                This value is required.
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label class="form-label"
              >Bitiş Tarihi</label>
              <b-form-input
                  v-model="event.end"
                  type="datetime-local"
                  id="end"
              ></b-form-input>
              <div
                  v-if="submitted && !$v.event.end.required"
                  class="invalid-feedback"
              >
                This value is required.
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="mb-3">
              <label>Katılımcılar</label>
              <multiselect
                  :readonly = !this.eventEditable
                  v-model="event.recipients"
                  :options="this.recipients"
                  track-by="name"
                  label="name"
                  :multiple="true"
                  placeholder="Katılımcı Ekle"
              ></multiselect>
              <b-button variant="light" @click="openRecipientsModal">Katılımcı Ekle</b-button>

              <div
                  v-if="submitted && !$v.event.title.required"
                  class="invalid-feedback">
                This value is required.
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label class="form-label">Konferans Sağlayıcı</label>
              <select
                  v-model="event.meetingProvider"
                  class="form-control form-select"
                  name="meetingProvider"
                  :class="{ 'is-invalid': submitted && $v.event.meetingProvider.errors }"
              >
                <option
                    v-for="option in this.providers"
                    :key="option.id"
                    :value="option"
                >{{ option.name }}
                </option
                >
              </select>
              <div
                  v-if="submitted && !$v.event.meetingProvider.required"
                  class="invalid-feedback"
              >
                This value is required.
              </div>
            </div>
          </div>
        </div>

        <div class="text-end">
          <b-button v-if="this.eventEditable && event.id !== '' && (currentUser.email === event.organizer || currentUser.roles.filter(value => value === 'STANDART_USER').length<=0)"
                    variant="danger" id="btn-delete-meet-event" @click="confirMeet(event.id)"
          >Sil
          </b-button>
          <b-button variant="light" @click="hideModal">Kapat</b-button>
          <b-button  v-if="this.eventEditable" type="submit" variant="success" class="ms-1">Kaydet</b-button>
          <b-button v-if=" this.event.id !== '' "
                    @click="openSlotListModal" variant="success" class="ms-1">Değişim Talepleri
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
              <label for="slotDescription">Açıklama</label>
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
            >Başlangıç Tarihi</label>
            <b-form-input
                v-model="changeSlotRequest.startDate"
                type="datetime-local"
                id="slotStart"
            ></b-form-input>
            <div
                v-if="submitted && !$v.changeSlotRequest.startDate.required"
                class="invalid-feedback"
            >
              This value is required.
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="mb-3">
            <label class="form-label"
            >Bitiş Tarihi</label>
            <b-form-input
                v-model="changeSlotRequest.endDate"
                type="datetime-local"
                id="end"
            ></b-form-input>
            <div
                v-if="submitted && !$v.changeSlotRequest.endDate.required"
                class="invalid-feedback"
            >
              This value is required.
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="slotRequestStatus">Statüs</label>
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
            >Kapat
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
                  <b-button v-if="currentUser.email === event.organizer && slotRequest.requestStatus === 'WAITING'" variant="light"
                            @click="handleSlotRequetsApproved(slotRequest)">Onayla
                  </b-button>
                </td>
                <td>
                  <b-button v-if="currentUser.email === event.organizer && slotRequest.requestStatus === 'WAITING'" variant="light"
                            @click="handleSlotRequetsRejected(slotRequest)">Reddet
                  </b-button>
                </td>

              </tr>
              </tbody>
            </table>
            <footer>
              <b-button
                  v-if=" this.event.id !== '' && this.currentUser.email !== this.event.organizer && this.isUserParticipant"
                  @click="addSlotRequest" variant="success" class="ms-1">Ekle
              </b-button>
            </footer>
          </div>
        </div>
      </form>
    </b-modal>

    <b-modal
        v-model="showRecipientsModal"
        title="Katılımcılar"
        title-class="text-black font-18"
        header-class="py-3 px-4 border-bottom-0"
        body-class="p-4"
        hide-footer
        centered
    >
      <form>
        <div class="row">

          <div class="table-responsive">
            <table class="table mb-0"
                   contenteditable="false"
            >
              <thead>
              <tr>
                <th>Katılımcı Hesabı</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(recipient) in event.recipients" :key="recipient.id">
                <td><input class="form-control" v-model="recipient.name"/></td>
              </tr>
              </tbody>
              <br>
              <div class="text-end">
                <b-button variant="light" @click="insertNewRecipient">Yeni Katılımcı</b-button>
                <b-button class="ms-1" variant="light" @click="addRecipient">Kaydet</b-button>
                <b-button variant="light" @click="hideRecipientsModal">Kapat</b-button>
              </div>
            </table>
          </div>
        </div>
      </form>
    </b-modal>
  </Layout>
</template>
