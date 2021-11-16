<script>
/**
 * Earning-report component
 */
export default {
  data() {
    return {
      chartOptions: {
        chart: {
          height: 200,
          type: "radialBar",
          offsetY: -10,
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: "13px",
                color: undefined,
                offsetY: 60,
              },
              value: {
                offsetY: 22,
                fontSize: "16px",
                color: undefined,
                formatter: function (val) {
                  return val + "%";
                },
              },
            },
          },
        },
        colors: ["#0576b9"],
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91],
          },
        },
        stroke: {
          dashArray: 4,
        },
        labels: ["Series A"],
      },
      series: [67],
    };
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="float-end">
        <b-dropdown variant="white" menu-class="dropdown-menu-end" toggle-class="text-reset p-0">
          <template #button-content
          >
            <span class="fw-semibold">Report By:</span>
            <span class="text-muted"
              >Monthly<i class="mdi mdi-chevron-down ms-1"></i
            ></span>
          </template>
            <b-dropdown-item>Yearly</b-dropdown-item>
            <b-dropdown-item>Monthly</b-dropdown-item>
            <b-dropdown-item>Weekly</b-dropdown-item>
            <b-dropdown-item>Today</b-dropdown-item>
        </b-dropdown>
      </div>

      <h4 class="card-title mb-4">Earning Reports</h4>
      <div class="row">
        <div class="col-sm-6">
          <div class="row mb-3">
            <div class="col-6">
              <p class="text-muted mb-1">This Month</p>
              <h5 class="mt-0">
                $12,582<small class="badge badge-light-success font-13"
                  >+15%</small
                >
              </h5>
            </div>

            <div class="col-6">
              <p class="text-muted mb-1">Last Month</p>
              <h5 class="mt-0">
                $98,741
                <small class="badge badge-light-danger font-13">-5%</small>
              </h5>
            </div>
          </div>
          <p class="text-muted">
            <span class="text-success me-1">
              12%<i class="mdi mdi-arrow-up"></i></span
            >From previous period
          </p>

          <div class="mt-4">
            <a href="javascript:void(0);" class="btn btn-primary btn-sm"
              >Generate Reports <i class="mdi mdi-arrow-right ms-1"></i
            ></a>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="mt-4 mt-sm-0">
            <apexchart
            id="radialBar-chart"
            class="apex-charts"
            height="200"
            dir="ltr"
            :series="series"
            :options="chartOptions"
          ></apexchart>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end card -->
</template>