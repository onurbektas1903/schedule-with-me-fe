<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DatePicker from "vue2-datepicker";
import Switches from "vue-switches";
import Multiselect from "vue-multiselect";
import NumberInputSpinner from "vue-number-input-spinner";
import vue2Dropzone from "vue2-dropzone";
import { FormWizard, TabContent } from "vue-form-wizard";

import { required } from "vuelidate/lib/validators";

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Form-advanced component
 */
export default {
  page: {
    title: "Form Advanced",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Form Advanced",
      items: [
        {
          text: "Forms",
          href: "/",
        },
        {
          text: "Form Advanced",
          active: true,
        },
      ],
      defaultdate: "",
      autoClose: "",
      daterange: "",
      demoMonth: "",
      demoYear: "",
      time: null,
      enabled: false,
      enabled1: false,
      enabled2: false,
      enabled3: false,
      enabled4: false,
      enabled5: false,
      small: false,
      small1: false,
      small2: false,
      small3: false,
      danger: false,
      info: false,
      success: false,
      primary: false,
      secondary: false,
      customColor: false,
      customColor1: false,
      customColor2: false,
      customColor3: false,
      value: null,
      value1: null,
      options: [
        "Alaska",
        "Hawaii",
        "California",
        "Nevada",
        "Oregon",
        "Washington",
        "Arizona",
        "Colorado",
        "Idaho",
        "Montana",
        "Nebraska",
        "New Mexico",
        "North Dakota",
        "Utah",
        "Wyoming",
        "Alabama",
        "Arkansas",
        "Illinois",
        "Iowa",
      ],
      maxlen: "",
      data: "",
      option: "",
      textarea: "",
      defaultNull: null,
      defaultspinval: 1,
      form: {
        fname: "",
        lname: "",
        city: "",
        state: "",
        zipcode: "",
      },
      tooltipform: {
        fname: "",
        lname: "",
        username: "",
        city: "",
        state: "",
      },
      submitted: false,
      submitform: false,
      editor: ClassicEditor,
      editorData:
        "<h3>Hello World!</h3><h5><b>This is an simple editable area.</b></h5>",
      content: "<h1>Some initial content</h1>",
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" },
      },
    };
  },
  methods: {
    formSubmit(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
    },
    tooltipForm() {
      this.submitform = true;
      this.$v.$touch();
    },
  },
  validations: {
    form: {
      fname: { required },
      lname: { required },
      city: { required },
      state: { required },
      zipcode: { required },
    },
    tooltipform: {
      fname: { required },
      lname: { required },
      username: { required },
      city: { required },
      state: { required },
    },
  },
  components: {
    Layout,
    PageHeader,
    DatePicker,
    Switches,
    Multiselect,
    NumberInputSpinner,
    ckeditor: CKEditor.component,
    vueDropzone: vue2Dropzone,
    FormWizard,
    TabContent,
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-xl-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Date Picker</h4>
            <p class="card-title-desc">Examples of bootstrap datepicker.</p>

            <div>
              <div class="mb-3">
                <label>Default Date Picker</label>
                <br />
                <date-picker
                  v-model="defaultdate"
                  :first-day-of-week="1"
                  lang="en"
                  confirm
                ></date-picker>
              </div>

              <div class="mb-3">
                <label>Auto close</label>
                <br />
                <date-picker
                  v-model="autoClose"
                  :first-day-of-week="1"
                  lang="en"
                ></date-picker>
              </div>

              <div class="mb-3">
                <label>Date Range</label>
                <br />
                <date-picker
                  v-model="daterange"
                  range
                  append-to-body
                  lang="en"
                  confirm
                ></date-picker>
              </div>

              <div class="mb-3">
                <label>Month View</label>
                <br />
                <date-picker
                  v-model="demoMonth"
                  type="month"
                  lang="en"
                  confirm
                  placeholder="Select Month"
                ></date-picker>
              </div>

              <div class="mb-3">
                <label>Year View</label>
                <br />
                <date-picker
                  v-model="demoYear"
                  type="year"
                  lang="en"
                  confirm
                  placeholder="Select Year"
                ></date-picker>
              </div>

              <div class="mb-3">
                <label>Time View</label>
                <br />
                <date-picker
                  v-model="time"
                  format="hh:mm:ss a"
                  value-type="format"
                  type="time"
                  placeholder="hh:mm:ss a"
                ></date-picker>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Select2</h4>
            <p class="card-title-desc">
              A mobile and touch friendly input spinner component for Bootstrap
            </p>
            <div class="col-sm-8">
              <label>Single Select</label>
              <multiselect
                v-model="value"
                :options="options"
                class="helo"
              ></multiselect>

              <label class="mt-3">Multiple Select</label>
              <multiselect
                v-model="value1"
                :options="options"
                :multiple="true"
              ></multiselect>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Css Switch</h4>
            <p class="card-title-desc">Here are a few types of switches.</p>

            <switches
              v-model="enabled"
              type-bold="true"
              class="mb-0"
            ></switches>
            <switches
              v-model="enabled1"
              type-bold="false"
              color="warning"
              class="ms-1 mb-0"
            ></switches>
            <switches
              v-model="enabled2"
              type-bold="false"
              color="danger"
              class="ms-1 mb-0"
            ></switches>
            <switches
              v-model="enabled3"
              type-bold="false"
              color="primary"
              class="ms-1 mb-0"
            ></switches>
            <switches
              v-model="enabled4"
              type-bold="false"
              color="success"
              class="ms-1 mb-0"
            ></switches>
            <switches
              v-model="enabled5"
              type-bold="false"
              color="info"
              class="ms-1 mb-0"
            ></switches>
            <h5 class="mt-4 font-size-14 mb-4">Small switch</h5>

            <div>
              <switches v-model="small"></switches>
              <switches
                v-model="small1"
                color="warning"
                class="ms-1"
              ></switches>
              <switches v-model="small2" color="danger" class="ms-1"></switches>
              <switches
                v-model="small3"
                color="success"
                class="ms-1"
              ></switches>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Bootstrap MaxLength</h4>
            <p class="card-title-desc">
              Uses the HTML5 attribute "maxlength" to work.
            </p>

            <label class="mb-1 fw-medium">Default usage</label>
            <p class="text-muted font-13">
              The badge will show up by default when the remaining chars are 10
              or less:
            </p>
            <input
              v-model="maxlen"
              type="text"
              class="form-control"
              :maxlength="10"
            />
            <div v-if="maxlen" class="text-center">
              <p
                class="badge position-absolute"
                :class="{
                  'bg-success': maxlen.length !== 10,
                  'bg-danger': maxlen.length === 10,
                }"
              >
                {{ maxlen.length }} / 10
              </p>
            </div>

            <div>
              <label class="mb-1 mt-3 fw-medium">Threshold value</label>
              <p class="text-muted font-13">
                Do you want the badge to show up when there are 20 chars or
                less? Use the
                <code>threshold</code>
                option:
              </p>
              <input
                v-model="data"
                type="text"
                :maxlength="25"
                class="form-control"
              />
              <div class="text-center">
                <p
                  v-if="data"
                  class="badge position-absolute"
                  :class="{
                    'bg-success': data.length !== 25,
                    'bg-danger': data.length === 25,
                  }"
                >
                  {{ data.length }} / 25
                </p>
              </div>
            </div>

            <div>
              <label class="mb-1 mt-3 fw-medium">All the options</label>
              <p class="text-muted font-13">
                Please note: if the
                <code>alwaysShow</code> option is enabled, the
                <code>threshold</code> option is ignored.
              </p>
              <input
                v-model="option"
                type="text"
                class="form-control"
                :maxlength="25"
              />
              <div class="text-center">
                <p
                  v-if="option"
                  class="badge position-absolute"
                  :class="{
                    'bg-success': option.length !== 25,
                    'bg-danger': option.length === 25,
                  }"
                >
                  You typed
                  {{ option.length }} out of 25 chars available.
                </p>
              </div>
            </div>

            <div>
              <label class="mb-1 mt-3 fw-medium">Textarea</label>
              <p class="text-muted font-13">
                Bootstrap maxlength supports textarea as well as inputs. Even on
                old IE.
              </p>
              <textarea
                v-model="textarea"
                class="form-control"
                :maxlength="225"
                rows="3"
                placeholder="This textarea has a limit of 225 chars."
              ></textarea>
              <div class="text-center">
                <p
                  v-if="textarea"
                  class="badge position-absolute"
                  :class="{
                    'bg-success': textarea.length !== 225,
                    'bg-danger': textarea.length === 225,
                  }"
                >
                  {{ textarea.length }} / 225
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Bootstrap TouchSpin</h4>
            <p class="card-title-desc">
              A mobile and touch friendly input spinner component for Bootstrap
            </p>
            <div class="mt-3">
              <label class="form-label">Using data attributes</label>
              <NumberInputSpinner
                :min="0"
                :max="10"
                :integerOnly="true"
                v-model="defaultspinval"
              />
            </div>
            <div>
              <label class="mt-3 form-label">Example with postfix</label>
              <NumberInputSpinner
                :min="0.5"
                :max="100.5"
                :step="0.5"
                :value="2.5"
                :integerOnly="false"
              />
            </div>
            <div>
              <label class="mt-3 form-label">Init with empty value</label>
              <NumberInputSpinner
                :min="1"
                :max="100"
                :step="1"
                :integerOnly="false"
                v-model="defaultNull"
              />
            </div>
            <div>
              <label class="mt-3 form-label">Custom step</label>
              <NumberInputSpinner
                :min="1"
                :max="100"
                :step="2"
                :integerOnly="true"
                :value="4"
              />
            </div>
            <div>
              <label class="mt-3 form-label">Custom Value</label>
              <NumberInputSpinner
                :min="-90"
                :max="90"
                :step="1"
                :integerOnly="false"
                :value="-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Bootstrap Validation - Normal</h4>
            <p class="card-title-desc">
              Provide valuable, actionable feedback to your users with HTML5
              form validation–available in all our supported browsers.
            </p>
            <form class="needs-validation" @submit.prevent="formSubmit">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="validationCustom01">First name</label>
                    <input
                      id="validationCustom01"
                      v-model="form.fname"
                      type="text"
                      class="form-control"
                      placeholder="First name"
                      value="Mark"
                      :class="{
                        'is-invalid': submitted && $v.form.fname.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.form.fname.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.fname.required"
                        >This value is required.</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="validationCustom02">Last name</label>
                    <input
                      id="validationCustom02"
                      v-model="form.lname"
                      type="text"
                      class="form-control"
                      placeholder="Last name"
                      value="Otto"
                      :class="{
                        'is-invalid': submitted && $v.form.lname.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.form.lname.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.lname.required"
                        >This value is required.</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="validationCustom03">City</label>
                    <input
                      id="validationCustom03"
                      v-model="form.city"
                      type="text"
                      class="form-control"
                      placeholder="City"
                      :class="{
                        'is-invalid': submitted && $v.form.city.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.form.city.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.city.required"
                        >This value is required.</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="validationCustom04">State</label>
                    <input
                      id="validationCustom04"
                      v-model="form.state"
                      type="text"
                      class="form-control"
                      placeholder="State"
                      :class="{
                        'is-invalid': submitted && $v.form.state.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.form.state.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.state.required"
                        >This value is required.</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <label for="validationCustom05">Zip</label>
                    <input
                      id="validationCustom05"
                      v-model="form.zipcode"
                      type="text"
                      class="form-control"
                      placeholder="Zip"
                      :class="{
                        'is-invalid': submitted && $v.form.zipcode.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.form.zipcode.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.zipcode.required"
                        >This value is required.</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="invalidCheck"
                  required=""
                />
                <label class="form-check-label" for="invalidCheck">
                  Agree to terms and conditions
                </label>
                <div class="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
              <button class="btn btn-primary" type="submit">Submit form</button>
            </form>
          </div>
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Bootstrap Validation (Tooltips)</h4>
            <p class="card-title-desc">
              If your form layout allows it, you can swap the
              <code>.{valid|invalid}-feedback</code> classes for
              <code>.{valid|invalid}-tooltip</code> classes to display
              validation feedback in a styled tooltip.
            </p>
            <form class="needs-validation" @submit.prevent="tooltipForm">
              <div class="row">
                <div class="col-md-4">
                  <div class="mb-3 position-relative">
                    <label for="validationTooltip01">First name</label>
                    <input
                      id="validationTooltip01"
                      v-model="tooltipform.fname"
                      type="text"
                      class="form-control"
                      placeholder="First name"
                      value="Mark"
                      :class="{
                        'is-invalid': submitform && $v.tooltipform.fname.$error,
                      }"
                    />
                    <div
                      v-if="submitform && $v.tooltipform.fname.$error"
                      class="invalid-tooltip"
                    >
                      <span v-if="!$v.tooltipform.fname.required"
                        >Please provide valid First name.</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3 position-relative">
                    <label for="validationTooltip02">Last name</label>
                    <input
                      id="validationTooltip02"
                      v-model="tooltipform.lname"
                      type="text"
                      class="form-control"
                      placeholder="Last name"
                      value="Otto"
                      :class="{
                        'is-invalid': submitform && $v.tooltipform.lname.$error,
                      }"
                    />
                    <div
                      v-if="submitform && $v.tooltipform.lname.$error"
                      class="invalid-tooltip"
                    >
                      <span v-if="!$v.tooltipform.lname.required"
                        >Please provide valid Last name.</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3 position-relative">
                    <label for="validationTooltipUsername">Username</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span
                          id="validationTooltipUsernamePrepend"
                          class="input-group-text"
                          >@</span
                        >
                      </div>
                      <input
                        id="validationTooltipUsername"
                        v-model="tooltipform.username"
                        type="text"
                        class="form-control"
                        placeholder="Username"
                        aria-describedby="validationTooltipUsernamePrepend"
                        :class="{
                          'is-invalid':
                            submitform && $v.tooltipform.username.$error,
                        }"
                      />
                      <div
                        v-if="submitform && $v.tooltipform.username.$error"
                        class="invalid-tooltip"
                      >
                        <span v-if="!$v.tooltipform.username.required"
                          >Please choose a unique and valid username.</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3 position-relative">
                    <label for="validationTooltip03">City</label>
                    <input
                      id="validationTooltip03"
                      v-model="tooltipform.city"
                      type="text"
                      class="form-control"
                      placeholder="City"
                      :class="{
                        'is-invalid': submitform && $v.tooltipform.city.$error,
                      }"
                    />
                    <div
                      v-if="submitform && $v.tooltipform.city.$error"
                      class="invalid-tooltip"
                    >
                      <span v-if="!$v.tooltipform.city.required"
                        >Please provide a valid city.</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3 position-relative">
                    <label for="validationTooltip04">State</label>
                    <input
                      id="validationTooltip04"
                      v-model="tooltipform.state"
                      type="text"
                      class="form-control"
                      placeholder="State"
                      :class="{
                        'is-invalid': submitform && $v.tooltipform.state.$error,
                      }"
                    />
                    <div
                      v-if="submitform && $v.tooltipform.state.$error"
                      class="invalid-tooltip"
                    >
                      <span v-if="!$v.tooltipform.state.required"
                        >Please provide a valid state.</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn btn-primary" type="submit">Submit form</button>
            </form>
          </div>
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">CK Editor</h4>
            <p class="card-title-desc">
              Super simple wysiwyg editor on Bootstrap
            </p>
            <!-- Editor -->
            <ckeditor v-model="editorData" :editor="editor"></ckeditor>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Dropzone</h4>
            <p class="card-title-desc">
              DropzoneJS is an open source library that provides drag’n’drop
              file uploads with image previews.
            </p>
            <!-- file upload -->
            <vue-dropzone
              id="dropzone"
              ref="myVueDropzone"
              :use-custom-slot="true"
              :options="dropzoneOptions"
            >
              <div class="dropzone-custom-content">
                <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                <h4>Drop files here or click to upload.</h4>
              </div>
            </vue-dropzone>
            <div class="text-center mt-4">
              <button type="button" class="btn btn-primary">Send Files</button>
            </div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row">
      <div class="col-xl-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Basic Wizard</h4>
            <form-wizard color="#0576b9">
              <tab-content icon="mdi mdi-account-circle">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="userName"
                        >User name</label
                      >
                      <div class="col-md-9">
                        <input
                          id="userName"
                          type="text"
                          class="form-control"
                          name="userName"
                          value="Themesbrand"
                        />
                      </div>
                    </div>
                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="password"
                        >Password</label
                      >
                      <div class="col-md-9">
                        <input
                          id="password"
                          type="password"
                          name="password"
                          class="form-control"
                          value="123456789"
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="confirmpass"
                        >Re Password</label
                      >
                      <div class="col-md-9">
                        <input
                          id="confirmpass"
                          type="password"
                          name="confirmpass"
                          class="form-control"
                          value="123456789"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </tab-content>
              <tab-content icon="mdi mdi-face-profile">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="name"
                        >First name</label
                      >
                      <div class="col-md-9">
                        <input
                          type="text"
                          name="name"
                          class="form-control"
                          value="Francis"
                        />
                      </div>
                    </div>
                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="surname"
                        >Last name</label
                      >
                      <div class="col-md-9">
                        <input
                          type="text"
                          name="surname"
                          class="form-control"
                          value="Brinkman"
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="email"
                        >Email</label
                      >
                      <div class="col-md-9">
                        <input
                          type="email"
                          name="email"
                          class="form-control"
                          value="cory1979@hotmail.com"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </tab-content>
              <tab-content icon="mdi mdi-checkbox-marked-circle-outline">
                <div class="row">
                  <div class="col-12">
                    <div class="text-center">
                      <h2 class="mt-0">
                        <i class="mdi mdi-check-all"></i>
                      </h2>
                      <h3 class="mt-0">Thank you !</h3>

                      <p class="w-75 mb-2 mx-auto">
                        Quisque nec turpis at urna dictum luctus. Suspendisse
                        convallis dignissim eros at volutpat. In egestas mattis
                        dui. Aliquam mattis dictum aliquet.
                      </p>

                      <div class="mb-3">
                        <b-form-checkbox
                          class="form-check"
                          id="customControlInline"
                          name="checkbox-1"
                          value="accepted"
                          unchecked-value="not_accepted"
                        >
                          Remember me
                        </b-form-checkbox>
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </tab-content>
            </form-wizard>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
      <div class="col-xl-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Tab Wizard</h4>
            <form-wizard shape="tab" color="#0576b9">
              <tab-content icon="mdi mdi-account-circle">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="name"
                        >User name</label
                      >
                      <div class="col-md-9">
                        <input
                          id="name"
                          type="text"
                          class="form-control"
                          value="Themesbrand"
                        />
                      </div>
                    </div>
                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="pwd"
                        >Password</label
                      >
                      <div class="col-md-9">
                        <input
                          id="pwd"
                          type="password"
                          name="pwd"
                          class="form-control"
                          value="123456789"
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="confirmpwd"
                        >Re Password</label
                      >
                      <div class="col-md-9">
                        <input
                          id="confirmpwd"
                          type="password"
                          class="form-control"
                          value="123456789"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </tab-content>
              <tab-content icon="mdi mdi-face-profile">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="name"
                        >First name</label
                      >
                      <div class="col-md-9">
                        <input
                          type="text"
                          name="name"
                          class="form-control"
                          value="Francis"
                        />
                      </div>
                    </div>
                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="surname"
                        >Last name</label
                      >
                      <div class="col-md-9">
                        <input
                          type="text"
                          name="surname"
                          class="form-control"
                          value="Brinkman"
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label class="col-md-3 col-form-label" for="email"
                        >Email</label
                      >
                      <div class="col-md-9">
                        <input
                          type="email"
                          name="email"
                          class="form-control"
                          value="cory1979@hotmail.com"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </tab-content>
              <tab-content icon="mdi mdi-checkbox-marked-circle-outline">
                <div class="row">
                  <div class="col-12">
                    <div class="text-center">
                      <h2 class="mt-0">
                        <i class="mdi mdi-check-all"></i>
                      </h2>
                      <h3 class="mt-0">Thank you !</h3>

                      <p class="w-75 mb-2 mx-auto">
                        Quisque nec turpis at urna dictum luctus. Suspendisse
                        convallis dignissim eros at volutpat. In egestas mattis
                        dui. Aliquam mattis dictum aliquet.
                      </p>

                      <div class="mb-3">
                        <b-form-checkbox
                          class="form-check"
                          id="customCheck1"
                          name="checkbox-1"
                          value="accepted"
                          unchecked-value="not_accepted"
                        >
                          I agree with the Terms and Conditions
                        </b-form-checkbox>
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </tab-content>
            </form-wizard>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>
