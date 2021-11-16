<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import { icons } from "./data-fontawesome";

/**
 * Font Awesome-icon component
 */
export default {
  page: {
    title: "Font Awesome 5",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      icons: icons,
      title: "Font Awesome 5",
      items: [
        {
          text: "Icons",
        },
        {
          text: "Font Awesome 5",
          active: true,
        },
      ],
      solid: "",
      regular: "",
      brand: "",
    };
  },
  components: {
    Layout,
    PageHeader,
  },
  mounted() {
    for (let entry of icons) {
      if (entry.attributes.membership.free.length) {
        for (let value of entry.attributes.membership.free) {
          switch (value) {
            case "brands":
              this.brand +=
                '<div class="col-xl-3 col-lg-4 col-sm-6">\
                          <i class="fab fa-' +
                entry.id +
                '"></i> fab fa-' +
                entry.id +
                "\
                      </div>";
              break;
            case "solid":
              this.solid +=
                '<div class="col-xl-3 col-lg-4 col-sm-6">\
                    <i class="fas fa-' +
                entry.id +
                '"></i> fas fa-' +
                entry.id +
                "\
                </div>";
              break;
            default:
              this.regular +=
                '<div class="col-xl-3 col-lg-4 col-sm-6">\
                          <i class="far fa-' +
                entry.id +
                '"></i> far fa-' +
                entry.id +
                "\
                      </div>";
          }
        }
      }
    }

    document.getElementById("solid").innerHTML = this.solid;
    document.getElementById("brand").innerHTML = this.brand;
    document.getElementById("regular").innerHTML = this.regular;
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Solid</h4>
            <p class="card-title-desc mb-2">
              Use
              <code>&lt;i class="fas fa-ad"&gt;&lt;/i&gt;</code>
              <span class="badge bg-success">v 5.13.0</span>.
            </p>
            <div class="row icon-demo-content" id="solid"></div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Regular</h4>
            <p class="card-title-desc mb-2">
              Use
              <code>&lt;i class="far fa-address-book"&gt;&lt;/i&gt;</code>
              <span class="badge bg-success">v 5.13.0</span>.
            </p>
            <div class="row icon-demo-content" id="regular"></div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Brands</h4>
            <p class="card-title-desc mb-2">
              Use
              <code>&lt;i class="fab fa-500px"&gt;&lt;/i&gt;</code>
              <span class="badge bg-success">v 5.13.0</span>.
            </p>
            <div class="row icon-demo-content" id="brand"></div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>
