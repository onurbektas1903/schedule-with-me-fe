<script>
import { layoutComputed } from "@/state/helpers";

import Topbar from "@/components/topbar";
import Rightsidebar from "@/components/right-bar";
import Footer from "@/components/footer";
import HorizontalNav from "@/components/horizontal-nav";

/**
 * Horizontal layout
 */
export default {
  data() {
    return {};
  },
  mounted() {
    document.body.setAttribute("data-layout", "horizontal");
    document.body.removeAttribute("data-sidebar");
    
    if (this.loader === true) {
      document.getElementById("preloader").style.display = "block";
      document.getElementById("status").style.display = "block";

      setTimeout(function () {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("status").style.display = "none";
      }, 2500);
    } else {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("status").style.display = "none";
    }
  },
  components: {
    Topbar,
    Rightsidebar,
    Footer,
    HorizontalNav,
  },
  methods: {
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
    toggleMenu() {
      let element = document.getElementById("topnav-menu-content");
      element.classList.toggle("show");
    },
  },
  computed: {
    ...layoutComputed,
  },
};
</script>

<template>
  <div>
    <div id="preloader">
      <div id="status">
        <div class="spinner-chase">
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
        </div>
      </div>
    </div>
    <!-- Begin page -->
    <div id="layout-wrapper">
      <Topbar :type="topbar" :layoutscroll="layoutScrollable" />
      <HorizontalNav :width="layoutWidth" />
      <!-- ============================================================== -->
      <!-- Start right Content here -->
      <!-- ============================================================== -->
      <div class="main-content" id="mainContent">
        <div class="page-content">
          <div class="container-fluid">
            <slot />
          </div>
          <!-- container-fluid -->
        </div>
        <!-- End Page-content -->
        <Footer />
      </div>
      <!-- end main content-->
      <Rightsidebar />
    </div>
    <!-- END layout-wrapper -->
  </div>
</template>
