<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

import SalesAnalytics from "./meetingProviderStatistics";
import Transactions from "./organizerStatistics";
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
    SalesAnalytics,
    Transactions,
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
