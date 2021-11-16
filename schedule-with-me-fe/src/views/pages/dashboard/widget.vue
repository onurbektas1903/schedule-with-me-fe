<script>
import countTo from "vue-count-to";

/**
 * Widget component
 */
export default {
  components: { countTo },
};
</script>

<template>
  <div class="row">
    <div class="col-md-6 col-xl-3">
      <div class="card">
        <div class="card-body">
          <div class="float-end">
            <div class="avatar-sm mx-auto mb-4">
              <span class="avatar-title rounded-circle bg-light font-size-24">
                <i class="mdi mdi-cash-multiple text-primary"></i>
              </span>
            </div>
          </div>
          <div>
            <p class="text-muted text-uppercase fw-semibold">Total Revenue</p>
            <h4 class="mb-1 mt-1">
              $<countTo
                :startVal="0"
                :endVal="58425"
                :duration="2000"
              ></countTo>
            </h4>
          </div>
          <p class="text-muted mt-3 mb-0">
            <span class="badge badge-soft-success me-1"
              ><i class="mdi mdi-arrow-up-bold me-1"></i>2.65%</span
            >
            since last week
          </p>
        </div>
      </div>
    </div>
    <!-- end col-->

    <div class="col-md-6 col-xl-3">
      <div class="card">
        <div class="card-body">
          <div class="float-end">
            <div class="avatar-sm mx-auto mb-4">
              <span class="avatar-title rounded-circle bg-light font-size-24">
                <i class="mdi mdi-refresh-circle text-success"></i>
              </span>
            </div>
          </div>
          <div>
            <p class="text-muted text-uppercase fw-semibold">Total Refunds</p>
            <h4 class="mb-1 mt-1">
              $<countTo :startVal="0" :endVal="2568" :duration="2000"></countTo>
            </h4>
          </div>
          <p class="text-muted mt-3 mb-0">
            <span class="badge badge-soft-danger me-1"
              ><i class="mdi mdi-arrow-down-bold me-1"></i>4.58%</span
            >
            since last week
          </p>
        </div>
      </div>
    </div>
    <!-- end col-->

    <div class="col-md-6 col-xl-3">
      <div class="card">
        <div class="card-body">
          <div class="float-end">
            <div class="avatar-sm mx-auto mb-4">
              <span class="avatar-title rounded-circle bg-light font-size-24">
                <i class="mdi mdi-account-group text-primary"></i>
              </span>
            </div>
          </div>
          <div>
            <p class="text-muted text-uppercase fw-semibold">Active Users</p>
            <h4 class="mb-1 mt-1">
              <countTo
                :startVal="0"
                :endVal="258410"
                :duration="2000"
              ></countTo>
            </h4>
          </div>
          <p class="text-muted mt-3 mb-0">
            <span class="badge badge-soft-success me-1"
              ><i class="mdi mdi-arrow-up-bold me-1"></i>14.33%</span
            >
            since last week
          </p>
        </div>
      </div>
    </div>
    <!-- end col-->

    <div class="col-md-6 col-xl-3">
      <div class="card">
        <div class="card-body">
          <div class="float-end">
            <div class="avatar-sm mx-auto mb-4">
              <span class="avatar-title rounded-circle bg-light font-size-24">
                <i class="mdi mdi-cart-check text-success"></i>
              </span>
            </div>
          </div>
          <div>
            <p class="text-muted text-uppercase fw-semibold">All Time Orders</p>
            <h4 class="mb-1 mt-1">
              <countTo :startVal="0" :endVal="9582" :duration="2000"></countTo>
            </h4>
          </div>
          <p class="text-muted mt-3 mb-0">
            <span class="badge badge-soft-warning me-1"
              ><i class="mdi mdi-arrow-up-bold me-1"></i>0.55%</span
            >
            since last week
          </p>
        </div>
      </div>
    </div>
    <!-- end col-->
  </div>
  <!-- end row-->
</template>
