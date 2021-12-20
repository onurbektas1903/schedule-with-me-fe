<script>
import {meetingService} from "@/helpers/fakebackend/meeting.service";
import DatePicker from "vue2-datepicker";

export default {
  data() {
    return {
      series: [],
      dateRange:"",
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
        colors: ["#2cb57e", "#0576b9", "#dfe2e6", "#f1b44c", "#FF8A33", "#D311D0", "#112ED3", "#11D3D3", "#5AD311"],
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
        labels: [],
        markers: {
          size: 0,
        },
        xaxis: {
          type: "string",
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
  mounted: function () {
    let currentYear = new Date().getFullYear();
    let startDate = new Date(currentYear, 0, 1);
    let endDate = new Date();
    this.listProviderUsageStatistics(startDate, endDate)
  },
  components: {
    DatePicker
  },
  methods: {
    listProviderUsageStatistics(startDate,endDate){

      meetingService.getMeetingProviderUsageStatistics(Date.parse(startDate), (Date.parse(endDate))).then(resp => {

        let mappedSeries = [];
        let occurrence = {};
        let providerId = resp[0].providerId;
        occurrence[providerId] =[];
        resp.forEach(statistic =>{
          if(providerId !== statistic.providerId){
            occurrence[statistic.providerId] = [];
            mappedSeries.push({
              name:providerId,
              type:"column",
              data: occurrence[providerId]
            });
            providerId = statistic.providerId;
          }
          occurrence[providerId].push(statistic.count);
        });
        this.series = mappedSeries;
        this.createLabels(startDate,endDate);
      });
    },
    createLabels(start,end) {

      let labels=[];
      while(start.getFullYear()<end.getFullYear() || start.getMonth()< end.getMonth()){
        labels.push(`${start.getMonth()+1}/${start.getFullYear()}`);
        start.setMonth(start.getMonth()+1);
      }
      labels.push(`${end.getMonth()+1}/${end.getFullYear()}`);
      // const year = 2022;
      // // const year = new Date().getFullYear();
      // for (let i = 1; i <= 12; i++) {
      //   labels.push(`${i}/${year}`);
      // }
      this.$refs.apex.updateOptions({labels: labels});

    },
    handleDateSelected(e){
      this.listProviderUsageStatistics(e[0],e[1]);
    }
  }

}
;
</script>

<template>
  <div>
    <div class="card card-height-100">
      <div class="card-body">
        <div class="float-end">
          <div class="mb-3">
            <label>Date Range</label>
            <br />
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
        <h4 class="card-title mb-4">Meeting Provider Usage Statistics</h4>


        <div class="mt-3">
          <apexchart
              ref="apex"
              id="apex-chart"
              class="apex-charts"
              height="338"
              width="1500"
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
