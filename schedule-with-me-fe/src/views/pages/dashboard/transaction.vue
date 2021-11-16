<script>
/**
 * Transaction component
 */
export default {
  data() {
    return {
      transactionData: [
        {
          profile: require("@/assets/images/users/avatar-2.jpg"),
          name: "Herbert C. Patton",
          status: "Confirm",
          amount: "$14,584",
          date: "5/12/2016",
        },
        {
          profile: require("@/assets/images/users/avatar-3.jpg"),
          name: "Mathias N. Klausen",
          status: "Waiting payment",
          amount: "$8,541",
          date: "10/11/2016",
        },
        {
          profile: require("@/assets/images/users/avatar-4.jpg"),
          name: "Nikolaj S. Henriksen",
          status: "Confirm",
          amount: "$954",
          date: "8/11/2016",
        },
        {
          profile: require("@/assets/images/users/avatar-5.jpg"),
          name: "Lasse C. Overgaard",
          status: "Payment expired",
          amount: "$44,584",
          date: "7/11/2016",
        },
        {
          profile: require("@/assets/images/users/avatar-6.jpg"),
          name: "Kasper S. Jessen",
          status: "Confirm",
          amount: "$8,844",
          date: "1/11/2016",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="col-xl-6">
    <div class="card">
      <div class="card-body">
        <div class="float-end">
          <b-dropdown toggle-class="text-reset p-0" variant="white" menu-class="dropdown-menu-end">
            <template #button-content>
              <span class="fw-semibold">Sort By:</span>
              <span class="text-muted"
                >Recent<i class="mdi mdi-chevron-down ms-1"></i
              ></span>
            </template>
            <b-dropdown-item>Maximum</b-dropdown-item>
            <b-dropdown-item>Recent</b-dropdown-item>
            <b-dropdown-item>Minimum</b-dropdown-item>
          </b-dropdown>
        </div>

        <h4 class="card-title mb-4">Latest Transactions</h4>

        <div class="table-responsive">
          <table class="table align-middle table-striped table-nowrap mb-0">
            <tbody>
              <tr v-for="(item, index) in transactionData" :key="index">
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
