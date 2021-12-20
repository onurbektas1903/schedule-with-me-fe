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
        colors: ["#2cb57e", "#0576b9", "#dfe2e6", "#f1b44c", "#FF8A33", "#D311D0", "#112ED3", "#11D3D3", "#5AD311","#FF3346"],
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
        let dateMap = new Map();
        this.createLabels(startDate,endDate,dateMap);
        let mappedSeries = [];
        let occurrence = {};
        if(!(resp && resp[0] && resp[0].providerId)){
          return;
        }
        let providerId = resp[0].providerId;
        occurrence[providerId] =[0,0,0,0,0,0,0,0,0,0,0,0];
        resp.forEach(statistic =>{
          if(providerId !== statistic.providerId){
            providerId = statistic.providerId;
            occurrence[statistic.providerId] = [0,0,0,0,0,0,0,0,0,0,0,0];
            mappedSeries.push({
              name:providerId,
              type:"column",
              data: occurrence[statistic.providerId]
            });
            providerId = statistic.providerId;
          }
          let index = dateMap.get(statistic.yearMonth);
          occurrence[providerId][index]=(statistic.count);
        });
        this.series = mappedSeries;
      });
    },
    createLabels(start,end,dateMap) {

      let labels=[];
      let i = -1;
      while(start.getFullYear()<end.getFullYear() || start.getMonth()< end.getMonth()){
        i++
        let startMonth =start.getMonth()+1;
        if(startMonth < 10){
          startMonth = '0'+startMonth;
        }
        let val = `${startMonth}/${start.getFullYear()}`;
        labels.push(val);
        dateMap.set(val,i);
        start.setMonth(start.getMonth()+1);
      }
      i++;
      let endMonth =end.getMonth()+1;
      if(endMonth < 10){
        endMonth = '0'+endMonth;
      }
      let val = `${endMonth}/${end.getFullYear()}`;
      labels.push(val);
      dateMap.set(val,i);
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
