<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Starter-page component
 */
export default {
  page: {
    title: "Starter Page",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Starter Page",
      items: [
        {
          text: "Pages",
        },
        {
          text: "Starter Page",
          active: true,
        },
      ],
    };
  },
  components: {
    Layout,
    PageHeader,
  },
};
</script>

<template>
  <Layout>
    <PageHeader :items="items" :title="title" />
  </Layout>
</template>
