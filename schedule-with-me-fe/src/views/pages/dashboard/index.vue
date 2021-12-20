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

    <div class="row">
      <SalesAnalytics />
      <Transactions />
    </div>


  </Layout>
</template>
