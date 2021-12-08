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

/**
 * Calendar component
 */
export default {
  page: {
    title: "Calendar",
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {FullCalendar, Layout, PageHeader, Multiselect},
  data() {
    return {
      slotRequestModal: false,
      slotRequestListModal: false,
      param_id: this.$route.params.id,
      providerFilter: "",
      currentUser: {},
      keycloakUserApi: new KeycloakUserApi(),
      changeSlotRequest: {
        id: "",
        title: "",
        startDate: "",
        endDate: "",
        organizer: "",
        description: "",
        creator: "",
        meeting: ""
      },
      providers: [],
      recipients: [],
      slotRequests:[],
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
        dateClick: this.dateClicked,
        eventClick: this.eventClicked,
        eventsSet: this.handleEvents,
        dateSelection: this.dateRangeSelected,
        weekends: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
      },
      currentEvents: [],
      showModal: false,
      modalTitle: "",
      showRecipientsModal: false,
      eventModal: false,
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
        start: "",
        end: "",
        category: "info",
        organizer: "",
        meetingURL: "",
        changeSlotRequest: ""
      },
      editevent: {
        editTitle: "",
        editMeetingProvider: "",
      },
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
    handleSlotRequetsApproved(slotRequest){
      console.log(slotRequest);
    },
    handleSlotRequetsRejected(slotRequest){
      console.log(slotRequest);
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
              this.editEvent(this.param_id);
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
    handleSubmit(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {

        this.event.start = Date.parse(this.event.start);
        this.event.end = Date.parse(this.event.end);
        let calendarApi = this.newEventData.view.calendar;

        meetingService.createMeeting(this.event).then(response => {
          this.currentEvents = calendarApi.addEvent({
            id: response.id,
            title: response.title,
            start: response.start,
            end: response.end
          });
          this.successmsg();
        }).catch(reason => {
          //TODO handle errors
          console.log(reason);
        });


        this.showModal = false;
        this.event = {};
        this.newEventData = {};
      }
      this.submitted = false;
      this.event = {};
    },
    // eslint-disable-next-line no-unused-vars
    hideModal(e) {
      this.submitted = false;
      this.showModal = false;
      this.event = {};
    },

    hideSlotRequestModal(e) {
      this.slotRequestModal = false;
    },
    /**
     * Edit event modal submit
     */
    // eslint-disable-next-line no-unused-vars
    editSubmit(e) {
      this.submit = true;
      const editTitle = this.editevent.editTitle;
      const editmeetingProvider = this.editevent.editmeetingProvider;
      this.edit.setProp("title", editTitle);
      this.edit.setProp("classNames", editmeetingProvider);
      this.successmsg();
      this.eventModal = false;
    },
    createSlotChangeRequest(e) {
      this.slotRequestModal = false;
      this.changeSlotRequest.startDate = Date.parse(this.event.start);
      this.event.start = Date.parse(this.event.start);
      this.event.end = Date.parse(this.event.end);
      this.changeSlotRequest.endDate = Date.parse(this.event.end);
      this.changeSlotRequest.creator = this.currentUser.email;
      this.changeSlotRequest.organizer = this.event.organizer;
      this.changeSlotRequest.meetingId = this.event.id
      this.changeSlotRequest.title = this.createChangeMailTitle();
      this.changeSlotRequest.description = this.createChangeMailBody(this.changeSlotRequest.description);
      meetingService.createChangeSlotRequest(this.changeSlotRequest).then(response => {
        this.successmsg();
      }).catch(reason => {
        //TODO handle errors
        console.log(reason);
      });
    },

    /**
     * Delete event
     */
    deleteEvent() {
      this.edit.remove();
      this.eventModal = false;
    },
    /**
     * Modal open for add event
     */
    dateClicked(info) {
      this.newEventData = info;
      this.event.start = info.dateStr.split('+')[0];
      this.event.end = info.dateStr.split('+')[0];
      this.event.title = ""
      this.event.organizer = this.currentUser.email;
      this.modalTitle = "Create Meeting"
      this.showModal = true;
      this.getProviders();
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
    dateRangeSelected(info) {
      debugger;
      console.log(info);
    },
    eventClicked(info) {
      this.editEvent(info.event.id);
    },
    checkUserCanEdit() {
      return this.currentUser && this.currentUser.roles.find(role => role !== 'STANDART_USER');
    },
    checkUserCanAsk() {
      return this.currentUser && this.event.organizer !== this.user.email && this.event.id !== "";
    },
    editEvent(id) {
      this.getProviders();
      if (this.checkUserCanEdit()) {
        // this.edit = info.event;
        meetingService.getMeetingById(id).then(resp => {
          console.log(this.providers);
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
          this.modalTitle = "Edit Meeting"
          this.showModal = true;
        });
      }
    },

    createChangeMailTitle() {
      //TODO ingilizce hale getir
      return 'Online Görüşme Tarih Değişim İsteği'
    },
    createChangeMailBody(description) {
      let body = ` <p> ${new Date(this.event.start)} ve ${new Date(this.event.end)}   </p>
                <p> ${description} </p>
                 <p>http://localhost:9095/meeting/${this.event.id}</p>`
      return body;
    },
    closeModal() {
      this.eventModal = false;
    },
    openSlotRequestModal() {
      this.slotRequestModal = true;
    },
    openSlotListModal() {
     meetingService.getSlotRequests(this.event.id).then(resp => {
        this.slotRequests = resp.map(req => {
          return {
            id:req.id,
            description: req.description,
            startDate:moment(req.startDate).format().split('+')[0],
            endDate:moment(req.endDate).format().split('+')[0],
            creator:req.creator
          }
        });
         this.slotRequestListModal = true;
      });
    },
    confirm() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.deleteEvent();
          Swal.fire("Deleted!", "Event has been deleted.", "success");
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
      <form @submit.prevent="handleSubmit">
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
                  :readonly="!this.checkUserCanEdit"
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
          <b-button variant="light" @click="hideModal">Close</b-button>
          <b-button type="submit" variant="success" class="ms-1">Create event</b-button>
          <b-button v-if=" this.event.id != '' && this.currentUser.email !== this.event.organizer"
                    @click="openSlotRequestModal" variant="success" class="ms-1">Tarih Değiştirme İsteği
          </b-button>
          <b-button v-if=" this.event.id != '' && this.currentUser.email === this.event.organizer"
                    @click="openSlotListModal" variant="success" class="ms-1">Değişim Talepleri
          </b-button>
        </div>
      </form>
    </b-modal>

    <!-- Edit Modal -->
    <b-modal
        v-model="eventModal"
        title="Edit Event"
        title-class="text-black font-18"
        header-border-variant="py-3 px-4 border-bottom-0"
        hide-footer
        body-class="p-4"
        centered
    >
      <form @submit.prevent="editSubmit">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="title">Başlık</label>
              <input
                  id="name"
                  v-model="editevent.editTitle"
                  type="text"
                  class="form-control"
                  placeholder="Insert Event name"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label class="form-label">Konferans Sağlayıcı</label>
              <select
                  v-model="editevent.editmeetingProvider"
                  class="form-control form-select"
                  name="meetingProvider"
              >
                <option
                    v-for="option in categories"
                    :key="option.backgroundColor"
                    :value="`${option.value}`"
                >{{ option.name }}
                </option
                >
              </select>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-6">
            <b-button variant="danger" id="btn-delete-event" @click="confirm"
            >Delete
            </b-button
            >
          </div>
          <div class="col-6 text-end">
            <b-button
                variant="light"
                class="btn btn-light me-1"
                @click="closeModal"
            >Close
            </b-button
            >
            <b-button variant="success" @click="editSubmit">Save</b-button>
          </div>
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
              <label for="slotTitle">Başlık</label>
              <textarea
                  id="slotTitle"
                  v-model="changeSlotRequest.title"
                  type="text"
                  class="form-control"
              />
            </div>
          </div>
        </div>
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
                v-model="changeSlotRequest.start"
                type="datetime-local"
                id="slotStart"
            ></b-form-input>
            <div
                v-if="submitted && !$v.changeSlotRequest.start.required"
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
                v-model="changeSlotRequest.end"
                type="datetime-local"
                id="end"
            ></b-form-input>
            <div
                v-if="submitted && !$v.changeSlotRequest.end.required"
                class="invalid-feedback"
            >
              This value is required.
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-6">
            <b-button variant="danger" id="btn-delete-event" @click="confirm"
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
        size="lg"
    >
      <form>
        <div class="row">

          <div class="table-responsive">
            <table class="table mb-0">
              <thead>
              <tr>
                <th>Kullanıcı adı</th>
                <th>Başlangıç Tarihi</th>
                <th >Bitiş Tarihi</th>

              </tr>
              </thead>
              <tbody>
              <tr v-for="(slotRequest,index) in this.slotRequests" :key="slotRequest.id">
                <td><input class="form-control" v-model="slotRequest.creator"/></td>
                <td><input class="form-control" v-model="slotRequest.startDate" type="datetime-local"/></td>
                <td><input class="form-control" v-model="slotRequest.endDate" type="datetime-local"/></td>
<!--                <b-form-input v-model="slotRequest.endDate" type="datetime-local"/>-->
<!--                <td><input class="form-control" v-model="slotRequest.startDate"/></td>-->
<!--                <td><input class="form-control" v-model="slotRequest.endDate"/></td>-->
                <td><b-button variant="light" @click="handleSlotRequetsApproved(slotRequest)">Onayla</b-button></td>
                <td><b-button variant="light" @click="handleSlotRequetsRejected(slotRequest)">Reddet</b-button></td>

              </tr>
              </tbody>
            </table>
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
                   contenteditable="true"
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
