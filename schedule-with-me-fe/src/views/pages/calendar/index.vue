<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import listPlugin from "@fullcalendar/list";

import {required} from "vuelidate/lib/validators";
import Swal from "sweetalert2";

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import {categories} from "./data-calendar";
// import { calendarEvents, categories } from "./data-calendar";
import {meetingService} from "@/helpers/fakebackend/meeting.service";
import {providerService} from "@/helpers/fakebackend/provider.service";
import {calendarComputed, calendarMethods} from "@/state/helpers";
import Multiselect from "vue-multiselect";

/**
 * Calendar component
 */
export default {
  page: {
    title: "Calendar",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { FullCalendar, Layout, PageHeader,Multiselect },
  data() {
    return {
      providers:[],
      recipients: [
        "onur.bektas@gmail.com",
        "test@gmail.com"
      ],
      options: [
        "Alaska",
        "Hawaii",
        "California",
        "Nevada",
        "Oregon",
        "Washington",
        "Arizona",
        "Colorado",
        "Idaho",
        "Montana",
        "Nebraska",
        "New Mexico",
        "North Dakota",
        "Utah",
        "Wyoming",
        "Alabama",
        "Arkansas",
        "Illinois",
        "Iowa",
      ],
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
        viewDidMounth(val) {
          console.log(val);
        },
        slotDuration:'00:15:00',
        initialView: "dayGridMonth",
        themeSystem: "bootstrap",
        events: 'http://localhost:8080/meetings/',
        editable: true,
        locale:"tr",
        droppable: true,
        eventResizableFromStart: true,
        dateClick: this.dateClicked,
        eventClick: this.editEvent,
        eventsSet: this.handleEvents,
        dateSelection: this.dateRangeSelected,
        weekends: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
      },
      currentEvents: [],
      showModal: false,
      eventModal: false,
      categories: categories,
      submitted: false,
      submit: false,
      newEventData: {},
      edit: {},
      deleteId: {},
      event: {
        title: "",
        description:"",
        recipients:[],
        meetingProvider:"",
        start:"",
        end:"",
        category:"info",
        organizer:""
      },
      editevent: {
        editTitle: "",
        editMeetingProvider: "",
      },
    };
  },
  validations: {
    event: {
      title: { required },
      meetingProvider: { required },
    },
  },
  computed: {
    ...calendarComputed
  },
  mounted(){
    providerService.getAll().then(value => {
      this.providers = value;
    })
  },
  methods: {
    ...calendarMethods,
    getAllEvents(){

      meetingService.getAll().then(value => {
         value.map(this.getEventObject);
         console.log("events " +this.calendarEvents);
         // this.calendarOptions.initialEvents = value.map(this.getEventObject);
        console.log(value);
      });
    },
    getEventObject(event){
      return  {
          id: event.id,
          title: event.title,
          start: new Date(event.startDate),
          allDay: false,
          className: 'bg-success'
      };
      // let calendarApi = this.$refs.fullCalendar.getApi()
      // calendarApi.addEvent(eventObj);
      // this.addEvent(eventObj);

    },
    /**
     * Modal form submit
     */
    // eslint-disable-next-line no-unused-vars
    handleSubmit(e){
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        const title = this.event.title;
        const meetingProvider = this.event.meetingProvider;
        let calendarApi = this.newEventData.view.calendar;
        this.event.start = Date.parse(this.event.start);
        this.event.end = Date.parse(this.event.end);
        this.event.organizer ="system";
        meetingService.createMeeting(this.event).then(response => {
          this.currentEvents = calendarApi.addEvent({
            id: response.id,
            title: response.title,
            start: this.newEventData.date,
            end: this.newEventData.date,
            classNames: [meetingProvider],
          });
        });

        this.successmsg();
        this.showModal = false;
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
      //TODO fix here
      this.event.start = info.dateStr.split('+')[0];
      this.event.end = info.dateStr.split('+')[0];
      // this.event.start = info.dateStr;
      this.event.title = ""
      this.showModal = true;
    },
    dateRangeSelected(info) {
      debugger;
      console.log(info);
    },
    /**
     * Modal open for edit event
     */
    editEvent(info) {
      this.edit = info.event;
      this.editevent.editTitle = this.edit.title;
      this.editevent.editmeetingProvider = this.edit.classNames[0];
      this.eventModal = true;
    },

    closeModal() {
      this.eventModal = false;
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
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="app-calendar">
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
      title="Add New Event"
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
              <label  class="form-label"
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
              <label  class="form-label"
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
                  :multiple="true"
                  placeholder="Katılımcı Ekle"
              ></multiselect>
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
              <label class="form-label">Konferans Sağlayıcı</label>
              <select
                v-model="event.meetingProvider"
                class="form-control form-select"
                name="meetingProvider"
                :class="{ 'is-invalid': submitted && $v.event.meetingProvider.errors }"
              >
                <option
                  v-for="option in providers"
                  :key="option.backgroundColor"
                  :value="{
                   id: `${option.id}`,
                   name:`${option.name}`,
                   meetingProviderType:`${option.meetingProviderType}`
                  }"
                  >{{ option.name }}</option
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
          <b-button type="submit" variant="success" class="ms-1">Create event</b-button
          >
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
                  >{{ option.name }}</option
                >
              </select>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-6">
            <b-button variant="danger" id="btn-delete-event" @click="confirm"
              >Delete</b-button
            >
          </div>
          <div class="col-6 text-end">
            <b-button
              variant="light"
              class="btn btn-light me-1"
              @click="closeModal"
              >Close</b-button
            >
            <b-button variant="success" @click="editSubmit">Save</b-button>
          </div>
        </div>
      </form>
    </b-modal>
  </Layout>
</template>
