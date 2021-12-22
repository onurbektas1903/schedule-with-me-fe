<script>
import {meetingService} from "@/helpers/backend/meeting.service";
import DatePicker from "vue2-datepicker";

export default {
  data() {
    return {
      dateRange: "",
      organizerData: [],
    };
  },
  components: {
    DatePicker
  },
  mounted: function () {
    let currentYear = new Date().getFullYear();
    let startDate = new Date(currentYear, 0, 1);
    let endDate = new Date();
    this.getOrganizerStatistics(Date.parse(startDate), Date.parse(endDate));
  },
  methods: {
    handleDateSelected(e) {
      this.getOrganizerStatistics(Date.parse(e[0]), Date.parse(e[1]));
    },
    getOrganizerStatistics(start, end) {
      meetingService.getMeetingOrganizerStatistics(start, end).then(resp => {
        this.organizerData = resp;
      })
    }
  },
};
</script>

<template>
  <div class="col-xl-6">
    <div class="card">
      <div class="card-body">

        <h4 class="card-title mb-4">Top Conversation Created Users</h4>
        <div class="card-body">
          <div class="float-end">
            <div class="mb-3">
              <label>Date Range</label>
              <br/>
              <date-picker
                  v-model="dateRange"
                  range
                  append-to-body
                  lang="tr"
                  confirm
                  @change="this.handleDateSelected"
              ></date-picker>
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table mb-0">
            <tbody>
            <tr v-for="(item, index) in organizerData" :key="index">
              <td>
                {{ item.organizer }}
              </td>
              <td>
                <i class="mdi mdi-checkbox-blank-circle text-success"></i>
                {{ item.count }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
