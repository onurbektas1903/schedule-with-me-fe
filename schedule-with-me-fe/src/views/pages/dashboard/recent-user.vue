<script>
/**
 * Recent-user component
 */
export default {
  data() {
    return {
      userdata: [
        {
          id: "#SD001",
          name: "Anna Ciantar",
          profile: require("@/assets/images/users/avatar-1.jpg"),
          designation: "Designer",
          email: "annac@hotmai.us",
          phone: "(216) 76 298 896",
          status: "Active",
          location: "Philippines",
        },
        {
          id: "#SD002",
          name: "Paul J. Friend",
          profile: require("@/assets/images/users/avatar-2.jpg"),
          designation: "Developer",
          email: "pauljfrnd@jourrapide.com",
          phone: "937-330-1634",
          status: "Active",
          location: "New York",
        },
        {
          id: "#SD003",
          name: "Kathryn S. Collier",
          profile: require("@/assets/images/users/avatar-3.jpg"),
          designation: "Owner",
          email: "annac@hotmai.us",
          phone: "(216) 76 298 896",
          status: "Active",
          location: "Philippines",
        },
        {
          id: "#SD004",
          name: "Labeeb Ghali",
          profile: require("@/assets/images/users/avatar-4.jpg"),
          designation: "Designer",
          email: "labebswad@teleworm.us",
          phone: "050 414 8778",
          status: "Blocked",
          location: "United Kingdom",
        },
        {
          id: "#SD005",
          name: "Timothy Kauper",
          profile: require("@/assets/images/users/avatar-5.jpg"),
          designation: "Founder",
          email: "thykauper@rhyta.com",
          phone: "(216) 75 612 706",
          status: "Active",
          location: "Denmark",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="float-end">
            <ul class="list-inline mb-0">
              <li class="list-inline-item mr-2">
                <b-dropdown
                  toggle-class="text-reset p-0"
                  menu-class="dropdown-menu-end"
                  variant="white"
                >
                  <template #button-content>
                    <span class="text-muted">Status:</span>
                    <span class="fw-semibold"
                      >Active<i class="mdi mdi-chevron-down ms-1"></i
                    ></span>
                  </template>
                  <b-dropdown-item>Active</b-dropdown-item>
                  <b-dropdown-item>Blocked</b-dropdown-item>
                </b-dropdown>
              </li>
              <li class="list-inline-item">
                <b-dropdown
                  class="ms-3"
                  menu-class="dropdown-menu-end"
                  toggle-class="text-reset p-0"
                  variant="white"
                >
                  <template #button-content>
                    <span class="text-muted">Sort By:</span>
                    <span class="fw-semibold"
                      >Name<i class="mdi mdi-chevron-down ms-1"></i
                    ></span>
                  </template>
                  <b-dropdown-item>ID</b-dropdown-item>
                  <b-dropdown-item>Job title</b-dropdown-item>
                  <b-dropdown-item>Name</b-dropdown-item>
                  <b-dropdown-item>Location</b-dropdown-item>
                  <b-dropdown-item>Email</b-dropdown-item>
                  <b-dropdown-item>Phone</b-dropdown-item>
                </b-dropdown>
              </li>
            </ul>
          </div>

          <h4 class="card-title mb-4">Recent Users</h4>
          <div class="table-responsive">
            <table
              class="table table-hover table-borderless align-middle table-centered table-nowrap mb-0"
            >
              <thead class="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Job title</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th colspan="2">Location</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in userdata" :key="index">
                  <td>
                    {{ item.id }}
                  </td>
                  <td>
                    <img
                      :src="`${item.profile}`"
                      alt="user"
                      class="rounded-circle h-auto avatar-xs me-2"
                    />
                    <span> {{ item.name }}</span>
                  </td>
                  <td>
                    {{ item.designation }}
                  </td>
                  <td>
                    {{ item.email }}
                  </td>
                  <td>
                    {{ item.phone }}
                  </td>
                  <td>
                    <span
                      class="badge bg-success bg-soft text-success"
                      :class="{
                        'bg-soft bg-danger text-danger':
                          item.status === 'Blocked',
                      }"
                      >{{ item.status }}</span
                    >
                  </td>
                  <td>
                    {{ item.location }}
                  </td>
                  <td>
                    <b-dropdown
                      variant="white"
                      menu-class="dropdown-menu-end"
                      toggle-class="text-muted font-size-16 p-0"
                    >
                      <template #button-content>
                        <i class="mdi mdi-dots-vertical"></i>
                      </template>
                      <b-dropdown-item>Action</b-dropdown-item>
                      <b-dropdown-item>Another action</b-dropdown-item>
                      <b-dropdown-item>Something else here</b-dropdown-item>
                    </b-dropdown>
                  </td>
                </tr>
                <!-- end /tr -->
              </tbody>
            </table>
            <!-- end table -->
          </div>
          <!--end table-responsive-->
        </div>
      </div>
    </div>
  </div>
  <!-- end row -->
</template>
