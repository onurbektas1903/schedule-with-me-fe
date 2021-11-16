<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Form-elements component
 */
export default {
  page: {
    title: "Form Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "Form Elements",
      items: [
        {
          text: "Forms",
          href: "/",
        },
        {
          text: "Form Elements",
          active: true,
        },
      ],
      datalist: [
        "San Francisco",
        "New York",
        "Seattle",
        "Los Angeles",
        "Chicago",
      ],
    };
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Textual Inputs</h4>
            <p class="card-title-desc">
              Here are examples of <code>.form-control</code> applied to each
              textual HTML5 <code>&lt;input&gt;</code> <code>type</code>.
            </p>

            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="example-text-input" class="form-label"
                    >Text</label
                  >
                  <b-form-input
                    type="text"
                    id="example-text-input"
                    value="Artisanal kale"
                  ></b-form-input>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="example-search-input" class="form-label"
                    >Search</label
                  >
                  <b-form-input
                    type="search"
                    id="example-search-input"
                    value="How do I shoot web"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="example-email-input" class="form-label"
                    >Email</label
                  >
                  <b-form-input
                    type="email"
                    value="bootstrap@example.com"
                    placeholder="Enter Email"
                    id="example-email-input"
                  ></b-form-input>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="example-url-input" class="form-label">URL</label>
                  <b-form-input
                    type="url"
                    value="https://getbootstrap.com"
                    placeholder="Enter URL"
                    id="example-url-input"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="example-tel-input" class="form-label"
                    >Telephone</label
                  >
                  <b-form-input
                    type="tel"
                    value="1-(555)-555-5555"
                    placeholder="Enter Telephone"
                    id="example-tel-input"
                  ></b-form-input>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="example-password-input" class="form-label"
                    >Password</label
                  >
                  <b-form-input
                    type="password"
                    value="hunter2"
                    placeholder="Enter Password"
                    id="example-password-input"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="example-number-input" class="form-label"
                    >Number</label
                  >
                  <b-form-input
                    type="number"
                    value="42"
                    placeholder="Enter Number"
                    id="example-number-input"
                  ></b-form-input>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="example-datetime-local-input" class="form-label"
                    >Date and Time</label
                  >
                  <b-form-input
                    type="datetime-local"
                    value="2021-03-19T13:45:00"
                    id="example-datetime-local-input"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="example-date-input" class="form-label"
                    >Date</label
                  >
                  <b-form-input
                    type="date"
                    value="2021-03-19"
                    id="example-date-input"
                  ></b-form-input>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="example-month-input" class="form-label"
                    >Month</label
                  >
                  <b-form-input
                    type="month"
                    value="2021-03"
                    id="example-month-input"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="example-week-input" class="form-label"
                    >Week</label
                  >
                  <b-form-input
                    type="week"
                    value="2021-W33"
                    id="example-week-input"
                  ></b-form-input>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="example-time-input" class="form-label"
                    >Time</label
                  >
                  <b-form-input
                    type="time"
                    value="13:45:00"
                    id="example-time-input"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="example-color-input" class="form-label"
                    >Color</label
                  >
                  <b-form-input
                    class="form-control-color mw-100"
                    type="color"
                    value="#0576b9"
                    id="example-color-input"
                  ></b-form-input>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Select</label>
                  <select class="form-select">
                    <option>Select</option>
                    <option>Large select</option>
                    <option>Small select</option>
                  </select>
                </div>
              </div>
            </div>
            <!-- end row -->

            <div class="row">
              <div class="col-md-12">
                <label for="exampleDataList" class="form-label"
                  >Datalists</label
                >
                <b-form-input
                  list="exampleDataList"
                  placeholder="Type to search..."
                ></b-form-input>

                <datalist id="exampleDataList">
                  <option v-for="item in datalist" :key="item">{{
                    item
                  }}</option>
                </datalist>
              </div>
            </div>
            <!-- end row -->
          </div>
        </div>
        <!-- end col -->
      </div>
    </div>
    <!-- end row -->

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Horizontal Form</h4>
            <p class="card-title-desc">
              Be sure to add <code>.col-form-label</code> to your
              <code>&lt;label&gt;</code>s as well so they’re vertically centered
              with their associated form controls.
            </p>

            <b-form-group
              id="email"
              label-class="col-form-label"
              label-cols-sm="2"
              label-cols="4"
              content-cols="4"
              content-cols-sm="10"
              label="Email"
              label-for="inputEmail3"
              class="mb-3"
            >
              <b-form-input id="inputEmail3"></b-form-input>
            </b-form-group>

            <b-form-group
              id="email"
              label-class="col-form-label"
              label-cols-sm="2"
              label-cols="4"
              content-cols="4"
              content-cols-sm="10"
              label="Password"
              label-for="inputPassword3"
              class="mb-3"
            >
              <b-form-input id="inputPassword3" type="password"></b-form-input>
            </b-form-group>

            <fieldset class="row">
              <legend class="col-form-label col-sm-2 col-4 pt-0">Radios</legend>
              <div class="col-sm-10 col-8">
                <b-form-radio name="gridRadios">First radio</b-form-radio>
                <b-form-radio name="gridRadios">Second radio</b-form-radio>
                <b-form-radio name="gridRadios" disabled
                  >Third Disabled radio</b-form-radio
                >
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Input Sizing</h4>
            <p class="card-title-desc">
              Set heights using classes like <code>.form-control-lg</code> and
              <code>.form-control-sm</code>.
            </p>
            <div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="mb-3">
                    <label class="form-label">Small Input</label>
                    <b-form-input
                      id="input-small"
                      size="sm"
                      placeholder=".form-control-sm"
                    ></b-form-input>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="mb-3">
                    <label class="form-label">Default input</label>
                    <b-form-input
                      type="text"
                      placeholder="Default input"
                    ></b-form-input>
                  </div>
                </div>
              </div>
              <!-- end row -->

              <div class="row">
                <div class="col-lg-6">
                  <div class="">
                    <label class="form-label">Large Input</label>
                    <b-form-input
                      size="lg"
                      type="text"
                      placeholder=".form-control-lg"
                    ></b-form-input>
                  </div>
                </div>
              </div>
              <!-- end row -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Range Inputs</h4>
            <p class="card-title-desc">
              Create custom <code>&lt;input type="range"&gt;</code> controls
              with <code>.form-range</code>.
            </p>

            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label class="form-label fw-bold">Basic Range</label>
                  <p class="mb-4">By default, range inputs.</p>
                  <b-form-input
                    id="customRange1"
                    type="range"
                    class="form-range"
                  ></b-form-input>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label class="form-label fw-bold">Steps</label>
                  <p class="mb-4">You can specify a <code>step</code> value.</p>
                  <b-form-input
                    id="customRange2"
                    type="range"
                    class="form-range"
                    min="0"
                    max="5"
                  ></b-form-input>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <div class="">
                  <label class="form-label fw-bold">Min and max</label>
                  <p class="mb-4">
                    Range inputs have implicit values for min and max—0 and 100,
                    respectively.
                  </p>
                  <b-form-input
                    id="customRange3"
                    type="range"
                    class="form-range"
                    min="0"
                    max="10"
                  ></b-form-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->

    <div class="row">
      <div class="col-xl-6">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <h4 class="card-title">Checkboxes</h4>
              <p class="card-title-desc">
                Create Checkbox
                <code>&lt;input type="checkbox"&gt;</code> controls with
                <code>.form-check-input</code>.
              </p>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-4">
                    <h5 class="font-size-14 mb-2">Basic</h5>
                    <div class="form-check mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="formCheck1"
                      />
                      <label class="form-check-label" for="formCheck1">
                        Form Checkbox
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="formCheck2"
                        checked
                      />
                      <label class="form-check-label" for="formCheck2">
                        Form Checkbox checked
                      </label>
                    </div>
                  </div>

                  <div class="mb-4">
                    <h5 class="font-size-14 mb-2">Right Side</h5>
                    <div>
                      <div class="form-check form-check-right mb-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="formCheckRight1"
                        />
                        <label class="form-check-label" for="formCheckRight1">
                          Form Checkbox Right
                        </label>
                      </div>
                    </div>
                    <div>
                      <div class="form-check form-check-right">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="formCheckRight2"
                          checked
                        />
                        <label class="form-check-label" for="formCheckRight2">
                          Form Checkbox Right checked
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="mb-4 mb-md-0">
                    <h5 class="font-size-14 mb-2">Inline</h5>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        value="option1"
                        checked
                      />
                      <label class="form-check-label" for="inlineCheckbox1"
                        >1</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox2"
                        value="option2"
                      />
                      <label class="form-check-label" for="inlineCheckbox2"
                        >2</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox3"
                        value="option3"
                        disabled
                      />
                      <label class="form-check-label" for="inlineCheckbox3"
                        >3 (disabled)</label
                      >
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="">
                    <h5 class="font-size-14">Available Colors</h5>
                    <p class="mb-3">
                      Add class <code>.form-check-* </code> for a color
                      Checkboxes
                    </p>

                    <div class="">
                      <div class="form-check form-check-primary mb-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="formCheckcolor1"
                          checked
                        />
                        <label class="form-check-label" for="formCheckcolor1">
                          Checkbox Primary
                        </label>
                      </div>

                      <div class="form-check form-check-success mb-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="formCheckcolor2"
                          checked
                        />
                        <label class="form-check-label" for="formCheckcolor2">
                          Checkbox Success
                        </label>
                      </div>

                      <div class="form-check form-check-info mb-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="formCheckcolor3"
                          checked
                        />
                        <label class="form-check-label" for="formCheckcolor3">
                          Checkbox Info
                        </label>
                      </div>

                      <div class="form-check form-check-warning mb-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="formCheckcolor4"
                          checked
                        />
                        <label class="form-check-label" for="formCheckcolor4">
                          Checkbox Warning
                        </label>
                      </div>

                      <div class="form-check form-check-danger">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="formCheckcolor5"
                          checked
                        />
                        <label class="form-check-label" for="formCheckcolor5">
                          Checkbox Danger
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end row -->
            </div>
            <!-- end row -->
          </div>
        </div>
      </div>

      <div class="col-xl-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Radios</h4>
            <p class="card-title-desc">
              Create Radios Custom
              <code>&lt;input type="radio"&gt;</code> controls with
              <code>.form-check-input</code>.
            </p>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-4">
                  <h5 class="font-size-14 mb-2">Basic</h5>
                  <div class="form-check mb-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="formRadios"
                      id="formRadios1"
                      checked
                    />
                    <label class="form-check-label" for="formRadios1">
                      Form Radio
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="formRadios"
                      id="formRadios2"
                    />
                    <label class="form-check-label" for="formRadios2">
                      Form Radio checked
                    </label>
                  </div>
                </div>
                <div class="mb-4">
                  <h5 class="font-size-14 mb-2">Right Side</h5>
                  <div>
                    <div class="form-check form-check-right mb-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="formRadiosRight"
                        id="formRadiosRight1"
                        checked
                      />
                      <label class="form-check-label" for="formRadiosRight1">
                        Form Radio Right
                      </label>
                    </div>
                  </div>

                  <div>
                    <div class="form-check form-check-right">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="formRadiosRight"
                        id="formRadiosRight2"
                      />
                      <label class="form-check-label" for="formRadiosRight2">
                        Form Radio Right checked
                      </label>
                    </div>
                  </div>
                </div>
                <div class="mb-4 mb-md-0">
                  <h5 class="font-size-14 mb-2">Inline</h5>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                      checked
                    />
                    <label class="form-check-label" for="inlineRadio1">1</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="option2"
                    />
                    <label class="form-check-label" for="inlineRadio2">2</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      value="option3"
                      disabled
                    />
                    <label class="form-check-label" for="inlineRadio3"
                      >3 (disabled)</label
                    >
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="">
                  <h5 class="font-size-14">Available Colors</h5>
                  <p class="mb-3">
                    Add class <code>.form-radio-* </code> for a color Radios
                  </p>

                  <div>
                    <div class="form-check form-radio-primary mb-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="formRadioColor1"
                        id="formRadioColor1"
                        checked
                      />
                      <label class="form-check-label" for="formRadioColor1">
                        Radio Primary
                      </label>
                    </div>

                    <div class="form-check form-radio-success mb-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="formRadioColor2"
                        id="formRadioColor2"
                        checked
                      />
                      <label class="form-check-label" for="formRadioColor2">
                        Radio Success
                      </label>
                    </div>

                    <div class="form-check form-radio-info mb-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="formRadioColor3"
                        id="formRadioColor3"
                        checked
                      />
                      <label class="form-check-label" for="formRadioColor3">
                        Radio Info
                      </label>
                    </div>

                    <div class="form-check form-radio-warning mb-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="formRadioColor4"
                        id="formRadioColor4"
                        checked
                      />
                      <label class="form-check-label" for="formRadioColor4">
                        Radio warning
                      </label>
                    </div>

                    <div class="form-check form-radio-danger">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="formRadioColor5"
                        id="formRadioColor5"
                        checked
                      />
                      <label class="form-check-label" for="formRadioColor5">
                        Radio Danger
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Switches</h4>
            <p class="card-title-desc">
              A switch has the markup of a custom checkbox but uses the
              <code>.form-switch</code> class to render a toggle switch.
              Switches also support the <code>disabled</code> attribute.
            </p>

            <div class="row">
              <div class="col-sm-6">
                <div>
                  <h5 class="font-size-14 mb-3">Basic</h5>

                  <div class="form-check form-switch mb-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                    />
                    <label class="form-check-label" for="flexSwitchCheckDefault"
                      >Default switch checkbox input</label
                    >
                  </div>
                  <div class="form-check form-switch mb-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked
                    />
                    <label class="form-check-label" for="flexSwitchCheckChecked"
                      >Checked switch checkbox input</label
                    >
                  </div>
                  <div class="form-check form-switch mb-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDisabled"
                      disabled
                    />
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDisabled"
                      >Disabled switch checkbox input</label
                    >
                  </div>
                  <div class="form-check form-switch mb-3 mb-md-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckCheckedDisabled"
                      checked
                      disabled
                    />
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckCheckedDisabled"
                      >Disabled checked switch checkbox input</label
                    >
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="">
                  <h5 class="font-size-14 mb-3">Sizes</h5>

                  <div class="form-check form-switch mb-3" dir="ltr">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="SwitchCheckSizesm"
                      checked
                    />
                    <label class="form-check-label" for="SwitchCheckSizesm"
                      >Small Size Switch</label
                    >
                  </div>

                  <div
                    class="form-check form-switch form-switch-md mb-3"
                    dir="ltr"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="SwitchCheckSizemd"
                    />
                    <label class="form-check-label" for="SwitchCheckSizemd"
                      >Medium Size Switch</label
                    >
                  </div>

                  <div
                    class="form-check form-switch form-switch-lg mb-lg-3"
                    dir="ltr"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="SwitchCheckSizelg"
                      checked
                    />
                    <label class="form-check-label" for="SwitchCheckSizelg"
                      >Large Size Switch</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">File Browser</h4>
            <p class="card-title-desc">
              Create File Browser Custom
              <code>&lt;input type="file"&gt;</code> controls with
              <code>.form-control</code>.
            </p>

            <div class="mb-3">
              <h5 class="font-size-14 mb-2">Sizes</h5>
              <div class="row">
                <div class="col-sm-6">
                  <div class="">
                    <label for="formFileSm" class="form-label"
                      >Small file input example</label
                    >
                    <input
                      class="form-control form-control-sm"
                      id="formFileSm"
                      type="file"
                    />
                  </div>
                </div>
                <!-- end col -->

                <div class="col-sm-6">
                  <div class="">
                    <label for="formFile" class="form-label"
                      >Default file input example</label
                    >
                    <input class="form-control" type="file" id="formFile" />
                  </div>
                </div>
              </div>
              <!-- end row -->

              <div class="row">
                <div class="col-sm-6">
                  <div class="mb-0 mb-md-3">
                    <label for="formFileLg" class="form-label"
                      >Large file input example</label
                    >
                    <input
                      class="form-control form-control-lg"
                      id="formFileLg"
                      type="file"
                    />
                  </div>
                </div>
                <!-- end col -->
              </div>
              <!-- end row -->
            </div>

            <div class="">
              <h5 class="font-size-14 mb-2">Custom</h5>
              <div class="row">
                <div class="col-sm-6">
                  <div class="">
                    <div>
                      <label class="form-label">With Label</label>
                      <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupFile01"
                          >Upload</label
                        >
                        <input
                          type="file"
                          class="form-control"
                          id="inputGroupFile01"
                        />
                      </div>
                      <div class="input-group">
                        <input
                          type="file"
                          class="form-control"
                          id="inputGroupFile02"
                        />
                        <label class="input-group-text" for="inputGroupFile02"
                          >Upload</label
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6">
                  <div class="">
                    <label class="form-label">With Button</label>
                    <div class="input-group mb-3">
                      <button
                        class="btn btn-primary"
                        type="button"
                        id="inputGroupFileAddon03"
                      >
                        Button
                      </button>
                      <input
                        type="file"
                        class="form-control"
                        id="inputGroupFile03"
                        aria-describedby="inputGroupFileAddon03"
                        aria-label="Upload"
                      />
                    </div>

                    <div class="input-group">
                      <input
                        type="file"
                        class="form-control"
                        id="inputGroupFile04"
                        aria-describedby="inputGroupFileAddon04"
                        aria-label="Upload"
                      />
                      <button
                        class="btn btn-primary"
                        type="button"
                        id="inputGroupFileAddon04"
                      >
                        Button
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
