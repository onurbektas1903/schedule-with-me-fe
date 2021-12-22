<script>
import router from "@/router";
import { layoutComputed } from "@/state/helpers";

import Topbar from "@/components/topbar";
import SideBar from "@/components/side-bar";
import Rightsidebar from "@/components/right-bar";
import Footer from "@/components/footer";

/**
 * Vertical layout
 */
export default {
  data() {
    return {
      isMenuCondensed: false,
      type: this.$store
        ? this.$store.state.layout.leftSidebarType
        : null || null,
      width: this.$store ? this.$store.state.layout.layoutWidth : null || null,
      color: this.$store ? this.$store.state.layout.sidebarColor : null || null,
    };
  },
  components: { Topbar, SideBar, Rightsidebar, Footer },
  created: () => {
    document.body.setAttribute("data-sidebar", "dark");
    document.body.removeAttribute("data-layout", "horizontal");
  },
  computed: {
    ...layoutComputed,
  },
  methods: {
    toggleMenu() {
      var currentSIdebarSize = document.body.getAttribute("data-sidebar-size");
      document.body.classList.toggle("sidebar-enable");
      if (window.screen.width >= 992) {
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
        });
        if (currentSIdebarSize == null) {
          document.body.getAttribute("data-sidebar-size") == null ||
          document.body.getAttribute("data-sidebar-size") == "lg"
            ? document.body.setAttribute("data-sidebar-size", "sm")
            : document.body.setAttribute("data-sidebar-size", "lg");
        } else if (currentSIdebarSize == "md") {
          document.body.getAttribute("data-sidebar-size") == "md"
            ? document.body.setAttribute("data-sidebar-size", "sm")
            : document.body.setAttribute("data-sidebar-size", "md");
        } else {
          document.body.getAttribute("data-sidebar-size") == "sm"
            ? document.body.setAttribute("data-sidebar-size", "lg")
            : document.body.setAttribute("data-sidebar-size", "sm");
        }
      } else {
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
        });
        document.body.classList.remove("vertical-collpsed");
      }
      this.isMenuCondensed = !this.isMenuCondensed;
    },
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
  },
  mounted() {
    if (this.layout == "horizontal") {
      this.changeTopbar({ topbar: "dark" });
      this.topbar = "dark";
    } else if (this.layout == "vertical") {
      this.changeTopbar({ topbar: "dark" });
      this.topbar = "dark";
    } else if (this.layout == "vertical" && !this.layoutMode == "dark") {
      this.changeTopbar({ topbar: "dark" });
      this.topbar = "dark";
    } else if (this.layout == "vertical" && this.layoutMode == "dark") {
      this.changeTopbar({ topbar: "dark" });
      this.topbar = "dark";
    }

    if (this.loader === true) {
      document.getElementById("preloader").style.display = "block";
      document.getElementById("status").style.display = "block";
      setTimeout(function() {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("status").style.display = "none";
      }, 2500);
    } else {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("status").style.display = "none";
    }
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
      <SideBar
        :type="leftSidebarType"
        :width="layoutWidth"
        :color="sidebarColor"
      />
      <!-- ============================================================== -->
      <!-- Start right Content here -->
      <!-- ============================================================== -->

      <div class="main-content" id="mainContent">
        <div class="page-content">
          <div class="container-fluid">
            <slot />
          </div>
        </div>
        <Footer />
      </div>
      <Rightsidebar />
    </div>
  </div>
</template>
