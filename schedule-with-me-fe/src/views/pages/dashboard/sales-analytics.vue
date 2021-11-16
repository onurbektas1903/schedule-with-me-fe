<script>
/**
 * Sales-analytics component
 */
export default {
  data() {
    return {
      series: [
        {
          name: "Income",
          type: "column",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
        },
        {
          name: "Sales",
          type: "column",
          data: [19, 8, 26, 21, 18, 36, 30, 28, 40, 39, 15],
        },
        {
          name: "Conversation Ratio",
          type: "area",
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        },
        {
          name: "Users",
          type: "line",
          data: [9, 11, 13, 12, 10, 8, 6, 9, 14, 17, 22],
        },
      ],
      chartOptions: {
        chart: {
          height: 338,
          type: "line",
          stacked: false,
          offsetY: -5,
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: [0, 0, 0, 1],
          curve: "smooth",
        },
        plotOptions: {
          bar: {
            columnWidth: "40%",
          },
        },
        colors: ["#2cb57e", "#0576b9", "#dfe2e6", "#f1b44c"],
        fill: {
          opacity: [0.85, 1, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
          },
        },
        labels: [
          "01/01/2003",
          "02/01/2003",
          "03/01/2003",
          "04/01/2003",
          "05/01/2003",
          "06/01/2003",
          "07/01/2003",
          "08/01/2003",
          "09/01/2003",
          "10/01/2003",
          "11/01/2003",
        ],
        markers: {
          size: 0,
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          title: {
            text: "Points",
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
            },
          },
        },
        grid: {
          borderColor: "#f1f1f1",
          padding: {
            bottom: 15,
          },
        },
      },
    };
  },
};
</script>

<template>
  <div class="col-xl-8">
    <div class="card card-height-100">
      <div class="card-body">
        <div class="float-end">
        <b-dropdown variant="white" menu-class="dropdown-menu-end" toggle-class="text-reset p-0">
          <template #button-content
          >
            <span class="fw-semibold">Sort By:</span>
            <span class="text-muted"
              >Yearly<i class="mdi mdi-chevron-down ms-1"></i
            ></span>
          </template>
            <b-dropdown-item>Yearly</b-dropdown-item>
            <b-dropdown-item>Monthly</b-dropdown-item>
            <b-dropdown-item>Weekly</b-dropdown-item>
            <b-dropdown-item>Today</b-dropdown-item>
        </b-dropdown>
        </div>
        <h4 class="card-title mb-4">Sales Analytics</h4>

        <div class="mt-1">
          <ul class="list-inline main-chart mb-0">
            <li class="list-inline-item chart-border-left me-0 border-0">
              <h3 class="text-primary">
                $<span data-plugin="counterup">2,371</span
                ><span
                  class="text-muted d-inline-block fw-normal font-size-15 ms-3"
                  >Income</span
                >
              </h3>
            </li>
            <li class="list-inline-item chart-border-left me-0">
              <h3>
                <span data-plugin="counterup">258</span
                ><span
                  class="text-muted d-inline-block fw-normal font-size-15 ms-3"
                  >Sales</span
                >
              </h3>
            </li>
            <li class="list-inline-item chart-border-left me-0">
              <h3>
                <span data-plugin="counterup">3.6</span>%<span
                  class="text-muted d-inline-block fw-normal font-size-15 ms-3"
                  >Conversation Ratio</span
                >
              </h3>
            </li>
            <li class="list-inline-item chart-border-left me-0">
              <h3>
                <span data-plugin="counterup">52</span>k<span
                  class="text-muted d-inline-block fw-normal font-size-15 ms-3"
                  >Users</span
                >
              </h3>
            </li>
          </ul>
        </div>

        <div class="mt-3">
          <apexchart
            id="sales-analytics-chart"
            class="apex-charts"
            height="338"
            dir="ltr"
            :series="series"
            :options="chartOptions"
          ></apexchart>
        </div>
      </div>
      <!-- end card-body-->
    </div>
    <!-- end card-->
  </div>
</template>