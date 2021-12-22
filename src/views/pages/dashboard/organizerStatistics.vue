<script>
import {meetingService} from "@/helpers/fakebackend/meeting.service";
export default {
  data() {
    return {
      organizerData: [],
    };
  },

  mounted: function () {
    let currentYear = new Date().getFullYear();
    let startDate = new Date(currentYear, 0, 1);
    let endDate = new Date();
    this.getOrganizerStatistics(startDate,endDate);
  },
  methods:{
    getOrganizerStatistics(start,end){
      this.meetingService.getMeetingOrganizerStatistics(start,end).then(resp => {
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

        <div class="table-responsive">
          <table class="table align-middle table-striped table-nowrap mb-0">
            <tbody>
            <tr v-for="(item, index) in organizerData" :key="index">
              <td>
                <img
                    :src="`${item.name}`"
                    alt="user-image"
                    class="avatar-xs rounded-circle me-2"
                />
                {{ item.name }}
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
