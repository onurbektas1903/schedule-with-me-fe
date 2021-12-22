<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import Multiselect from "vue-multiselect";

import {providers, conferenceTypes} from "./dataAdvancedtable";
import {providerService} from "@/helpers/fakebackend/provider.service";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import Swal from "sweetalert2";
import {accountService} from "@/helpers/fakebackend/account.service";
import {meetingProviderExceptionHandler} from "@/views/pages/tables/meetingProviderErrorHandler";
import KeycloakUserApi from "@/helpers/fakebackend/keycloak-user-api";

/**
 * Datatable component
 */
export default {
  page: {
    title: "Meeting Providers",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      file: '',
      meetingAccounts: [],
      selectedProvider: {
        id: "",
        isActive: ""
      },
      keycloakUserApi: new KeycloakUserApi(),
      groups: [],
      selectedGroup:{},
      showModal: false,
      showZoomDetailsModal: false,
      showGoogleDetailsModal: false,
      showAccountsModal: false,
      submitted: false,
      providerAccount: {
        id: "",
      },
      provider: {
        id: "",
        name: "",
        meetingProviderType: "",
        accounts: [],
        conferenceType: "",
        userRoleGroup:"",
        isActive: "",
        settings:{}
      },
      zoomSettings:{
        host_video:false,
        participant_video:false,
        join_before_host :false,
        mute_upon_entry: false,
        waiting_room: false,
        password: null
      },
      googleSettings:{
        muted:false,
        canOthersHost:false,
        guestsCanModify :false,
        guestsCanInviteOthers: true,
        password: null,
      },
      validations: {
        provider: {
          name: {required}
        },
      },
      providers: providers,
      conferenceTypes: conferenceTypes,
      providerData: [],
      title: "Meeting Providers",
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
        },
        {
          key: "isActive",
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
      return this.providerData.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.getProviders();
    this.getAllGroups();
    this.totalRows = this.items.length;
  },
  methods: {
    handleProviderTypeSelected() {
      this.meetingAccounts = [];
      switch (this.provider.meetingProviderType) {
        case 'ZOOM': {
          accountService.getZoomAccounts(this.provider.id).then(resp => {
            this.meetingAccounts = resp;
          });
          break;
        }
        case 'GOOGLE': {
          this.provider.conferenceType = 'SINGLE';
          accountService.getGoogleAccounts().then(resp => {
            this.meetingAccounts = resp ;
          });
          break;
        }
      }
    },
    getAllGroups() {
      this.keycloakUserApi.getAllRoleGroups().then(groups => {
        let groupList = [];
        console.log(groups);
        groups.forEach(group => {
          groupList.push(group.name);
          this.groups = groupList;
        });
      });
    },
    activateDeactivateProvider(isActive) {

      providerService.updateProviderActivePassiveInfo(this.selectedProvider.id, isActive).then(value => {
        this.successmsg();
        this.getProviders();
      }).catch(error => {
        this.errormsg(meetingProviderExceptionHandler(error.response.data));
      });

    },
    handleProviderSelected(item) {
      this.selectedProvider = item;
    },
    handleProviderEdit: function (item) {

      providerService.getProviderById(item.id).then(resp => {
        let account = [];
        if (resp.accounts) {
          for (const [key, value] of Object.entries(resp.accounts)) {
            account.push({id: key, accountMail: value})
          }
        }
        this.provider = resp;
        if (resp.settings && resp.settings !== null) {
          this.setAccountSettingsFromResp(resp.settings);
        }
        this.provider.accounts = account;
        this.userRoleGroup = resp.userRoleGroup
        this.showModal = true;
        this.handleProviderTypeSelected();
      })
    },

    handleAddProvider() {
      this.showModal = true;
      this.meetingAccounts = [];
      this.provider = {};
      this.provider.isActive = true;
      this.setGoogleSettingsDefault();
      this.setZoomSettingsDefault();

    },
    editProvider() {
      this.showModal = true;
      this.provider = {};
    },
    hideModal(e) {
      this.submitted = false;
      this.showModal = false;
      this.provider = {};
    },
    setZoomSettingsDefault(){
      this.zoomSettings ={
        host_video:false,
        participant_video:false,
        join_before_host :false,
        mute_upon_entry: false,
        waiting_room: false,
        password: null
      }
    },
    setGoogleSettingsDefault(){
      this.googleSettings = {
        muted:false,
        canOthersHost:false,
        guestsCanModify :false,
        guestsCanInviteOthers: true,
        password: null,
      };
    },
    openDetailsModal(e) {

      switch (this.provider.meetingProviderType) {
        case 'ZOOM': {
          this.showZoomDetailsModal = true;
          break;
        }
        case 'GOOGLE': {
          this.showGoogleDetailsModal = true;
          break;
        }
      }

    },
    hideDetailsModal(e) {
      this.showZoomDetailsModal = false;
      this.showGoogleDetailsModal = false;
    },
    createOrUpdateProvider() {
      this.startLoad();
      this.setAccountSettings();
      if(this.provider.id && this.provider.id !== ''){
        this.updateProvider(this.provider);
      }else{
        this.saveProvider(this.provider);
      }
    },
    saveProvider(){
     this.mapAccounts();
      providerService.createMeetingProvider(
          this.provider
      ).then(result => {
        this.successmsg();
        this.showModal = false;
        this.getProviders();
      }).catch(error => {
        this.errormsg(error.response.data.message);
      });
    },
    setAccountSettingsFromResp(settings){
      switch (this.provider.meetingProviderType) {
        case 'ZOOM': {
          this.zoomSettings = settings;
          break;
        }
        case 'GOOGLE': {
          this.googleSettings = settings;
        }
          break;
      }
    },
    setAccountSettings(){
      switch (this.provider.meetingProviderType) {
        case 'ZOOM': {
          this.provider.settings = this.zoomSettings;
          break;
        }
        case 'GOOGLE': {
          this.provider.settings = this.googleSettings;
        }
          break;
        }
    },
    mapAccounts(){
      const accountMap = Object.create(null);
      this.provider.accounts.forEach(account => {
        accountMap[account.id] = account.accountMail;
      });
      this.provider.accounts =accountMap;
    },
    updateProvider(){
      this.mapAccounts();
      providerService.updateProvider(this.provider.id,
          this.provider
      ).then(result => {
        this.showModal = false;
        this.successmsg();
        this.getProviders();
      }).catch(error => {
        this.errormsg(error.response.data.message);
      });
    },
    deleteProvider() {
      this.startLoad();
      providerService.deleteProvider(this.provider.id).then(value => {
        this.showModal = false;
        this.successmsg();
        this.getProviders();
      }).catch(error => {
        this.errormsg(error.response.data.message);
      });
    },
    getProviders() {
      providerService.getAll().then(value => {
        this.providerData = value;
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
        cancelButtonText: "Hayır"
      }).then((result) => {
        if (result.value) {
          this.deleteProvider();
        }
      });
    },
    successmsg() {
      Swal.close();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "İşlem başarıyla gerçekleşti",
        showConfirmButton: false,
        timer: 1000,
      });
    },
    startLoad(){
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
    errormsg(errorMessage) {
      Swal.close();
      Swal.fire({
        position: "center",
        icon: "error",
        html: errorMessage,
        title: "Hata Oluştu",
        showConfirmButton: false,
        timer: 1000,
      });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    handleSubmit(e) {
      this.submitted = true;
      this.createOrUpdateProvider();
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
            <h4 class="card-title">Konferans Sağlayıcı İşlemleri</h4>
            <div class="row mt-4" id="datatable_wrapper">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <b-button variant="light" @click="handleAddProvider">Konferans Sağlayıcı Ekle</b-button>
                </div>
                <div class="col-sm-12 col-md-6">
                  <div id="active-id" class="dataTables_length">
                    <b-button v-if="!selectedProvider.isActive" variant="light"
                              @click="activateDeactivateProvider(true)">Aktif Yap
                    </b-button>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6">
                  <div id="passive-id" class="dataTables_length">
                    <b-button v-if="selectedProvider.isActive" variant="light"
                              @click="activateDeactivateProvider(false)">Pasif Yap
                    </b-button>
                  </div>
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
                  :items="providerData"
                  :fields="fields"
                  responsive="sm"
                  :per-page="perPage"
                  :current-page="currentPage"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :filter="filter"
                  :selectable="true"
                  @row-dblclicked="handleProviderEdit"
                  @row-clicked="handleProviderSelected"
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
          </div>
        </div>
      </div>
    </div>
    <b-modal
        v-model="showZoomDetailsModal"
        title="Zoom Konferans Ayarları"
        title-class="text-gray font-18"
        header-class="py-3 px-4 border-bottom-0"
        body-class="p-4"
        hide-footer
        centered
    >
      <form  autocomplete="off">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <div class="form-check form-check-success mb-3">
                <label class="form-check-label">
                  Waiting Room
                </label>
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="zoomSettings.waiting_room"
                />

              </div>
            </div>
            <div class="mb-3">
              <div class="form-check form-check-success mb-3">
                <label class="form-check-label">
                  Host Video İle Katılsın
                </label>
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="zoomSettings.host_video"
                />

              </div>
            </div>
            <div class="mb-3">
              <div class="form-check form-check-success mb-3">
                <label class="form-check-label">
                  Katılımcı Video İle Katılsın
                </label>
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="zoomSettings.participant_video"
                />

              </div>
            </div>
            <div class="mb-3">
              <div class="form-check form-check-success mb-3">
                <label class="form-check-label">
                  Girişte ses kapalı olsun
                </label>
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="zoomSettings.mute_upon_entry"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="name">Password</label>
              <input
                  type="password"
                  class="form-control"
                  v-model ="zoomSettings.password"
              />
            </div>
          </div>
        </div>

      </form>
    </b-modal>
    <b-modal
        v-model="showGoogleDetailsModal"
        title="Google Konferans Ayarları"
        title-class="text-gray font-18"
        header-class="py-3 px-4 border-bottom-0"
        body-class="p-4"
        hide-footer
        centered
    >
      <form  autocomplete="off">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <div class="form-check form-check-success mb-3">
                <label class="form-check-label">
                  Participant Can Modify
                </label>
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="googleSettings.guestsCanModify"
                />

              </div>
            </div>
            <div class="mb-3">
              <div class="form-check form-check-success mb-3">
                <label class="form-check-label">
                  Guest Can Invite Others
                </label>
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="googleSettings.guestsCanInviteOthers"
                />

              </div>
            </div>
            <div class="mb-3">
              <div class="form-check form-check-success mb-3">
                <label class="form-check-label">
                  Can Other Hosts
                </label>
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="googleSettings.canOthersHost"
                />

              </div>
            </div>
            <div class="mb-3">
              <div class="form-check form-check-success mb-3">
                <label class="form-check-label">
                  Muted
                </label>
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="googleSettings.muted"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="name">Password</label>
              <input
                  type="password"
                  class="form-control"
                  v-model ="googleSettings.password"
              />
            </div>
          </div>
        </div>
      </form>
    </b-modal>
    <b-modal
        v-model="showModal"
        title="Add Conference Provider"
        title-class="text-gray font-18"
        header-class="py-3 px-4 border-bottom-0"
        body-class="p-4"
        hide-footer
        centered
    >
      <form @submit.prevent="handleSubmit" autocomplete="off">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <label for="name">Name</label>
              <input
                  id="name"
                  v-model="provider.name"
                  type="text"
                  class="form-control"
                  placeholder="Sağlayıcı Adı Ekle"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label class="form-label">Konferans Sağlayıcı Tipi</label>
              <select
                  @change="handleProviderTypeSelected"
                  v-model="provider.meetingProviderType"
                  class="form-control form-select"
                  name="category"
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
          <div class="col-12">
            <div class="mb-3">
              <label class="form-label">Konferans Sağlayıcı Hesap Tipi</label>
              <select
                  v-model="provider.conferenceType"
                  class="form-control form-select"
                  name="category"
                  :disabled="this.provider.meetingProviderType == 'GOOGLE'"
              >
                <option
                    v-for="option in this.conferenceTypes"
                    :key="option.name"
                    :value="`${option.value}`"
                >{{ option.name }}
                </option
                >
              </select>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="mb-3">
            <label>Hesaplar</label>
            <multiselect
                v-model="provider.accounts"
                :multiple="true"
                track-by="accountMail"
                label="accountMail"
                :options=this.meetingAccounts
                placeholder="Konferans Hesapları Ekle"
            >
            </multiselect>
          </div>
        </div>
        <div class="col-12">
          <div class="mb-3">
            <label class="form-label">Rol Grupları</label>
            <multiselect
                v-model="provider.userRoleGroup"
                :options="this.groups"
                :multiple="false"
                placeholder="Rol Grubu Ekle"
            ></multiselect>
          </div>
        </div>

        <div class="text-end">
          <b-button variant="danger" id="req-btn-delete-event" @click="confirm">Sil</b-button>
          <b-button @click="openDetailsModal" class="ms-1">Konferans Ayarları</b-button>
          <b-button type="submit" variant="success" class="ms-1">Kaydet</b-button>
        </div>
      </form>
    </b-modal>
  </Layout>
</template>
