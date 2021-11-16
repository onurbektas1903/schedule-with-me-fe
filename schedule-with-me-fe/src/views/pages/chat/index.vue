<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

import { chatData, chatMessagesData } from "./data";
import simplebar from "simplebar-vue";
import { required } from "vuelidate/lib/validators";
import appConfig from "@/app.config";

/**
 * Chat component
 */
export default {
  page: {
    title: "Chat",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      chatData: chatData,
      chatMessagesData: chatMessagesData,
      title: "Chat",
      items: [
        {
          text: "Apps",
        },
        {
          text: "Chat",
          active: true,
        },
      ],
      submitted: false,
      form: {
        message: "",
      },
      username: "John Howard",
      userprofile: require("@/assets/images/users/avatar-2.jpg"),
    };
  },
  methods: {
    /**
     * Get the name of user
     */
    chatUsername(name, profile) {
      this.username = name;
      this.userprofile = profile;
      this.usermessage = "Hello";
      this.chatMessagesData = [];
      const currentDate = new Date();

      this.chatMessagesData.push({
        profile: this.userprofile,
        name: this.username,
        message: this.usermessage,
        time: currentDate.getHours() + ":" + currentDate.getMinutes(),
      });
    },

    /**
     * Char form Submit
     */
    // eslint-disable-next-line no-unused-vars
    formSubmit(e) {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        const message = this.form.message;
        const currentDate = new Date();
        this.chatMessagesData.push({
          align: "right",
          name: "Henry Wells",
          profile: require("@/assets/images/users/avatar-4.jpg"),
          message,
          time: currentDate.getHours() + ":" + currentDate.getMinutes(),
        });
        this.handleScroll();
      }
      this.submitted = false;
      this.form = {};
    },

    handleScroll() {
      if (this.$refs.current.$el) {
        setTimeout(() => {
          this.$refs.current.SimpleBar.getScrollElement().scrollTop =
            this.$refs.current.SimpleBar.getScrollElement().scrollHeight + 1500;
        }, 500);
      }
    },
  },
  components: {
    Layout,
    PageHeader,
    simplebar,
  },
  mounted() {
    // var container2 = document.querySelector(
    //   "#containerElement .simplebar-content-wrapper"
    // );
    // container2.scrollTo({ top: 500, behavior: "smooth" });
  },
  validations: {
    form: {
      message: {
        required,
      },
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="d-lg-flex mb-4">
      <div class="chat-leftsidebar card">
        <div class="p-3 px-4 bg-light">
          <div class="d-flex align-items-start">
            <div class="align-self-center me-3">
              <img
                src="@/assets/images/users/avatar-4.jpg"
                class="avatar-xs rounded-circle"
                alt="avatar"
              />
            </div>
            <div class="flex-1">
              <h5 class="font-size-16 mt-0 mb-1">
                <a href="javascript:void(0);" class="text-reset"
                  >Marcus
                  <i
                    class="mdi mdi-circle text-success align-middle font-size-10 ms-1"
                  ></i
                ></a>
              </h5>
              <p class="text-muted mb-0 font-size-12">Available</p>
            </div>

            <div>
              <b-dropdown
                class="chat-noti-dropdown"
                toggle-class="py-0"
                menu-class="dropdown-menu-end"
                variant="white"
              >
                <template #button-content>
                  <i class="mdi mdi-dots-horizontal"></i>
                </template>
                <b-dropdown-item>Profile</b-dropdown-item>
                <b-dropdown-item>Edit</b-dropdown-item>
                <b-dropdown-item>Add Contact</b-dropdown-item>
                <b-dropdown-item>Settings</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>

        <div class="p-3">
          <div class="search-box chat-search-box">
            <div class="position-relative">
              <input
                type="text"
                class="form-control border-light rounded"
                placeholder="Search..."
              />
              <i class="mdi mdi-magnify search-icon"></i>
            </div>
          </div>
        </div>

        <div>
          <div class="border-top">
            <simplebar class="p-4" style="max-height: 470px;">
              <div>
                <h5 class="font-size-13 text-uppercase mb-3">
                  <i class="mdi mdi-account-outline me-1"></i> Contacts
                </h5>

                <ul class="list-unstyled chat-list">
                  <li
                    v-for="(item, index) in chatData"
                    :key="index"
                    @click="chatUsername(item.name, item.image)"
                    :class="{ active: username == item.name }"
                  >
                    <a href="javascript:void(0);">
                      <div class="d-flex align-items-start">
                        <div
                          class="user-img online align-self-center me-3"
                          v-if="item.image"
                        >
                          <img
                            :src="`${item.image}`"
                            class="rounded-circle avatar-xs"
                            alt="avatar"
                          />
                          <span class="user-status"></span>
                        </div>

                        <div
                          class="user-img online align-self-center me-3"
                          v-if="!item.image"
                        >
                          <div class="avatar-xs align-self-center">
                            <span
                              class="avatar-title rounded-circle bg-primary"
                              >{{ item.name.charAt(0) }}</span
                            >
                          </div>
                        </div>
                        <div class="flex-1 overflow-hidden">
                          <h5 class="text-truncate font-size-14 mb-1">
                            {{ item.name }}
                          </h5>
                          <p class="text-truncate font-size-13 mb-0">
                            {{ item.message }}
                          </p>
                        </div>
                        <div class="font-size-11">{{ item.time }}</div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </simplebar>
          </div>
        </div>
      </div>
      <!-- end chat-leftsidebar -->

      <div class="w-100 user-chat mt-4 mt-sm-0 ms-lg-1">
        <div class="card">
          <div class="p-3 px-lg-4 border-bottom">
            <div class="row">
              <div class="col-md-4 col-6">
                <div class="d-flex align-items-center">
                  <div class="d-block d-lg-none me-2 ms-0">
                    <a
                      href="javascript: void(0);"
                      class="user-chat-remove text-muted font-size-16 p-2"
                      ><i class="ri-arrow-left-s-line"></i
                    ></a>
                  </div>
                  <div class="me-3 ms-0" v-if="userprofile !== undefined">
                    <img
                      :src="`${userprofile}`"
                      class="rounded-circle avatar-xs"
                      alt="avatar"
                    />
                  </div>
                  <div
                      class="user-img online align-self-center me-3"
                      v-if="userprofile == undefined"
                    >
                      <div class="avatar-xs align-self-center">
                        <span class="avatar-title rounded-circle bg-primary">{{
                          username.charAt(0)
                        }}</span>
                      </div>
                      <span class="user-status"></span>
                    </div>

                  <div class="flex-1 overflow-hidden">
                    <h5 class="font-size-16 mb-0 text-truncate">
                      <a href="#" class="text-reset user-profile-show">{{
                        username
                      }}</a>
                      <i
                        class="mdi mdi-circle text-success align-middle font-size-10 ms-1"
                      ></i>
                    </h5>
                  </div>
                </div>
              </div>
              <div class="col-md-8 col-6">
                <ul class="list-inline user-chat-nav text-end mb-0">
                  <li class="list-inline-item">
                    <b-dropdown
                      variant="white"
                      toggle-class="nav-btn"
                      menu-class="dropdown-menu-end dropdown-menu-md p-0"
                    >
                      <template #button-content>
                        <i class="mdi mdi-magnify"></i>
                      </template>
                      <form class="p-2">
                        <div>
                          <input
                            type="text"
                            class="form-control border-light rounded"
                            placeholder="Search..."
                          />
                        </div>
                      </form>
                    </b-dropdown>
                  </li>

                  <li class="list-inline-item">
                    <b-dropdown
                      variant="white"
                      menu-class="dropdown-menu-end"
                      toggle-class="nav-btn"
                    >
                      <template #button-content>
                        <i class="mdi mdi-dots-horizontal"></i>
                      </template>
                      <b-dropdown-item>Profile</b-dropdown-item>
                      <b-dropdown-item>Archive</b-dropdown-item>
                      <b-dropdown-item>Muted</b-dropdown-item>
                      <b-dropdown-item>Delete</b-dropdown-item>
                    </b-dropdown>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="py-lg-3 px-lg-2">
            <simplebar
              class="chat-conversation p-3"
              style="max-height: 455px;"
              id="containerElement"
              ref="current"
            >
              <ul class="list-unstyled mb-0">
                <li class="chat-day-title">
                  <div class="title">Today</div>
                </li>
                <li
                  v-for="(item, index) in chatMessagesData"
                  :key="index"
                  :class="{ right: `${item.align}` === 'right' }"
                >
                  <div class="conversation-list d-flex">
                    <div
                      class="chat-user-img online align-self-start"
                      :class="{ 'order-3': `${item.align}` === 'right' }"
                    >
                    <div v-if="item.profile">
                      <img
                        :src="`${item.profile}`"
                        class="rounded-circle avatar-xs"
                        alt="avatar"
                      />
                    </div>
                    <div v-if="!item.profile">
                      <div class="avatar-xs align-self-center">
                        <span class="avatar-title rounded-circle bg-primary">{{
                          username.charAt(0)
                        }}</span>
                      </div>
                    </div>
                    </div>
                    <div class="ctext-wrap">
                      <div class="ctext-wrap-content">
                        <p class="mb-0">
                          {{ item.message }}
                          <span class="d-inline-block font-size-12 text-muted ms-3">
                            {{ item.time }}</span>
                        </p>
                      </div>
                      <b-dropdown class="align-self-start" variant="white">
                        <template #button-content>
                          <i class="mdi mdi-dots-vertical"></i>
                        </template>
                        <b-dropdown-item>Copy</b-dropdown-item>
                        <b-dropdown-item>Save</b-dropdown-item>
                        <b-dropdown-item>Forward</b-dropdown-item>
                        <b-dropdown-item>Delete</b-dropdown-item>
                      </b-dropdown>
                    </div>
                  </div>
                </li>
              </ul>
            </simplebar>
          </div>

          <div class="p-3 chat-input-section">
            <form @submit.prevent="formSubmit" class="row">
              <div class="col">
                <div class="position-relative">
                  <input
                    type="text"
                    v-model="form.message"
                    class="form-control chat-input rounded"
                    placeholder="Enter Message..."
                    :class="{
                      'is-invalid': submitted && $v.form.message.$error,
                    }"
                  />
                  <div
                    v-if="submitted && $v.form.message.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.form.message.required"
                      >This value is required.</span
                    >
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <button type="submit" class="btn btn-primary chat-send w-md">
                  <span class="d-none d-sm-inline-block me-2">Send</span>
                  <i class="mdi mdi-send float-end"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- End d-lg-flex  -->
  </Layout>
</template>
