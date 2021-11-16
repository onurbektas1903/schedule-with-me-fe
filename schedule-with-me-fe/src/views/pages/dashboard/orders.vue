<script>
/**
 * Order component
 */
export default {
  data() {
    return {
      orderData: [
        {
          id: "#12354781",
          image: require("@/assets/images/products/img-1.png"),
          name: "Riverston Glass Chair",
          status: "Delivered",
          price: "$185",
          date: "5/12/2016",
        },
        {
          id: "#52140300",
          image: require("@/assets/images/products/img-2.png"),
          name: "Shine Company Catalina",
          status: "Delivered",
          price: "$1,024",
          date: "5/12/2016",
        },
        {
          id: "#96254137",
          image: require("@/assets/images/products/img-3.png"),
          name: "Trex Outdoor Furniture Cape",
          status: "Cancel",
          price: "$657",
          date: "5/12/2016",
        },
        {
          id: "#12365474",
          image: require("@/assets/images/products/img-4.png"),
          name: "Oasis Bathroom Teak Corner",
          status: "Shipped",
          price: "$8451",
          date: "5/12/2016",
        },
        {
          id: "#85214796",
          image: require("@/assets/images/products/img-5.png"),
          name: "BeoPlay Speaker",
          status: "Delivered",
          price: "$584",
          date: "5/12/2016",
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
              <span class="text-muted">Status:</span>
              <span class="fw-semibold"
                >All<i class="mdi mdi-chevron-down ms-1"></i
              ></span>
            </template>
            <b-dropdown-item>All</b-dropdown-item>
            <b-dropdown-item>Delivered</b-dropdown-item>
            <b-dropdown-item>Shipped</b-dropdown-item>
            <b-dropdown-item>Cancelled</b-dropdown-item>
          </b-dropdown>
        </div>

        <h4 class="card-title mb-4">Latest Orders</h4>

        <div class="table-responsive">
          <table class="table align-middle table-striped table-nowrap mb-0">
            <tbody>
              <tr v-for="(item, index) in orderData" :key="index">
                <td>{{ item.id }}</td>
                <td>
                  <img
                    :src="`${item.image}`"
                    alt="user-image"
                    style="height: 32px"
                    class="rounded me-2"
                  />
                  {{ item.name }}
                </td>
                <td>
                  <span
                    class="badge rounded-pill"
                    :class="{
                      'bg-success bg-soft text-success':
                        item.status === 'Delivered',
                      'bg-danger bg-soft text-danger': item.status === 'Cancel',
                      'bg-warning bg-soft text-warning':
                        item.status === 'Shipped',
                    }"
                    >{{ item.status }}</span
                  >
                </td>
                <td>{{ item.price }}</td>
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
