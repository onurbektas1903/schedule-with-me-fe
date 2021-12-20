<script>
import {meetingService} from "@/helpers/fakebackend/meeting.service";
export default {
  data() {
    return {
      reportData: [],
    };
  },
  mounted() {

    this.meetingService.getMeetingOrganizerStatistics()
  },
  methods:{
    getOrganizationReport(){

    },
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
            <tr v-for="(item, index) in reportData" :key="index">
              <td>
                <img
                    :src="`${item.profile}`"
                    alt="user-image"
                    class="avatar-xs rounded-circle me-2"
                />
                {{ item.name }}
              </td>
              <td>
                <i class="mdi mdi-checkbox-blank-circle text-success"></i>
                {{ item.status }}
              </td>
              <td>{{ item.amount }}</td>
              <td>{{ item.date }}</td>
              <td>
                <button
                    type="button"
                    class="btn btn-light btn-sm waves-effect"
                >
                  <i class="mdi mdi-square-edit-outline me-1"></i> Edit
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
