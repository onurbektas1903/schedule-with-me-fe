<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import Multiselect from "vue-multiselect";

import {providers, conferenceTypes} from "./dataAdvancedtable";
import {providerService} from "@/helpers/fakebackend/provider.service";
import {required} from "vuelidate/lib/validators";
import Swal from "sweetalert2";

/**
 * Datatable component
 */
export default {
  page: {
    title: "Konferans Sağlayıcılar",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      meetingAccounts: [
        {
          id: "1",
          userName: "onur.bektas@gmail.com",
          clientId: "clientTest",
          clientSecret: "*****"
        }
      ],
      showModal: false,
      showAccountsModal: false,
      submitted: false,
      provider: {
        name: "",
        meetingProviderType: "",
        providerAccounts: [],
        conferenceType: ""
      },
      validations: {
        provider: {
          name: {required}
        },
      },
      providers: providers,
      conferenceTypes: conferenceTypes,
      tableData: [],
      title: "Konferans Sağlayıcılar",
      items: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      fields: [
        {
          key: "name",
          sortable: true,
        },
        {
          key: "meetingProviderType",
          sortable: true,
        }
      ],
    };
  },
  components: {
    Layout,
    PageHeader,
    Multiselect

  },
  computed: {
    rows() {
      return this.tableData.length;
    },
  },
  mounted() {
    // Set the initial number of items
    providerService.getAll().then(value => {
      this.tableData = value;
    })
    this.totalRows = this.items.length;
  },
  methods: {
    addProvider() {
      this.showModal = true;
      this.provider = {};
    },
    hideModal(e) {
      this.submitted = false;
      this.showModal = false;
      this.provider = {};
    },
    createOrUpdateProvider(provider) {
      providerService.createMeetingProvider(
          provider
      ).then(result => {
        providerService.getAll().then(value => {
          this.tableData = value;
        });
        console.log(result);
      })
    },
    successmsg() {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Event has been saved",
        showConfirmButton: false,
        timer: 1000,
      });
    },
    openAccountsModal(e) {
      this.showAccountsModal = true;
    },
    hideAccountsModal(e) {
      this.showAccountsModal = false;
      this.meetingAccounts = this.meetingAccounts.filter(value => value.userName != "");
    },
    insertNewAccount(e) {
      this.meetingAccounts.push({
        id: "",
        userName: "",
        clientId: "",
        clientSecret: ""
      })
    },
    saveMeetingAccounts(e) {
      this.provider.providerAccounts = this.meetingAccounts;
      this.showAccountsModal = false;
      console.log("save accounts");
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    handleSubmit(e) {
      //TODO handle validations
      this.submitted = true;
      // this.$v.$touch();
      // if (this.$v.$invalid) {
      //   return;
      // } else {
      const name = this.provider.name;
      const meetingProviderType = this.provider.meetingProviderType;
      const providerAccounts = this.provider.providerAccounts;
      const conferenceType = this.provider.conferenceType;
      const provider = {
        name,
        meetingProviderType,
        providerAccounts,
        conferenceType
      };
      this.createOrUpdateProvider(
          provider
      );
      this.successmsg();
      this.showModal = false;
      this.newEventData = {};
      this.submitted = false;
      this.event = {};
    }
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Datatable</h4>
            <div class="row mt-4" id="datatable_wrapper">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <b-button variant="light" @click="addProvider">Konferans Sağlayıcı Ekle</b-button>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div
                    id="tickets-table_filter"
                    class="dataTables_filter text-md-end"
                >
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                        v-model="filter"
                        type="search"
                        placeholder="Search..."
                        class="form-control form-control-sm ms-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                  class="datatables"
                  :items="tableData"
                  :fields="fields"
                  responsive="sm"
                  :per-page="perPage"
                  :current-page="currentPage"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :filter="filter"
                  :selectable="true"
                  :filter-included-fields="filterOn"
                  @filtered="onFiltered"
              ></b-table>
            </div>
            <div class="row">
              <div class="col">
                <div
                    class="dataTables_paginate paging_simple_numbers float-end"
                >
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
        v-model="showModal"
        title="Konferans Sağlayıcı Ekle"
        title-class="text-black font-18"
        header-class="py-3 px-4 border-bottom-0"
        body-class="p-4"
        hide-footer
        centered
    >
      <form @submit.prevent="handleSubmit" autocomplete="off">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="name">Ad</label>
              <input
                  id="name"
                  v-model="provider.name"
                  type="text"
                  class="form-control"
                  placeholder="Sağlayıcı Adı Ekle"
                  :class="{ 'is-invalid': submitted && $v.provider.name.$error }"
              />
              <div
                  v-if="submitted && !$v.provider.name.required"
                  class="invalid-feedback"
              >
                This value is required.
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="name">Açıklama</label>
              <textarea
                  id="description"
                  v-model="provider.description"
                  type="text"
                  class="form-control"
                  placeholder="Açıklama Ekle"
                  :class="{ 'is-invalid': submitted && $v.event.description.$error }"
              />
              <div
                  v-if="submitted && !$v.event.title.required"
                  class="invalid-feedback"
              >
                This value is required.
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label class="form-label">Konferans Sağlayıcı Tipi</label>
              <select
                  v-model="provider.meetingProviderType"
                  class="form-control form-select"
                  name="category"
                  :class="{ 'is-invalid': submitted && $v.provider.meetingProviderType.errors }"
              >
                <option
                    v-for="option in this.providers"
                    :key="option.name"
                    :value="`${option.value}`"
                >{{ option.name }}
                </option
                >
              </select>
              <div
                  v-if="submitted && !$v.provider.meetingProviderType.required"
                  class="invalid-feedback"
              >
                This value is required.
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label class="form-label">Konferans Sağlayıcı Hesap Tipi</label>
              <select
                  v-model="provider.conferenceType"
                  class="form-control form-select"
                  name="category"
                  :class="{ 'is-invalid': submitted && $v.provider.conferenceType.errors }"
              >
                <option
                    v-for="option in this.conferenceTypes"
                    :key="option.name"
                    :value="`${option.value}`"
                >{{ option.name }}
                </option
                >
              </select>
              <div
                  v-if="submitted && !$v.provider.conferenceType.required"
                  class="invalid-feedback"
              >
                This value is required.
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="mb-3">
            <label>Hesaplar</label>
            <multiselect
                v-model="provider.providerAccounts"
                :multiple="true"
                track-by="userName"
                label="userName"
                :options=this.meetingAccounts
                placeholder="Konferans Hesapları Ekle"
            >
            </multiselect>
            <b-button variant="light" @click="openAccountsModal">Hesap Ekle</b-button>
            <div
                v-if="submitted && !$v.provider.providerAccounts.required"
                class="invalid-feedback"
            >
              This value is required.
            </div>
          </div>
        </div>
        <div class="text-end">
          <b-button variant="light" @click="hideModal">Kapat</b-button>
          <b-button type="submit" variant="success" class="ms-1">Kaydet
          </b-button
          >
        </div>
      </form>
    </b-modal>
    <b-modal
        v-model="showAccountsModal"
        title="Konferans Hesapları"
        title-class="text-black font-18"
        header-class="py-3 px-4 border-bottom-0"
        body-class="p-4"
        hide-footer
        centered
    >
      <div class="row">
        <h4 class="card-title">Basic Example</h4>

        <div class="table-responsive">
          <table class="table mb-0"
                 contenteditable="true"
          >
            <thead>
            <tr>
              <th>Kullanıcı adı</th>
              <th>Client Id</th>
              <th>Client Secret</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="account in meetingAccounts" :key="account.id">
              <td>{{ account.userName }}</td>
              <td>{{ account.clientId }}</td>
              <td>{{ account.clientSecret }}</td>
            </tr>
            </tbody>
            <br></br>
            <tfoot class="text-end">
            <b-button variant="light" @click="insertNewAccount">Yeni Hesap</b-button>
            <b-button variant="light" @click="saveMeetingAccounts">Kaydet</b-button>
            <b-button variant="light" @click="hideAccountsModal">Kapat</b-button>
            </tfoot>
          </table>
        </div>
      </div>
    </b-modal>
  </Layout>
</template>
