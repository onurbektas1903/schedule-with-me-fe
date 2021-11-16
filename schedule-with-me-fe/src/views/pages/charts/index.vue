<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

import {
  linewithDataChart,
  dashedLineChart,
  splineAreaChart,
  columnChart,
  columnDatalabelChart,
  barChart,
  mixedChart,
  candlestickChart,
  timelineChart,
  timelineDistributedChart,
  bubbleChart,
  scatterChart,
  heatmapChart,
  treemapChart,
  radialChart,
  radarChart,
  pieChart,
  radialAngleChart,
  radarMultipleChart,
  polarAreaChart,
  donutChart,
  polarareaMonochromeChart
} from "./data-apex";

import appConfig from "@/app.config";

/**
 * Charts component
 */
export default {
  page: {
    title: "Charts",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      linewithDataChart: linewithDataChart,
      dashedLineChart: dashedLineChart,
      splineAreaChart: splineAreaChart,
      columnChart: columnChart,
      columnDatalabelChart: columnDatalabelChart,
      barChart: barChart,
      mixedChart: mixedChart,
      candlestickChart: candlestickChart,
      timelineChart: timelineChart,
      timelineDistributedChart: timelineDistributedChart,
      bubbleChart: bubbleChart,
      scatterChart: scatterChart,
      treemapChart: treemapChart,
      heatmapChart: heatmapChart,
      radialChart: radialChart,
      radarChart: radarChart,
      pieChart: pieChart,
      radialAngleChart: radialAngleChart,
      donutChart: donutChart,
      radarMultipleChart: radarMultipleChart,
      polarAreaChart: polarAreaChart,
      polarareaMonochromeChart: polarareaMonochromeChart,
      title: "Charts",
      items: [
        {
          text: "Charts",
          href: "/",
        },
        {
          text: "Charts",
          active: true,
        },
      ],
    };
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body pb-0">
            <h4 class="card-title mb-4">Apex Chart</h4>

            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Line With Data Labels</h4>
                    <!-- Line with Data Labels chart -->
                    <apexchart
                      class="apex-charts"
                      height="380"
                      type="line"
                      dir="ltr"
                      :series="linewithDataChart.series"
                      :options="linewithDataChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Dashed Line</h4>
                    <!-- Dashed Line Chart -->
                    <apexchart
                      class="apex-charts"
                      height="380"
                      type="line"
                      dir="ltr"
                      :series="dashedLineChart.series"
                      :options="dashedLineChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Spline Area</h4>
                    <!-- Spline Area chart -->
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="area"
                      dir="ltr"
                      :series="splineAreaChart.series"
                      :options="splineAreaChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Column Chart</h4>
                    <!-- Column Charts -->
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="bar"
                      dir="ltr"
                      :series="columnChart.series"
                      :options="columnChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Column With Data Labels</h4>
                    <!-- Column with Data Labels -->
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="bar"
                      dir="ltr"
                      :series="columnDatalabelChart.series"
                      :options="columnDatalabelChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Bar Chart</h4>
                    <!-- Bar Chart -->
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="bar"
                      dir="ltr"
                      :series="barChart.series"
                      :options="barChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Line, Column & Area Chart</h4>
                    <!-- Line, Column & Area Chart -->
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="line"
                      dir="ltr"
                      :series="mixedChart.series"
                      :options="mixedChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Candlestick Chart</h4>

                    <!-- Radial Chart -->
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="candlestick"
                      dir="ltr"
                      :series="candlestickChart.series"
                      :options="candlestickChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Basic Timeline Chart</h4>
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="rangeBar"
                      dir="ltr"
                      :series="timelineChart.series"
                      :options="timelineChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Timeline Distributed</h4>
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="rangeBar"
                      dir="ltr"
                      :series="timelineDistributedChart.series"
                      :options="timelineDistributedChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Bubble Chart</h4>
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="bubble"
                      dir="ltr"
                      :series="bubbleChart.series"
                      :options="bubbleChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Scatter Chart</h4>
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="scatter"
                      dir="ltr"
                      :series="scatterChart.series"
                      :options="scatterChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Heatmap Chart</h4>
                    <apexchart
                      class="apex-charts"
                      height="370"
                      type="heatmap"
                      dir="ltr"
                      :series="heatmapChart.series"
                      :options="heatmapChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Heatmap Chart</h4>
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="treemap"
                      dir="ltr"
                      :series="treemapChart.series"
                      :options="treemapChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Pie Chart</h4>
                    <!-- Pie Chart -->
                    <apexchart
                      class="apex-charts"
                      height="320"
                      type="pie"
                      dir="ltr"
                      :series="pieChart.series"
                      :options="pieChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Donut Chart</h4>
                    <!-- Donut Chart -->
                    <apexchart
                      class="apex-charts"
                      height="320"
                      type="donut"
                      dir="ltr"
                      :series="donutChart.series"
                      :options="donutChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Radial Chart</h4>
                    <!-- Radial Chart -->
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="radialBar"
                      dir="ltr"
                      :series="radialChart.series"
                      :options="radialChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">
                      Timeline Distributed Radial Chart
                    </h4>
                    <!-- Radial Chart -->
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="radialBar"
                      dir="ltr"
                      :series="radialAngleChart.series"
                      :options="radialAngleChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Radar Chart</h4>
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="radar"
                      dir="ltr"
                      :series="radarChart.series"
                      :options="radarChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Radar multiple Chart</h4>
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="radar"
                      dir="ltr"
                      :series="radarMultipleChart.series"
                      :options="radarMultipleChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Polar Area Chart</h4>
                    <apexchart
                      class="apex-charts"
                      height="350"
                      type="polarArea"
                      dir="ltr"
                      :series="polarAreaChart.series"
                      :options="polarAreaChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="font-size-14 mb-4">Polar Area Monochrome Chart</h4>
                    <apexchart
                      class="apex-charts"
                      height="380"
                      type="polarArea"
                      dir="ltr"
                      :series="polarareaMonochromeChart.series"
                      :options="polarareaMonochromeChart.chartOptions"
                    ></apexchart>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
