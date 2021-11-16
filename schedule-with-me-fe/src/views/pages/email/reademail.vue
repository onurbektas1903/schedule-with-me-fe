<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import Toolbar from "./toolbar";
import { emailData } from "./data-inbox";

/**
 * Email-read component
 */
export default {
  page: {
    title: "Read Email",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
    Toolbar,
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      emailRead: null,
      emailData: emailData,
      title: "Read Email",
      items: [
        {
          text: "Email",
          href: "/",
        },
        {
          text: "Read Email",
          active: true,
        },
      ],
      showModal: false,
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
    };
  },
  created() {
    this.emailRead = emailData.filter((email) => {
      return email.id === parseInt(this.$route.params.id);
    });
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-12">
        <!-- Left sidebar -->
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
        <!-- End Left sidebar -->

        <!-- Right Sidebar -->
        <div class="email-rightbar mb-3">
          <div class="card">
            <div class="btn-toolbar p-3" role="toolbar">
              <Toolbar />
            </div>

            <div class="card-body">
              <div class="d-flex align-items-start mb-4">
                <img
                  class="d-flex me-3 rounded-circle avatar-sm"
                  src="@/assets/images/users/avatar-2.jpg"
                  alt="Generic placeholder image"
                />
                <div class="flex-1">
                  <h5 class="font-size-14 my-1">Humberto D. Champion</h5>
                  <small class="text-muted">support@domain.com</small>
                </div>
              </div>

              <h4 class="mt-0 font-size-16">{{ emailRead[0].title }}</h4>

              <p class="text-muted">Dear Lorem Ipsum,</p>
              <p class="text-muted">{{ emailRead[0].subject }}</p>
              <p class="text-muted">
                Sed elementum turpis eu lorem interdum, sed porttitor eros
                commodo. Nam eu venenatis tortor, id lacinia diam. Sed aliquam
                in dui et porta. Sed bibendum orci non tincidunt ultrices.
                Vivamus fringilla, mi lacinia dapibus condimentum, ipsum urna
                lacinia lacus, vel tincidunt mi nibh sit amet lorem.
              </p>
              <p class="text-muted">Sincerly,</p>
              <hr />

              <div class="row">
                <div class="col-xl-2 col-6">
                  <div class="card">
                    <img
                      class="card-img-top img-fluid"
                      src="@/assets/images/small/img-3.jpg"
                      alt="Card image cap"
                    />
                    <div class="py-2 text-center">
                      <a href class="font-weight-medium">Download</a>
                    </div>
                  </div>
                </div>
                <div class="col-xl-2 col-6">
                  <div class="card">
                    <img
                      class="card-img-top img-fluid"
                      src="@/assets/images/small/img-4.jpg"
                      alt="Card image cap"
                    />
                    <div class="py-2 text-center">
                      <a href class="font-weight-medium">Download</a>
                    </div>
                  </div>
                </div>
              </div>

              <a href="javascript: void(0);" class="btn btn-light mt-4">
                <i class="mdi mdi-reply"></i> Reply
              </a>
            </div>
          </div>
        </div>
        <!-- card -->
      </div>
      <!-- end Col-9 -->
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
        <b-button variant="secondary" @click="showModal = false"
          >Close</b-button
        >
        <b-button variant="primary">
          Send
          <i class="fab fa-telegram-plane ml-1"></i>
        </b-button>
      </template>
    </b-modal>
  </Layout>
</template>
