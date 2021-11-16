<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Pricing component
 */
export default {
  page: {
    title: "Pricing",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Pricing",
      items: [
        {
          text: "Pages",
        },
        {
          text: "Pricing",
          active: true,
        },
      ],
      pricingData: [
        {
          title :'Starter',
          icon: 'mdi-square-edit-outline',
          subtext: 'Suitable for 1 team member',
          package: '19'
        },
        {
          title :'Professional',
          icon: 'mdi-medal-outline',
          subtext: 'Suitable for 3 team member',
          package: '29'
        },
        {
          title :'Enterprise',
          icon: 'mdi-layers-triple-outline',
          subtext: 'Suitable for 19 team member',
          package: '39'
        },
        {
          title :'Unlimited',
          icon: 'mdi-crown-outline',
          subtext: 'Suitable for unlimited team member',
          package: '49'
        }
      ]
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
    <div class="row justify-content-center">
      <div class="col-lg-5">
        <div class="text-center my-3">
          <h4 class="mb-3">Choose your Pricing plan</h4>
          <p class="text-muted mb-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo veritatis
          </p>
        </div>
      </div>
    </div>
    <!-- end row -->

    <b-tabs  pills align="center" class="mt-4" content-class="mt-3">
      <b-tab active title-link-class="fw-semibold">
        <template v-slot:title>
          Monthly
        </template>
        <div class="row g-0">
          <div class="col-xl-3 col-md-6" v-for="(item, index) in pricingData" :key="index">
            <div class="card plan-box rounded-start rounded-0">
              <div class="card-body p-4">
                <div class="d-flex">
                  <div class="me-3">
                    <i :class="`mdi ${item.icon} h1 text-primary`"></i>
                  </div>
                  <div class="flex-1">
                    <h5 class="mb-1">{{item.title}}</h5>
                    <p class="text-muted">{{item.subtext}}</p>
                  </div>
                </div>
                <div class="py-4 border-bottom">
                  <h3>
                    <sup><small>$</small></sup> {{item.package}}/
                    <span class="font-size-13 text-muted">Per month</span>
                  </h3>
                </div>

                <ul class="list-unstyled plan-features mt-4">
                  <li>
                    <i class="mdi mdi-circle-medium text-primary me-2"></i> Free
                    Live Support
                  </li>
                  <li>
                    <i class="mdi mdi-circle-medium text-primary me-2"></i>
                    Unlimited User
                  </li>
                  <li>
                    <i class="mdi mdi-circle-medium text-primary me-2"></i> No
                    Time Tracking
                  </li>
                  <li>
                    <i class="mdi mdi-circle-medium text-primary me-2"></i> Free
                    Setup
                  </li>
                </ul>

                <div class="text-center plan-btn mt-4 mb-2">
                  <a href="javascript:void(0);" class="btn btn-primary waves-effect waves-light"
                    >Sign up Now</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end row -->
      </b-tab>
      <b-tab title-link-class="fw-semibold">
        <template v-slot:title>
          Yearly
        </template>
          <div class="row g-0">
          <div class="col-xl-3 col-md-6" v-for="(item, index) in pricingData" :key="index">
            <div class="card plan-box rounded-start rounded-0">
              <div class="card-body p-4">
                <div class="d-flex">
                  <div class="me-3">
                    <i :class="`mdi ${item.icon} h1 text-primary`"></i>
                  </div>
                  <div class="flex-1">
                    <h5 class="mb-1">{{item.title}}</h5>
                    <p class="text-muted">{{item.subtext}}</p>
                  </div>
                </div>
                <div class="py-4 border-bottom">
                  <h3>
                    <sup><small>$</small></sup> {{item.package}}/
                    <span class="font-size-13 text-muted">Per month</span>
                  </h3>
                </div>

                <ul class="list-unstyled plan-features mt-4">
                  <li>
                    <i class="mdi mdi-circle-medium text-primary me-2"></i> Free
                    Live Support
                  </li>
                  <li>
                    <i class="mdi mdi-circle-medium text-primary me-2"></i>
                    Unlimited User
                  </li>
                  <li>
                    <i class="mdi mdi-circle-medium text-primary me-2"></i> No
                    Time Tracking
                  </li>
                  <li>
                    <i class="mdi mdi-circle-medium text-primary me-2"></i> Free
                    Setup
                  </li>
                </ul>

                <div class="text-center plan-btn mt-4 mb-2">
                  <a href="#" class="btn btn-primary waves-effect waves-light"
                    >Sign up Now</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end row -->
      </b-tab>
    </b-tabs>
  </Layout>
</template>
