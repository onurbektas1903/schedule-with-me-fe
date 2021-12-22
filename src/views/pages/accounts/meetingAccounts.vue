<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import Multiselect from "vue-multiselect";

import {accountService} from "@/helpers/backend/account.service";
import {required} from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import {providers} from '../tables/dataAdvancedtable'
import {meetingProviderExceptionHandler} from "@/views/pages/tables/meetingProviderErrorHandler";
import {meetingAccountExceptionHandler} from "@/views/pages/accounts/meetingAccountExceptionHandler";

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
      providers: providers,
      selectedProviderType: "",
      file: '',
      meetingAccounts: [],
      googleAccount: {
        id: "",
        accountMail: "",
        applicationName: "",
        adminUserEmail: "",
        fileName: "",
        file:null
      },
      zoomAccount: {
        id: "",
        accountMail: "",
        applicationName: "",
        apiKey: "",
        apiSecret: ""

      },
      showModal: false,
      showZoomModal: false,
      showGoogleModal: false,
      submitted: false,
      providerAccount: {
        id: "",
        accountMail: "",
        adminUserEmail: "",
        applicationName: "",
        clientId: "",
        clientSecret: "",
        fileName: ""
      },
      provider: {
        id: "",
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
      tableData: [],
      title: "Hesaplar",
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
          key: "accountMail",
          sortable: true,
        },
        {
          key: "applicationName",
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
    this.totalRows = this.items.length;
  },
  methods: {
    handleProviderSelected(e) {
      this.tableData = [];
      switch (this.selectedProviderType) {
        case 'ZOOM': {
          accountService.getZoomAccounts().then(resp => {
            this.tableData = resp
          });
          break;
        }
        case 'GOOGLE': {
          this.getGoogleAccounts();
          break;
        }
      }
    },
    getZoomAccounts() {
      accountService.getZoomAccounts().then(resp => {
        this.tableData = resp
      });
    },
    getGoogleAccounts() {
      accountService.getGoogleAccounts().then(resp => {
        this.tableData = resp
      });
    },
    confirm() {
      Swal.fire({
        title: "Emin misiniz?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Evet!",
        cancelButtonText: "Hayır",
      }).then((result) => {
        if (result.value) {
          this.deleteAccount();
        }
      });
    },
    deleteAccount(id) {
      switch (this.selectedProviderType) {
        case 'ZOOM': {
          this.deleteZoomAccount();
          break;
        }
        case 'GOOGLE': {
          this.deleteGoogleAccount();
          break;
        }
      }
      this.startLoad();
      accountService.deleteGoogleAccount(this.googleAccount.id).then(value => {
        this.successmsg();
        this.googleAccount = {};
        this.getGoogleAccounts();
        this.file = null;
        this.showGoogleModal = false;

      }).catch(error => {
        this.errormsg(error.response.data.message);
      });
    },
    handleFileUpload(event) {
      this.file = event.target.files[0]
      this.googleAccount.fileName = this.file.name;
    },

    deleteGoogleAccount(){
      this.startLoad();
      accountService.deleteGoogleAccount(this.googleAccount.id).then(value => {
        this.successmsg();
        this.getGoogleAccounts();
        this.googleAccount = {};
        this.file = null;
        this.showGoogleModal = false;
      }).catch(error => {
        this.errormsg(error.response.data.message);
      });
    },
    deleteZoomAccount(){
      accountService.deleteZoomAccount(this.zoomAccount.id).then(value => {
        this.zoomAccount = {};
        this.getZoomAccounts();
        this.showZoomModal = false;

      }).catch(error => {
        this.errormsg(error.response.data.message);
      });
    },

    handleAccountEdit(item) {
      switch (this.selectedProviderType) {
        case 'ZOOM': {

          accountService.findZoomAccountById(item.id).then(resp => {
            this.zoomAccount = resp;
            this.showZoomModal = true;
          });
          break;
        }
        case 'GOOGLE': {
          accountService.findGoogleAccountById(item.id).then(resp => {
            this.googleAccount = resp;
            this.googleAccount.fileName = resp.file;
            this.showGoogleModal = true;
          });
          break;
        }
      }
      this.showModal = true;
    },
    addProviderAccount() {
      switch (this.selectedProviderType) {
        case 'ZOOM': {
          this.zoomAccount = {
            id: "",
            accountMail: "",
            applicationName: "",
            apiKey: "",
            apiSecret: ""
          };
          this.showZoomModal = true;
          break;
        }
        case 'GOOGLE': {
          this.googleAccount = {};
          this.showGoogleModal = true;
          break;
        }
      }
    },
    editProvider() {
      this.showModal = true;
    },
    hideModal(e) {
      this.submitted = false;
      this.showModal = false;
      this.showGoogleModal = false;
      this.showZoomModal = false;
    },
    errormsg(errorMessage) {
      Swal.close();
      Swal.fire({
        position: "center",
        icon: "error",
        html: errorMessage,
        title: "Error Occurred",
        showConfirmButton: false,
        timer: 1500
      });
    },
    startLoad() {
      Swal.fire({
        title: "Operation In Progress",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });
    },
    successmsg() {
      Swal.close();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Operation Successfully Completed",
        showConfirmButton: false,
        timer: 1000,
      });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    updateGoogleAccount() {
      accountService.updateGoogleAccount(this.googleAccount, this.file).then(resp => {
        this.handleGoogleSaveOrUpdateResult();
      }).catch(error => {
        this.errormsg(error.response.data.message);
      });
    },
    handleGoogleSaveOrUpdateResult() {
      this.successmsg();
      this.showGoogleModal = false;
      this.googleAccount = {};
      this.getGoogleAccounts();
    },
    saveOrUpdateGoogleAccount() {
      this.googleAccount.id && this.googleAccount.id !== '' ? this.updateGoogleAccount() : this.saveGoogleAccount();
    },
    saveGoogleAccount(e) {
      //TODO handle validations

      accountService.createGoogleAccount(this.googleAccount, this.file).then(resp => {
        this.handleGoogleSaveOrUpdateResult();
      }).catch(error => {
        this.errormsg(error.response.data.message);
      });
    },
    saveZoomAccount(e) {
      this.startLoad();
      accountService.createZoomAccount(this.zoomAccount).then(resp => {
        this.successmsg();
        this.showZoomModal = false;
        this.zoomAccount = {
          id: "",
          accountMail: "",
          applicationName: "",
          apiKey: "",
          apiSecret: ""
        };
        this.getZoomAccounts();
      }).catch(error => {
        this.errormsg(error.response.data.message);
      });
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
            <h4 class="card-title">Account Management</h4>
            <div class="row mt-4" id="datatable_wrapper">
              <div class="col-12">
                <div class="mb-3">
                  <label class="form-label">Conference Provider Type</label>
                  <select
                      @change="handleProviderSelected"
                      v-model="selectedProviderType"
                      class="form-control form-select"
                  >
                    <option
                        v-for="option in this.providers"
                        :key="option.name"
                        :value="`${option.value}`"
                    >{{ option.name }}
                    </option
                    >
                  </select>
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
                  @row-dblclicked="handleAccountEdit"
                  select-mode="single"
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
            <div class="col-sm-12 col-md-6">
              <div id="tickets-table_length" class="dataTables_length">
                <b-button variant="light" @click="addProviderAccount">Add Provider</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
        v-model="showGoogleModal"
        title="Conference Accounts"
        title-class="text-black font-18"
        header-class="py-3 px-4 border-bottom-0"
        body-class="p-4"
        hide-footer
        centered
    >
      <form autocomplete="off">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="accountMail">Account Email</label>
              <input
                  id="accountMail"
                  v-model="googleAccount.accountMail"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.provider.name.$error }"
              />
              <div
                  v-if="submitted && !$v.googleAccount.accountMail.required"
                  class="invalid-feedback"
              >
                This value is required.
              </div>
            </div>
            <div class="mb-3">
              <label for="googleapplicationName">Application Name</label>
              <input
                  id="googleapplicationName"
                  v-model="googleAccount.applicationName"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.googleAccount.applicationName.$error }"
              />
              <div
                  v-if="submitted && !$v.googleAccount.applicationName.required"
                  class="invalid-feedback"
              >
                This value is required.
              </div>
            </div>
            <div class="mb-3">
              <label>Credentials File</label>
              <input
                  @change="handleFileUpload( $event)"
                  v-text="googleAccount.fileName"
                  type="file"
                  class="form-control"
                  id="inputGroupFile03"
                  aria-describedby="inputGroupFileAddon03"
                  aria-label="Upload"
              />
            </div>
            <div class="text-end">
              <b-button variant="danger" id="req-btn-delete-event" @click="confirm">Delete</b-button>
              <b-button variant="light" @click="hideModal">Close</b-button>
              <b-button @click="saveOrUpdateGoogleAccount" variant="success" class="ms-1">Save
              </b-button>
            </div>
          </div>
        </div>
      </form>
    </b-modal>
    <b-modal
        v-model="showZoomModal"
        title="Konferans Hesapları"
        title-class="text-black font-18"
        header-class="py-3 px-4 border-bottom-0"
        body-class="p-4"
        hide-footer
        centered
    >
      <form autocomplete="off">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label>Account Mail </label>
              <input
                  v-model="zoomAccount.accountMail"
                  type="text"
                  class="form-control"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="applicationName">App Name</label>
            <input
                id="applicationName"
                v-model="zoomAccount.applicationName"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': submitted && $v.zoomAccount.applicationName.$error }"
            />
            <div
                v-if="submitted && !$v.zoomAccount.applicationName.required"
                class="invalid-feedback"
            >
              This value is required.
            </div>
          </div>
          <div class="mb-3">
            <label for="apiKey">Api Key</label>
            <input
                id="apiKey"
                v-model="zoomAccount.apiKey"
                type="text"
                class="form-control"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="apiSecret">Api Secret</label>
          <input
              id="apiSecret"
              v-model="zoomAccount.apiSecret"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.zoomAccount.apiSecret.$error }"
          />
          <div
              v-if="submitted && !$v.zoomAccount.apiSecret.required"
              class="invalid-feedback"
          >
            This value is required.
          </div>
        </div>
        <div class="text-end">
          <b-button variant="danger" id="req-btn-zoom-delete-event" @click="confirm">Remove</b-button>
          <b-button variant="light" @click="hideModal">Close</b-button>
          <b-button @click="saveZoomAccount" variant="success" class="ms-1">Save
          </b-button>
        </div>
        </div>
        </div>
      </form>
    </b-modal>
  </Layout>
</template>
