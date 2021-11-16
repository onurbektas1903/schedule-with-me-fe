<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

import Widget from "./widget";
import SalesAnalytics from "./sales-analytics";
import EarningReport from "./earning-report";
import Transactions from "./transaction";
import Orders from "./orders";
import RecentUser from "./recent-user";
import appConfig from "@/app.config";

/**
 * dashboard component
 */
export default {
  page: {
    title: "Dashbaord",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {};
  },
  components: {
    Layout,
    PageHeader,
    Widget,
    SalesAnalytics,
    EarningReport,
    Transactions,
    Orders,
    RecentUser,
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "Dashboard",
        },
        {
          text: "Dashboard",
          active: true,
        },
      ],
      showModal: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showModal = true;
    }, 1500);
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <Widget />
    <div class="row">
      <SalesAnalytics />
      <div class="col-xl-4">
        <div class="card bg-pattern">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-sm-8">
                <div class="avatar-xs mb-3">
                  <span
                    class="avatar-title rounded-circle bg-light font-size-24"
                  >
                    <i class="mdi mdi-bullhorn-outline text-primary"></i>
                  </span>
                </div>
                <p class="font-size-18">
                  Enhance your <b>Campaign</b> for better outreach
                  <i class="mdi mdi-arrow-right"></i>
                </p>
                <div class="mt-4">
                  <a
                    href="javascript: void(0);"
                    class="btn btn-success waves-effect waves-light"
                    >Upgrade Account!</a
                  >
                </div>
              </div>
              <div class="col-sm-4">
                <div class="mt-4 mt-sm-0">
                  <img
                    src="@/assets/images/widget-img.png"
                    class="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- end card-body-->
        </div>

        <EarningReport />
      </div>
    </div>

    <div class="row">
      <Transactions />
      <Orders />
    </div>

    <RecentUser />
    <b-modal
      v-model="showModal"
      hide-footer
      centered
      header-class="border-0"
      content-class="bg-pattern"
    >
      <div class="text-center mb-4">
        <div class="avatar-md mx-auto mb-4">
          <div class="avatar-title bg-light rounded-circle text-primary h1">
            <i class="mdi mdi-email-open"></i>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-xl-10">
            <h4 class="text-primary">Subscribe !</h4>
            <p class="text-muted font-size-14 mb-4">
              Subscribe our newletter and get notification to stay update.
            </p>

            <div class="input-group bg-light rounded">
              <input
                type="email"
                class="form-control bg-transparent border-0"
                placeholder="Enter Email address"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />

              <button class="btn btn-primary" type="button" id="button-addon2">
                <i class="bx bxs-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </Layout>
</template>
