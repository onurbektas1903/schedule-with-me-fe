<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import Toolbar from "./toolbar";

import { emailData } from "./data-inbox";

/**
 * Email-inbox component
 */
export default {
  page: {
    title: "Inbox",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader, Toolbar, ckeditor: CKEditor.component },
  data() {
    return {
      emailData: emailData,
      paginatedEmailData: emailData,
      title: "Inbox",
      items: [
        {
          text: "Email",
          href: "/",
        },
        {
          text: "Inbox",
          active: true,
        },
      ],
      // page number
      currentPage: 1,
      // default page size
      perPage: 15,
      // start and end index
      startIndex: 1,
      endIndex: 15,
      showModal: false,
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
    };
  },
  computed: {
    rows() {
      return this.emailData.length;
    },
  },
  created() {
    this.startIndex = 0;
    this.endIndex = this.perPage;

    this.paginatedEmailData = this.emailData.slice(
      this.startIndex,
      this.endIndex
    );
  },
  methods: {
    onPageChange() {
      this.startIndex = (this.currentPage - 1) * this.perPage;
      this.endIndex = (this.currentPage - 1) * this.perPage + this.perPage;

      this.paginatedEmailData = this.emailData.slice(
        this.startIndex,
        this.endIndex
      );
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <!-- Right Sidebar -->
      <div class="col-12">
        <div class="email-leftbar card">
          <b-button
            variant="danger"
            @click="showModal = true"
            class="fw-semibold"
            >Compose</b-button
          >
          <div class="mail-list mt-4">
            <a href="javascript:void(0);" class="active"
              ><i class="bx bxs-inbox font-size-16 align-middle me-2"></i> Inbox
              <span class="ms-1 float-end">(18)</span></a
            >
            <a href="javascript:void(0);"
              ><i class="bx bx-star font-size-16 align-middle me-2"></i
              >Starred</a
            >
            <a href="javascript:void(0);"
              ><i class="bx bxs-bookmark font-size-16 align-middle me-2"></i
              >Important</a
            >
            <a href="javascript:void(0);"
              ><i class="bx bx-file font-size-16 align-middle me-2"></i>Draft</a
            >
            <a href="javascript:void(0);"
              ><i class="bx bx-mail-send font-size-16 align-middle me-2"></i
              >Sent Mail</a
            >
            <a href="javascript:void(0);"
              ><i class="bx bx-trash font-size-16 align-middle me-2"></i
              >Trash</a
            >
          </div>
          <h6 class="mt-4">Labels</h6>
          <div class="mail-list mt-1">
            <a href="javascript:void(0);"
              ><span class="mdi mdi-circle-outline text-info me-2"></span>Theme
              Support</a
            >
            <a href="javascript:void(0);"
              ><span class="mdi mdi-circle-outline text-warning me-2"></span
              >Freelance</a
            >
            <a href="javascript:void(0);"
              ><span class="mdi mdi-circle-outline text-primary me-2"></span
              >Social</a
            >
            <a href="javascript:void(0);"
              ><span class="mdi mdi-circle-outline text-danger me-2"></span
              >Friends</a
            >
            <a href="javascript:void(0);"
              ><span class="mdi mdi-circle-outline text-success me-2"></span
              >Family</a
            >
          </div>
        </div>
        <div class="email-rightbar mb-3">
          <div class="card">
            <div class="btn-toolbar p-3">
              <Toolbar />
            </div>

            <ul class="message-list">
              <li
                v-for="(email, index) in paginatedEmailData"
                :key="index"
                :class="{ unread: `${email.unread}` === 'true' }"
              >
                <div class="col-mail col-mail-1">
                  <div class="checkbox-wrapper-mail">
                    <input :id="`chk-${index}`" type="checkbox" />
                    <label :for="`chk-${index}`"></label>
                  </div>
                  <span
                    class="star-toggle bx bx-star"
                    :class="{
                      'bxs-star text-warning': email.text === 'warning',
                    }"
                  ></span>
                  <a class="title">{{ email.title }}</a>
                </div>
                <div class="col-mail col-mail-2">
                  <router-link
                    :to="`/email/read/${email.id}`"
                    :style="{ cursor: 'pointer' }"
                    custom
                    v-slot="{ navigate }"
                  >
                    <a
                      @click="navigate"
                      @keypress.enter="navigate"
                      class="subject"
                      role="link"
                      > {{ email.subject }}</a
                    >
                  </router-link>
                  <div class="date">{{ email.date }}</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="text-center text-sm-start">
          <div class="row">
            <div class="col-sm-7">
              Showing {{ startIndex }} - {{ endIndex }} of {{ rows }}
            </div>
            <!-- end col-->
            <div class="col-sm-5">
              <div class="pagination-rounded  mt-3 mt-sm-0 ">
                <b-pagination
                class="justify-content-center justify-content-sm-end"
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  @input="onPageChange"
                ></b-pagination>
              </div>
            </div>
            <!-- end col-->
          </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="showModal" title="New Message" centered>
      <form>
        <div class="mb-3">
          <input type="email" class="form-control" placeholder="To" />
        </div>

        <div class="mb-3">
          <input type="text" class="form-control" placeholder="Subject" />
        </div>
        <div class="mb-3">
          <ckeditor v-model="editorData" :editor="editor"></ckeditor>
        </div>
      </form>
      <template v-slot:modal-footer>
        <b-button variant="light" @click="showModal = false">Close</b-button>
        <b-button variant="primary">
          Send
          <i class="fab fa-telegram-plane ms-1"></i>
        </b-button>
      </template>
    </b-modal>
  </Layout>
</template>
