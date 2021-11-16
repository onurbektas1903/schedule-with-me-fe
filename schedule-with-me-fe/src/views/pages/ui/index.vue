<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * UI-elements component
 */
export default {
  page: {
    title: "UI Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "UI Elements",
      items: [
        {
          text: "UI Elements",
        },
        {
          text: "UI Elements",
          active: true,
        },
      ],
      defaultvalue: 3,
      custompagination: 2,
      currentpage: 3,
      text: `
         Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh iphone. Seitan aliquip butcher voluptate nisi qui.
        `,
      value: "show",
    };
  },
  components: {
    Layout,
    PageHeader,
  },
  mounted() {
    let isContent = document.getElementById("mainContent");
    if (isContent !== null) isContent.classList.add("overflow-visible");
  },
};
</script>

<template>
  <Layout>
    <PageHeader :items="items" :title="title" />
    <div class="row">
      <div class="col-lg-12">
        <div class="d-xl-flex">
          <div class="w-100">
            <div>
              <!-- Start Buttons -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="card" id="buttons">
                    <div class="card-body">
                      <h4 class="card-title mb-4">Buttons</h4>

                      <div>
                        <h5 class="font-size-14">Basic</h5>
                        <p class="card-title-desc">
                          Bootstrap includes six predefined button styles, each
                          serving its own semantic purpose..
                        </p>

                        <div class="button-items">
                          <b-button variant="primary">Primary</b-button>
                          <b-button variant="light">Light</b-button>
                          <b-button variant="success">Success</b-button>
                          <b-button variant="info">Info</b-button>
                          <b-button variant="warning">Warning</b-button>
                          <b-button variant="danger">Danger</b-button>
                          <b-button variant="dark">Dark</b-button>
                          <b-button variant="link">Link</b-button>
                          <b-button variant="secondary">Secondary</b-button>
                        </div>
                      </div>

                      <div class="row mt-3">
                        <div class="col-lg-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">Outline</h5>
                            <p class="card-title-desc">
                              Replace the default modifier classes with the
                              <code class="highlighter-rouge">outline-*</code>
                              ones to remove all background images and colors on
                              any button.
                            </p>

                            <div class="button-items">
                              <b-button variant="outline-primary"
                                >Primary</b-button
                              >
                              <b-button variant="outline-secondary"
                                >Secondary</b-button
                              >
                              <b-button variant="outline-success"
                                >Success</b-button
                              >
                              <b-button variant="outline-info">Info</b-button>
                              <b-button variant="outline-warning"
                                >Warning</b-button
                              >
                              <b-button variant="outline-danger"
                                >Danger</b-button
                              >
                              <b-button variant="outline-dark">Dark</b-button>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">Rounded</h5>
                            <p class="card-title-desc">
                              Use <code>pill</code> for button round.
                            </p>

                            <div class="button-items">
                              <b-button pill variant="primary"
                                >Primary</b-button
                              >
                              <b-button pill variant="secondary"
                                >Secondary</b-button
                              >
                              <b-button pill variant="success"
                                >Success</b-button
                              >
                              <b-button pill variant="info">Info</b-button>
                              <b-button pill variant="warning"
                                >Warning</b-button
                              >
                              <b-button pill variant="danger">Danger</b-button>
                              <b-button pill variant="dark">Dark</b-button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row mt-3">
                        <div class="col-lg-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">Sizes</h5>
                            <p class="card-title-desc">
                              Add <code>size="lg"</code> or
                              <code>size="sm"</code> for additional sizes.
                            </p>

                            <div class="button-items">
                              <b-button variant="primary" size="lg"
                                >Large button</b-button
                              >
                              <b-button variant="warning" size="sm"
                                >Small button</b-button
                              >
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">Width</h5>
                            <p class="card-title-desc">
                              Add <code>.w-xs</code>, <code>.w-sm</code>,
                              <code>.w-md</code> and <code> .w-lg</code> class
                              for additional buttons width.
                            </p>

                            <div class="button-items">
                              <b-button variant="primary" class="w-xs"
                                >Xs</b-button
                              >
                              <b-button variant="danger" class="w-sm"
                                >Small</b-button
                              >
                              <b-button variant="warning" class="w-md"
                                >Medium</b-button
                              >
                              <b-button variant="success" class="w-lg"
                                >Large</b-button
                              >
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row mt-3">
                        <div class="col-lg-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">Tags</h5>
                            <p class="card-title-desc">
                              The <code>.btn</code> classes are designed to be
                              used with the <code>&lt;button&gt;</code> element.
                              However, you can also use these classes on
                              <code>&lt;a&gt;</code> or
                              <code>&lt;input&gt;</code> elements (though some
                              browsers may apply a slightly different
                              rendering).
                            </p>

                            <div class="button-items">
                              <b-button variant="primary" tag="a"
                                >Link</b-button
                              >
                              <button class="btn btn-success" type="submit">
                                Button
                              </button>

                              <input
                                class="btn btn-info"
                                type="button"
                                value="Input"
                              />
                              <input
                                class="btn btn-danger"
                                type="submit"
                                value="Submit"
                              />
                              <input
                                class="btn btn-warning"
                                type="reset"
                                value="Reset"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end Buttons -->

              <!-- Start Badges -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="card" id="badges">
                    <div class="card-body">
                      <h4 class="card-title mb-4">Badges</h4>

                      <div class="row">
                        <div class="col-lg-6">
                          <div>
                            <h5 class="font-size-14">Basic</h5>
                            <p class="card-title-desc">
                              Add any of the below mentioned modifier classes to
                              change the appearance of a badge.
                            </p>

                            <div>
                              <b-badge variant="primary" class="bg-primary"
                                >Primary</b-badge
                              >
                              <b-badge variant="success" class="bg-success ms-1"
                                >Success</b-badge
                              >
                              <b-badge variant="info" class="bg-info ms-1"
                                >Info</b-badge
                              >
                              <b-badge variant="warning" class="bg-warning ms-1"
                                >Warning</b-badge
                              >
                              <b-badge variant="danger" class="bg-danger ms-1"
                                >Danger</b-badge
                              >
                              <b-badge variant="dark" class="bg-dark ms-1"
                                >Dark</b-badge
                              >
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="mt-5 mt-lg-0">
                            <h5 class="font-size-14">Pill</h5>
                            <p class="card-title-desc">
                              Use the <code>pill</code> modifier class to make
                              badges more rounded.
                            </p>

                            <div>
                              <b-badge
                                pill
                                variant="primary"
                                class="rouded-pill bg-primary"
                                >Primary</b-badge
                              >
                              <b-badge
                                pill
                                variant="success"
                                class="rouded-pill bg-success ms-1"
                                >Success</b-badge
                              >
                              <b-badge
                                pill
                                variant="info"
                                class="rouded-pill bg-info ms-1"
                                >Info</b-badge
                              >
                              <b-badge
                                pill
                                variant="warning"
                                class="rouded-pill bg-warning ms-1"
                                >Warning</b-badge
                              >
                              <b-badge
                                pill
                                variant="danger"
                                class="rouded-pill bg-danger ms-1"
                                >Danger</b-badge
                              >
                              <b-badge
                                pill
                                variant="dark"
                                class="rouded-pill bg-dark ms-1"
                                >Dark</b-badge
                              >
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-6">
                          <div class="mt-5">
                            <h5 class="font-size-14">Lighten</h5>
                            <p class="card-title-desc">
                              Use <code>.bg-soft-*</code> class for a badge
                              lighten.
                            </p>

                            <div>
                              <span class="badge badge-soft-primary"
                                >Primary</span
                              >
                              <span class="badge badge-soft-success ms-1"
                                >Success</span
                              >
                              <span class="badge badge-soft-info ms-1"
                                >Info</span
                              >
                              <span class="badge badge-soft-warning ms-1"
                                >Warning</span
                              >
                              <span class="badge badge-soft-danger ms-1"
                                >Danger</span
                              >
                              <span class="badge badge-soft-dark ms-1"
                                >Dark</span
                              >
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="mt-5">
                            <h5 class="font-size-14">Soft Pill</h5>
                            <p class="card-title-desc">
                              Use <code>.bg-soft-*</code> class for a pill
                              badge.
                            </p>

                            <div>
                              <span
                                class="badge rounded-pill badge-soft-primary"
                                >Primary</span
                              >
                              <span
                                class="badge rounded-pill badge-soft-success ms-1"
                                >Success</span
                              >
                              <span
                                class="badge rounded-pill badge-soft-info ms-1"
                                >Info</span
                              >
                              <span
                                class="badge rounded-pill badge-soft-warning ms-1"
                                >Warning</span
                              >
                              <span
                                class="badge rounded-pill badge-soft-danger ms-1"
                                >Danger</span
                              >
                              <span
                                class="badge rounded-pill badge-soft-dark ms-1"
                                >Dark</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-6">
                          <div class="mt-5">
                            <h5 class="font-size-14">Badges in Buttons</h5>
                            <p class="card-title-desc">
                              Badges can be used as part of links or buttons to
                              provide a counter.
                            </p>

                            <div class="button-items">
                              <button type="button" class="btn btn-primary">
                                Notifications
                                <span class="badge bg-success ms-1">4</span>
                              </button>
                              <button type="button" class="btn btn-success">
                                Messages
                                <span class="badge bg-danger ms-1">2</span>
                              </button>
                              <button
                                type="button"
                                class="btn btn-outline-secondary"
                              >
                                Draft
                                <span class="badge bg-success ms-1">2</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="mt-5">
                            <h5 class="font-size-14">
                              Badges Position Examples
                            </h5>
                            <p class="card-title-desc">
                              Example of Badges Position
                            </p>

                            <div class="d-flex flex-wrap gap-3">
                              <button
                                type="button"
                                class="btn btn-primary position-relative"
                              >
                                Mails
                                <span
                                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                                  >+99
                                  <span class="visually-hidden"
                                    >unread messages</span
                                  ></span
                                >
                              </button>

                              <button
                                type="button"
                                class="btn btn-light position-relative"
                              >
                                Alerts
                                <span
                                  class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-1"
                                  ><span class="visually-hidden"
                                    >unread messages</span
                                  ></span
                                >
                              </button>

                              <button
                                type="button"
                                class="btn btn-primary position-relative p-0 avatar-xs rounded"
                              >
                                <span class="avatar-title bg-transparent">
                                  <i class="bx bxs-envelope"></i>
                                </span>
                                <span
                                  class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-1"
                                  ><span class="visually-hidden"
                                    >unread messages</span
                                  ></span
                                >
                              </button>

                              <button
                                type="button"
                                class="btn btn-light position-relative p-0 avatar-xs rounded-circle"
                              >
                                <span
                                  class="avatar-title bg-transparent text-reset"
                                >
                                  <i class="bx bxs-bell"></i>
                                </span>
                              </button>

                              <button
                                type="button"
                                class="btn btn-light position-relative p-0 avatar-xs rounded-circle"
                              >
                                <span
                                  class="avatar-title bg-transparent text-reset"
                                >
                                  <i class="bx bx-menu"></i>
                                </span>
                                <span
                                  class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-success p-1"
                                  ><span class="visually-hidden"
                                    >unread messages</span
                                  ></span
                                >
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- End Badges -->

              <!-- Start Dropdown -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="card" id="dropdowns">
                    <div class="card-body">
                      <h4 class="card-title mb-4">Dropdowns</h4>

                      <div class="row">
                        <div class="col-lg-6">
                          <div class="">
                            <h5 class="font-size-14">Basic</h5>
                            <p class="card-title-desc">
                              Any single
                              <code class="highlighter-rouge">.btn</code> can be
                              turned into a dropdown toggle with some markup
                              changes. Here’s how you can put them to work with
                              either
                              <code class="highlighter-rouge"
                                >&lt;button&gt;</code
                              >
                              elements:
                            </p>

                            <div class="row">
                              <div class="col-sm-6">
                                <b-dropdown>
                                  <template v-slot:button-content>
                                    Dropdown button
                                    <i class="mdi mdi-chevron-down"></i>
                                  </template>
                                  <b-dropdown-item>Action</b-dropdown-item>
                                  <b-dropdown-item
                                    >Another Action</b-dropdown-item
                                  >
                                  <b-dropdown-item
                                    >Something else here</b-dropdown-item
                                  >
                                </b-dropdown>
                              </div>

                              <div class="col-sm-6">
                                <div class="dropdown mt-4 mt-sm-0">
                                  <b-dropdown href="#">
                                    <template #button-content>
                                      Dropdown link
                                      <i class="mdi mdi-chevron-down"></i>
                                    </template>
                                    <b-dropdown-item>Action</b-dropdown-item>
                                    <b-dropdown-item
                                      >Another action</b-dropdown-item
                                    >
                                    <b-dropdown-item
                                      >Something else here</b-dropdown-item
                                    >
                                  </b-dropdown>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="mt-4 mt-lg-0">
                            <h5 class="font-size-14">Variant</h5>
                            <p class="card-title-desc">
                              The best part is you can do this with any button
                              variant, too:
                            </p>

                            <div class="d-flex gap-2 flex-wrap">
                              <div class="btn-group">
                                <b-dropdown variant="primary">
                                  <template v-slot:button-content>
                                    Primary
                                    <i class="mdi mdi-chevron-down"></i>
                                  </template>
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Action</b-dropdown-item
                                  >
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Another action</b-dropdown-item
                                  >
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Something else here</b-dropdown-item
                                  >
                                  <b-dropdown-divider></b-dropdown-divider>
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Separated link</b-dropdown-item
                                  >
                                </b-dropdown>
                              </div>
                              <!-- /btn-group -->
                              <div class="btn-group">
                                <b-dropdown variant="secondary">
                                  <template v-slot:button-content>
                                    Secondary
                                    <i class="mdi mdi-chevron-down"></i>
                                  </template>
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Action</b-dropdown-item
                                  >
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Another action</b-dropdown-item
                                  >
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Something else here</b-dropdown-item
                                  >
                                  <b-dropdown-divider></b-dropdown-divider>
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Separated link</b-dropdown-item
                                  >
                                </b-dropdown>
                              </div>
                              <!-- /btn-group -->
                              <div class="btn-group">
                                <b-dropdown variant="success">
                                  <template v-slot:button-content>
                                    Success
                                    <i class="mdi mdi-chevron-down"></i>
                                  </template>
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Action</b-dropdown-item
                                  >
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Another action</b-dropdown-item
                                  >
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Something else here</b-dropdown-item
                                  >
                                  <b-dropdown-divider></b-dropdown-divider>
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Separated link</b-dropdown-item
                                  >
                                </b-dropdown>
                              </div>
                              <!-- /btn-group -->
                              <div class="btn-group">
                                <b-dropdown variant="info">
                                  <template v-slot:button-content>
                                    Info
                                    <i class="mdi mdi-chevron-down"></i>
                                  </template>
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Action</b-dropdown-item
                                  >
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Another action</b-dropdown-item
                                  >
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Something else here</b-dropdown-item
                                  >
                                  <b-dropdown-divider></b-dropdown-divider>
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Separated link</b-dropdown-item
                                  >
                                </b-dropdown>
                              </div>
                              <!-- /btn-group -->
                              <div class="btn-group">
                                <b-dropdown variant="warning">
                                  <template v-slot:button-content>
                                    Warning
                                    <i class="mdi mdi-chevron-down"></i>
                                  </template>
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Action</b-dropdown-item
                                  >
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Another action</b-dropdown-item
                                  >
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Something else here</b-dropdown-item
                                  >
                                  <b-dropdown-divider></b-dropdown-divider>
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Separated link</b-dropdown-item
                                  >
                                </b-dropdown>
                              </div>
                              <!-- /btn-group -->
                              <div class="btn-group">
                                <b-dropdown variant="danger">
                                  <template v-slot:button-content>
                                    Danger
                                    <i class="mdi mdi-chevron-down"></i>
                                  </template>
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Action</b-dropdown-item
                                  >
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Another action</b-dropdown-item
                                  >
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Something else here</b-dropdown-item
                                  >
                                  <b-dropdown-divider></b-dropdown-divider>
                                  <b-dropdown-item href="javascript: void(0);"
                                    >Separated link</b-dropdown-item
                                  >
                                </b-dropdown>
                              </div>
                              <!-- /btn-group -->
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row mt-3">
                        <div class="col-lg-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">Split Button</h5>
                            <p class="card-title-desc">
                              The best part is you can do this with any button
                              variant, too:
                            </p>

                            <div class="d-flex gap-2 flex-wrap">
                              <div class="btn-group">
                                <b-dropdown
                                  split
                                  text="Primary"
                                  variant="primary"
                                >
                                  <b-dropdown-item>Action</b-dropdown-item>
                                  <b-dropdown-item
                                    >Another action</b-dropdown-item
                                  >
                                  <b-dropdown-item
                                    >Something else here...</b-dropdown-item
                                  >
                                </b-dropdown>
                              </div>
                              <div class="btn-group">
                                <b-dropdown
                                  split
                                  text="Secondary"
                                  variant="secondary"
                                >
                                  <b-dropdown-item>Action</b-dropdown-item>
                                  <b-dropdown-item
                                    >Another action</b-dropdown-item
                                  >
                                  <b-dropdown-item
                                    >Something else here...</b-dropdown-item
                                  >
                                </b-dropdown>
                              </div>
                              <div class="btn-group">
                                <b-dropdown
                                  split
                                  text="Success"
                                  variant="success"
                                >
                                  <b-dropdown-item>Action</b-dropdown-item>
                                  <b-dropdown-item
                                    >Another action</b-dropdown-item
                                  >
                                  <b-dropdown-item
                                    >Something else here...</b-dropdown-item
                                  >
                                </b-dropdown>
                              </div>
                              <div class="btn-group">
                                <b-dropdown split text="Info" variant="info">
                                  <b-dropdown-item>Action</b-dropdown-item>
                                  <b-dropdown-item
                                    >Another action</b-dropdown-item
                                  >
                                  <b-dropdown-item
                                    >Something else here...</b-dropdown-item
                                  >
                                </b-dropdown>
                              </div>
                              <div class="btn-group">
                                <b-dropdown
                                  split
                                  text="Warning"
                                  variant="warning"
                                >
                                  <b-dropdown-item>Action</b-dropdown-item>
                                  <b-dropdown-item
                                    >Another action</b-dropdown-item
                                  >
                                  <b-dropdown-item
                                    >Something else here...</b-dropdown-item
                                  >
                                </b-dropdown>
                              </div>
                              <div class="btn-group">
                                <b-dropdown
                                  split
                                  text="Danger"
                                  variant="danger"
                                >
                                  <b-dropdown-item>Action</b-dropdown-item>
                                  <b-dropdown-item
                                    >Another action</b-dropdown-item
                                  >
                                  <b-dropdown-item
                                    >Something else here...</b-dropdown-item
                                  >
                                </b-dropdown>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">Sizing</h5>
                            <p class="card-title-desc">
                              Button dropdowns work with buttons of all sizes,
                              including default and split dropdown buttons.
                            </p>

                            <div class="">
                              <!-- Large button groups (default and split) -->
                              <div class="btn-group me-1 mt-2">
                                <b-dropdown size="lg" variant="primary">
                                  <template v-slot:button-content>
                                    Large button
                                    <i class="mdi mdi-chevron-down"></i>
                                  </template>
                                  <b-dropdown-item-button
                                    >Action</b-dropdown-item-button
                                  >
                                  <b-dropdown-item-button
                                    >Another action</b-dropdown-item-button
                                  >
                                  <b-dropdown-item-button
                                    >Something else here</b-dropdown-item-button
                                  >
                                </b-dropdown>
                              </div>
                              <div class="btn-group me-1 mt-2">
                                <b-dropdown size="lg" split text="Large button">
                                  <b-dropdown-item-button
                                    >Action</b-dropdown-item-button
                                  >
                                  <b-dropdown-item-button
                                    >Another action</b-dropdown-item-button
                                  >
                                  <b-dropdown-item-button
                                    >Something else here</b-dropdown-item-button
                                  >
                                </b-dropdown>
                              </div>

                              <!-- Small button groups (default and split) -->
                              <div class="btn-group me-1 mt-2">
                                <b-dropdown size="sm" variant="info">
                                  <template v-slot:button-content>
                                    Small button
                                    <i class="mdi mdi-chevron-down"></i>
                                  </template>
                                  <b-dropdown-item-button
                                    >Action</b-dropdown-item-button
                                  >
                                  <b-dropdown-item-button
                                    >Another action</b-dropdown-item-button
                                  >
                                  <b-dropdown-item-button
                                    >Something else here</b-dropdown-item-button
                                  >
                                </b-dropdown>
                              </div>
                              <div class="btn-group me-1 mt-2">
                                <b-dropdown split text="Small button" size="sm">
                                  <b-dropdown-item-button
                                    >Action</b-dropdown-item-button
                                  >
                                  <b-dropdown-item-button
                                    >Another action</b-dropdown-item-button
                                  >
                                  <b-dropdown-item-button
                                    >Something else here</b-dropdown-item-button
                                  >
                                </b-dropdown>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Start Images -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="card" id="images">
                    <div class="card-body">
                      <h4 class="card-title mb-4">Images</h4>

                      <div class="row">
                        <div class="col-xl-6">
                          <div class="">
                            <h5 class="font-size-14">Rounded & Circle</h5>
                            <p class="card-title-desc">
                              Use classes <code>.rounded</code> and
                              <code>.rounded-circle</code>.
                            </p>

                            <div class="row">
                              <div class="col-md-6">
                                <b-img
                                  :src="
                                    require('@/assets/images/small/img-4.jpg')
                                  "
                                  rounded
                                  width="200"
                                />
                              </div>
                              <div class="col-md-6">
                                <div class="mt-4 mt-md-0">
                                  <b-img
                                    :src="
                                      require('@/assets/images/users/avatar-4.jpg')
                                    "
                                    class="avatar-xl"
                                    rounded="circle"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-xl-6">
                          <div class="mt-4 mt-lg-0">
                            <h5 class="font-size-14">Thumbnails</h5>
                            <p class="card-title-desc">
                              In addition to our border-radius utilities, you
                              can use
                              <code class="highlighter-rouge"
                                >.img-thumbnail</code
                              >
                              to give an image a rounded 1px border appearance.
                            </p>

                            <div class="row">
                              <div class="col-md-6">
                                <b-img
                                  :src="
                                    require('@/assets/images/small/img-3.jpg')
                                  "
                                  thumbnail
                                  width="200"
                                />
                              </div>
                              <div class="col-md-6">
                                <div class="mt-4 mt-md-0">
                                  <b-img
                                    :src="
                                      require('@/assets/images/users/avatar-3.jpg')
                                    "
                                    thumbnail
                                    rounded="circle"
                                    class="avatar-xl"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end row -->

                      <div class="row mt-3">
                        <div class="col-lg-12">
                          <h5 class="font-size-14 mb-4">Sizes</h5>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="row">
                                <div class="col-lg-4">
                                  <div>
                                    <b-img
                                      :src="
                                        require('@/assets/images/users/avatar-3.jpg')
                                      "
                                      alt=""
                                      class="rounded avatar-sm"
                                    />
                                    <p class="mt-2 mb-lg-0">
                                      <code>.avatar-sm</code>
                                    </p>
                                  </div>
                                </div>
                                <div class="col-lg-4">
                                  <div>
                                    <b-img
                                      :src="
                                        require('@/assets/images/users/avatar-4.jpg')
                                      "
                                      alt=""
                                      class="rounded avatar-md"
                                    />
                                    <p class="mt-2  mb-lg-0">
                                      <code>.avatar-md</code>
                                    </p>
                                  </div>
                                </div>
                                <div class="col-lg-4">
                                  <div>
                                    <b-img
                                      :src="
                                        require('@/assets/images/users/avatar-5.jpg')
                                      "
                                      alt=""
                                      class="rounded avatar-lg"
                                    />
                                    <p class="mt-2 mb-md-0">
                                      <code>.avatar-lg</code>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="row">
                                <div class="col-lg-4">
                                  <div>
                                    <b-img
                                      :src="
                                        require('@/assets/images/users/avatar-3.jpg')
                                      "
                                      alt=""
                                      class="rounded-circle avatar-sm"
                                    ></b-img>
                                    <p class="mt-2 mb-lg-0">
                                      <code>.avatar-sm</code>
                                    </p>
                                  </div>
                                </div>
                                <div class="col-lg-4">
                                  <div>
                                    <b-img
                                      :src="
                                        require('@/assets/images/users/avatar-4.jpg')
                                      "
                                      alt=""
                                      class="rounded-circle avatar-md"
                                    ></b-img>
                                    <p class="mt-2  mb-lg-0">
                                      <code>.avatar-md</code>
                                    </p>
                                  </div>
                                </div>
                                <div class="col-lg-4">
                                  <div>
                                    <b-img
                                      :src="
                                        require('@/assets/images/users/avatar-5.jpg')
                                      "
                                      alt=""
                                      class="rounded-circle avatar-lg"
                                    ></b-img>
                                    <p class="mt-2 mb-0">
                                      <code>.avatar-lg</code>
                                    </p>
                                  </div>
                                </div>
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

              <!-- Start cards -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="card" id="cards">
                    <div class="card-body">
                      <h4 class="card-title mb-4">Cards</h4>

                      <div class="row">
                        <div class="col-md-6 col-xl-3">
                          <b-card
                            :img-src="
                              require('@/assets/images/small/img-1.jpg')
                            "
                            img-alt="Card image"
                            img-top
                          >
                            <b-card-title>
                              <h5 class="card-title">Card title</h5>
                            </b-card-title>
                            <b-card-text>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </b-card-text>
                            <b-button
                              href="javascript:void(0);"
                              variant="primary"
                              >Button</b-button
                            >
                          </b-card>
                        </div>
                        <!-- end col -->

                        <div class="col-md-6 col-xl-3">
                          <b-card
                            no-body
                            :img-src="
                              require('@/assets/images/small/img-2.jpg')
                            "
                            img-alt="Card image"
                            img-top
                          >
                            <b-card-body>
                              <b-card-title>
                                <h5 class="card-title">Card title</h5>
                              </b-card-title>
                              <b-card-text
                                >Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.</b-card-text
                              >
                            </b-card-body>
                            <ul class="list-group list-group-flush">
                              <li class="list-group-item">Cras justo odio</li>
                              <li class="list-group-item">
                                Dapibus ac facilisis in
                              </li>
                            </ul>
                            <div class="card-body">
                              <a
                                href="javascript:void(0);"
                                class="card-link text-custom"
                                >Card link</a
                              >
                              <a
                                href="javascript:void(0);"
                                class="card-link text-custom"
                                >Another link</a
                              >
                            </div>
                          </b-card>
                        </div>
                        <!-- end col -->

                        <div class="col-xl-6">
                          <b-card no-body class="overflow-hidden">
                            <b-row no-gutters>
                              <b-col md="6">
                                <b-card-img
                                  :src="
                                    require('@/assets/images/small/img-3.jpg')
                                  "
                                  alt="Image"
                                  class="rounded-0"
                                ></b-card-img>
                              </b-col>
                              <b-col md="6" class="align-self-center">
                                <h5 class="font-size-16 mt-0">Card title</h5>
                                <p class="card-text">
                                  This is a wider card with as a to additional
                                  content.
                                </p>
                                <p class="card-text">
                                  <small class="text-muted"
                                    >Last updated 3 mins ago</small
                                  >
                                </p>
                              </b-col>
                            </b-row>
                          </b-card>

                          <b-card no-body class="overflow-hidden">
                            <b-row no-gutters>
                              <b-col md="6" class="align-self-center">
                                <b-card-body>
                                  <h5 class="font-size-16 mt-0">Card title</h5>
                                  <p class="card-text">
                                    This is a wider card with as a to additional
                                    content.
                                  </p>
                                  <p class="card-text">
                                    <small class="text-muted"
                                      >Last updated 3 mins ago</small
                                    >
                                  </p>
                                </b-card-body>
                              </b-col>

                              <b-col md="6">
                                <b-card-img
                                  :src="
                                    require('@/assets/images/small/img-4.jpg')
                                  "
                                  alt="Image"
                                  class="rounded-0"
                                ></b-card-img>
                              </b-col>
                            </b-row>
                          </b-card>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-4">
                          <b-card bg-variant="primary" class="text-white-50">
                            <h5 class="mt-0 mb-4 text-white">
                              <i class="mdi mdi-bullseye-arrow me-3"></i>
                              Primary Card
                            </h5>
                            <p class="card-text">
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </p>
                          </b-card>
                        </div>

                        <div class="col-lg-4">
                          <b-card bg-variant="success" class="text-white-50">
                            <h5 class="mt-0 mb-4 text-white">
                              <i class="mdi mdi-check-all me-3"></i> Success
                              Card
                            </h5>
                            <p class="card-text">
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </p>
                          </b-card>
                        </div>

                        <div class="col-lg-4">
                          <b-card bg-variant="info" class="text-white-50">
                            <h5 class="mt-0 mb-4 text-white">
                              <i class="mdi mdi-alert-circle-outline me-3"></i>
                              Info Card
                            </h5>
                            <p class="card-text">
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </p>
                          </b-card>
                        </div>
                      </div>
                      <!-- end row -->

                      <div class="row">
                        <div class="col-lg-4">
                          <b-card
                            header-class="bg-transparent border-warning"
                            class="border border-warning"
                          >
                            <template v-slot:header>
                              <h5 class="my-0 text-warning">
                                <i class="mdi mdi-bullseye-arrow me-3"></i
                                >Warning outline Card
                              </h5>
                            </template>
                            <h5 class="card-title mt-0">card title</h5>
                            <p class="card-text">
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </p>
                          </b-card>
                        </div>

                        <div class="col-lg-4">
                          <b-card
                            header-class="bg-transparent border-danger"
                            class="border border-danger"
                          >
                            <template v-slot:header>
                              <h5 class="my-0 text-danger">
                                <i class="mdi mdi-block-helper me-3"></i>Danger
                                outline Card
                              </h5>
                            </template>
                            <h5 class="card-title mt-0">card title</h5>
                            <p class="card-text">
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </p>
                          </b-card>
                        </div>

                        <div class="col-lg-4">
                          <b-card
                            header-class="bg-transparent border-success"
                            class="border border-success"
                          >
                            <template v-slot:header>
                              <h5 class="my-0 text-success text-truncate">
                                <i class="mdi mdi-check-all me-3"></i>Success
                                outline Card
                              </h5>
                            </template>
                            <h5 class="card-title mt-0">card title</h5>
                            <p class="card-text">
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </p>
                          </b-card>
                        </div>
                      </div>
                      <!-- end row -->
                    </div>
                  </div>
                </div>
              </div>
              <!-- end cards -->

              <!-- Start Tabs & Accordions -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="card" id="tabs-accordions">
                    <div class="card-body">
                      <h4 class="card-title mb-4">Tabs & Accordions</h4>

                      <div class="row">
                        <div class="col-xl-6">
                          <div>
                            <h5 class="font-size-14">Basic Tabs</h5>
                            <p class="card-title-desc">
                              Example of Default Nav Tabs
                            </p>

                            <b-tabs
                              content-class="border border-top-0 rounded-bottom text-muted p-3"
                            >
                              <b-tab active class="border-0">
                                <template v-slot:title>
                                  <span class="d-inline-block d-sm-none">
                                    <i class="fas fa-home"></i>
                                  </span>
                                  <span class="d-none d-sm-inline-block"
                                    >Home</span
                                  >
                                </template>
                                {{ text }}
                              </b-tab>
                              <b-tab>
                                <template v-slot:title>
                                  <span class="d-inline-block d-sm-none">
                                    <i class="far fa-user"></i>
                                  </span>
                                  <span class="d-none d-sm-inline-block"
                                    >Profile</span
                                  >
                                </template>
                                {{ text }}
                              </b-tab>
                              <b-tab>
                                <template v-slot:title>
                                  <span class="d-inline-block d-sm-none">
                                    <i class="far fa-envelope"></i>
                                  </span>
                                  <span class="d-none d-sm-inline-block"
                                    >Messages</span
                                  >
                                </template>
                                {{ text }}
                              </b-tab>
                              <b-tab>
                                <template v-slot:title>
                                  <span class="d-inline-block d-sm-none">
                                    <i class="fas fa-cog"></i>
                                  </span>
                                  <span class="d-none d-sm-inline-block"
                                    >Settings</span
                                  >
                                </template>
                                {{ text }}
                              </b-tab>
                            </b-tabs>
                            <!-- Tab panes -->
                          </div>
                        </div>

                        <div class="col-xl-6">
                          <div class="mt-4 mt-xl-0">
                            <h5 class="font-size-14">Basic Nav Pills</h5>
                            <p class="card-title-desc">
                              Example of Default Nav Pills
                            </p>

                            <b-tabs content-class="text-muted p-3" pills>
                              <b-tab active class="border-0">
                                <template v-slot:title>
                                  <span class="d-inline-block d-sm-none">
                                    <i class="fas fa-home"></i>
                                  </span>
                                  <span class="d-none d-sm-inline-block"
                                    >Home</span
                                  >
                                </template>
                                {{ text }}
                              </b-tab>
                              <b-tab>
                                <template v-slot:title>
                                  <span class="d-inline-block d-sm-none">
                                    <i class="far fa-user"></i>
                                  </span>
                                  <span class="d-none d-sm-inline-block"
                                    >Profile</span
                                  >
                                </template>
                                {{ text }}
                              </b-tab>
                              <b-tab>
                                <template v-slot:title>
                                  <span class="d-inline-block d-sm-none">
                                    <i class="far fa-envelope"></i>
                                  </span>
                                  <span class="d-none d-sm-inline-block"
                                    >Messages</span
                                  >
                                </template>
                                {{ text }}
                              </b-tab>
                              <b-tab>
                                <template v-slot:title>
                                  <span class="d-inline-block d-sm-none">
                                    <i class="fas fa-cog"></i>
                                  </span>
                                  <span class="d-none d-sm-inline-block"
                                    >Settings</span
                                  >
                                </template>
                                {{ text }}
                              </b-tab>
                            </b-tabs>
                          </div>
                        </div>
                      </div>

                      <div class="row mt-3">
                        <div class="col-xl-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">Custom Nav Tabs</h5>
                            <p class="card-title-desc">
                              Example of Custom Nav Tabs
                            </p>
                            <b-tabs
                              content-class="p-3 text-muted"
                              justified
                              nav-class="nav-tabs-custom"
                            >
                              <b-tab active class="border-0">
                                <template v-slot:title>
                                  <span class="d-inline-block d-sm-none">
                                    <i class="fas fa-home"></i>
                                  </span>
                                  <span class="d-none d-sm-inline-block"
                                    >Home</span
                                  >
                                </template>
                                {{ text }}
                              </b-tab>
                              <b-tab>
                                <template v-slot:title>
                                  <span class="d-inline-block d-sm-none">
                                    <i class="far fa-user"></i>
                                  </span>
                                  <span class="d-none d-sm-inline-block"
                                    >Profile</span
                                  >
                                </template>
                                {{ text }}
                              </b-tab>
                              <b-tab>
                                <template v-slot:title>
                                  <span class="d-inline-block d-sm-none">
                                    <i class="far fa-envelope"></i>
                                  </span>
                                  <span class="d-none d-sm-inline-block"
                                    >Messages</span
                                  >
                                </template>
                                {{ text }}
                              </b-tab>
                              <b-tab>
                                <template v-slot:title>
                                  <span class="d-inline-block d-sm-none">
                                    <i class="fas fa-cog"></i>
                                  </span>
                                  <span class="d-none d-sm-inline-block"
                                    >Settings</span
                                  >
                                </template>
                                {{ text }}
                              </b-tab>
                            </b-tabs>
                            <!-- Nav tabs -->
                          </div>
                        </div>

                        <div class="col-xl-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">Accordions</h5>
                            <p class="card-title-desc">
                              Extend the default collapse behavior to create an
                              accordion.
                            </p>

                            <div role="tablist">
                              <b-card no-body class="mb-1 shadow-none">
                                <b-card-header header-tag="header" role="tab">
                                  <h6 class="m-0">
                                    <a
                                      v-b-toggle.accordion-1
                                      class="text-dark"
                                      href="javascript: void(0);"
                                      >Collapsible Group Item #1</a
                                    >
                                  </h6>
                                </b-card-header>
                                <b-collapse
                                  id="accordion-1"
                                  visible
                                  accordion="my-accordion"
                                  role="tabpanel"
                                >
                                  <b-card-body>
                                    <b-card-text>{{ text }}</b-card-text>
                                  </b-card-body>
                                </b-collapse>
                              </b-card>

                              <b-card no-body class="mb-1">
                                <b-card-header header-tag="header" role="tab">
                                  <h6 class="m-0">
                                    <a
                                      v-b-toggle.accordion-2
                                      class="text-dark"
                                      href="javascript: void(0);"
                                      >Collapsible Group Item #2</a
                                    >
                                  </h6>
                                </b-card-header>
                                <b-collapse
                                  id="accordion-2"
                                  accordion="my-accordion"
                                  role="tabpanel"
                                >
                                  <b-card-body>
                                    <b-card-text>{{ text }}</b-card-text>
                                  </b-card-body>
                                </b-collapse>
                              </b-card>

                              <b-card no-body class="mb-1">
                                <b-card-header header-tag="header" role="tab">
                                  <h6 class="m-0">
                                    <a
                                      v-b-toggle.accordion-3
                                      class="text-dark"
                                      href="javascript: void(0);"
                                      >Collapsible Group Item #3</a
                                    >
                                  </h6>
                                </b-card-header>
                                <b-collapse
                                  id="accordion-3"
                                  accordion="my-accordion"
                                  role="tabpanel"
                                >
                                  <b-card-body>
                                    <b-card-text>{{ text }}</b-card-text>
                                  </b-card-body>
                                </b-collapse>
                              </b-card>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end Tabs & Accordions -->

              <!-- Start Modals -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="card" id="modals">
                    <div class="card-body">
                      <h4 class="card-title mb-4">Modals</h4>
                      <div>
                        <div>
                          <h5 class="font-size-14">Basic</h5>
                          <p class="card-title-desc">
                            Toggle a working modal demo by clicking the button
                            below. It will slide down and fade in from the top
                            of the page.
                          </p>

                          <b-button
                            type="button"
                            variant="primary"
                            v-b-modal.modal-standard
                          >
                            Standard modal
                          </b-button>
                          <b-modal
                            id="modal-standard"
                            title="Modal Heading"
                            title-class="font-18"
                          >
                            <h5>Overflowing text to show scroll behavior</h5>
                            <p>
                              Cras mattis consectetur purus sit amet fermentum.
                              Cras justo odio, dapibus ac facilisis in, egestas
                              eget quam. Morbi leo risus, porta ac consectetur
                              ac, vestibulum at eros.
                            </p>
                            <p>
                              Praesent commodo cursus magna, vel scelerisque
                              nisl consectetur et. Vivamus sagittis lacus vel
                              augue laoreet rutrum faucibus dolor auctor.
                            </p>
                            <p>
                              Aenean lacinia bibendum nulla sed consectetur.
                              Praesent commodo cursus magna, vel scelerisque
                              nisl consectetur et. Donec sed odio dui. Donec
                              ullamcorper nulla non metus auctor fringilla.
                            </p>
                            <p>
                              Cras mattis consectetur purus sit amet fermentum.
                              Cras justo odio, dapibus ac facilisis in, egestas
                              eget quam. Morbi leo risus, porta ac consectetur
                              ac, vestibulum at eros.
                            </p>
                            <p>
                              Praesent commodo cursus magna, vel scelerisque
                              nisl consectetur et. Vivamus sagittis lacus vel
                              augue laoreet rutrum faucibus dolor auctor.
                            </p>
                            <p>
                              Aenean lacinia bibendum nulla sed consectetur.
                              Praesent commodo cursus magna, vel scelerisque
                              nisl consectetur et. Donec sed odio dui. Donec
                              ullamcorper nulla non metus auctor fringilla.
                            </p>
                            <p>
                              Cras mattis consectetur purus sit amet fermentum.
                              Cras justo odio, dapibus ac facilisis in, egestas
                              eget quam. Morbi leo risus, porta ac consectetur
                              ac, vestibulum at eros.
                            </p>
                            <p>
                              Praesent commodo cursus magna, vel scelerisque
                              nisl consectetur et. Vivamus sagittis lacus vel
                              augue laoreet rutrum faucibus dolor auctor.
                            </p>
                            <p>
                              Aenean lacinia bibendum nulla sed consectetur.
                              Praesent commodo cursus magna, vel scelerisque
                              nisl consectetur et. Donec sed odio dui. Donec
                              ullamcorper nulla non metus auctor fringilla.
                            </p>
                          </b-modal>
                          <!-- /.modal -->
                        </div>

                        <div class="mt-4 pt-2">
                          <h5 class="font-size-14">Optional Sizes</h5>
                          <p class="card-title-desc">
                            Modals have three optional sizes, available via
                            modifier classes to be placed on a
                            <code>b-modal</code>.
                          </p>

                          <div class="button-items">
                            <b-button v-b-modal.modal-xl variant="primary"
                              >Extra large modal</b-button
                            >
                            <b-modal
                              id="modal-xl"
                              size="xl"
                              title="Extra large modal"
                              title-class="font-18"
                              hide-footer
                            >
                              <p>
                                Cras mattis consectetur purus sit amet
                                fermentum. Cras justo odio, dapibus ac facilisis
                                in, egestas eget quam. Morbi leo risus, porta ac
                                consectetur ac, vestibulum at eros.
                              </p>
                              <p>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Vivamus sagittis lacus vel
                                augue laoreet rutrum faucibus dolor auctor.
                              </p>
                              <p class="mb-0">
                                Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                              </p>
                            </b-modal>
                            <!-- Large modal -->
                            <b-button v-b-modal.modal-lg variant="success"
                              >Large modal</b-button
                            >
                            <b-modal
                              id="modal-lg"
                              size="lg"
                              title="Large modal"
                              title-class="font-18"
                              hide-footer
                            >
                              <p>
                                Cras mattis consectetur purus sit amet
                                fermentum. Cras justo odio, dapibus ac facilisis
                                in, egestas eget quam. Morbi leo risus, porta ac
                                consectetur ac, vestibulum at eros.
                              </p>
                              <p>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Vivamus sagittis lacus vel
                                augue laoreet rutrum faucibus dolor auctor.
                              </p>
                              <p class="mb-0">
                                Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                              </p>
                            </b-modal>

                            <!-- Small modal -->
                            <b-button v-b-modal.modal-sm variant="danger"
                              >Small modal</b-button
                            >
                            <b-modal
                              id="modal-sm"
                              size="sm"
                              title="Small modal"
                              title-class="font-18"
                              hide-footer
                            >
                              <p>
                                Cras mattis consectetur purus sit amet
                                fermentum. Cras justo odio, dapibus ac facilisis
                                in, egestas eget quam. Morbi leo risus, porta ac
                                consectetur ac, vestibulum at eros.
                              </p>
                              <p>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Vivamus sagittis lacus vel
                                augue laoreet rutrum faucibus dolor auctor.
                              </p>
                              <p class="mb-0">
                                Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                              </p>
                            </b-modal>
                            <!-- Full Screen  modal -->
                            <b-button
                              v-b-modal.full-screen
                              type="button"
                              class="btn btn-info"
                            >
                              Full Screen Modal
                            </b-button>
                            <b-modal
                              id="full-screen"
                              dialog-class="modal-fullscreen"
                              title="Full screen modal"
                            >
                              <p>
                                Cras mattis consectetur purus sit amet
                                fermentum. Cras justo odio, dapibus ac facilisis
                                in, egestas eget quam. Morbi leo risus, porta ac
                                consectetur ac, vestibulum at eros.
                              </p>
                              <p>
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Vivamus sagittis lacus vel
                                augue laoreet rutrum faucibus dolor auctor.
                              </p>
                              <p class="mb-0">
                                Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                              </p>
                            </b-modal>
                          </div>

                          <!--  Extra Large modal example -->
                          <div
                            class="modal fade bs-example-modal-xl"
                            tabindex="-1"
                            role="dialog"
                            aria-labelledby="myExtraLargeModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog modal-xl">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title mt-0"
                                    id="myExtraLargeModalLabel"
                                  >
                                    Extra large modal
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">
                                  <p>
                                    Cras mattis consectetur purus sit amet
                                    fermentum. Cras justo odio, dapibus ac
                                    facilisis in, egestas eget quam. Morbi leo
                                    risus, porta ac consectetur ac, vestibulum
                                    at eros.
                                  </p>
                                  <p>
                                    Praesent commodo cursus magna, vel
                                    scelerisque nisl consectetur et. Vivamus
                                    sagittis lacus vel augue laoreet rutrum
                                    faucibus dolor auctor.
                                  </p>
                                  <p class="mb-0">
                                    Aenean lacinia bibendum nulla sed
                                    consectetur. Praesent commodo cursus magna,
                                    vel scelerisque nisl consectetur et. Donec
                                    sed odio dui. Donec ullamcorper nulla non
                                    metus auctor fringilla.
                                  </p>
                                </div>
                              </div>
                              <!-- /.modal-content -->
                            </div>
                            <!-- /.modal-dialog -->
                          </div>
                          <!-- /.modal -->
                        </div>
                      </div>
                      <!-- end row -->

                      <div class="row mt-3">
                        <div class="col-xl-4 col-md-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">Vertically Centered</h5>
                            <p class="card-title-desc">
                              Add <code>centered</code> to
                              <code>b-modal</code> to vertically center the
                              modal.
                            </p>
                          </div>

                          <b-button v-b-modal.modal-center variant="primary"
                            >Center modal</b-button
                          >
                          <b-modal
                            id="modal-center"
                            centered
                            title="Center modal"
                            title-class="font-18"
                            hide-footer
                          >
                            <p>
                              Cras mattis consectetur purus sit amet fermentum.
                              Cras justo odio, dapibus ac facilisis in, egestas
                              eget quam. Morbi leo risus, porta ac consectetur
                              ac, vestibulum at eros.
                            </p>
                            <p>
                              Praesent commodo cursus magna, vel scelerisque
                              nisl consectetur et. Vivamus sagittis lacus vel
                              augue laoreet rutrum faucibus dolor auctor.
                            </p>
                            <p class="mb-0">
                              Aenean lacinia bibendum nulla sed consectetur.
                              Praesent commodo cursus magna, vel scelerisque
                              nisl consectetur et. Donec sed odio dui. Donec
                              ullamcorper nulla non metus auctor fringilla.
                            </p>
                          </b-modal>
                          <!-- /.modal -->
                        </div>
                        <div class="col-xl-4 col-md-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">Scrollable modal</h5>
                            <p class="card-title-desc">
                              You can also create a scrollable modal that allows
                              scroll the modal body by adding
                              <code>scrollable</code> to <code>b-modal</code>.
                            </p>

                            <!-- Scrollable modal -->
                            <b-button
                              v-b-modal.modal-scrollable
                              variant="primary"
                              >Scrollable modal</b-button
                            >
                          </div>
                          <b-modal
                            id="modal-scrollable"
                            scrollable
                            title="Scrollable Modal"
                            title-class="font-18"
                          >
                            <p v-for="i in 15" :key="i">
                              Cras mattis consectetur purus sit amet fermentum.
                              Cras justo odio, dapibus ac facilisis in, egestas
                              eget quam. Morbi leo risus, porta ac consectetur
                              ac, vestibulum at eros.
                            </p>
                          </b-modal>
                          <!-- /.modal -->
                        </div>

                        <div class="col-xl-4 col-md-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">Multiple modal</h5>
                            <p class="card-title-desc">
                              To disable stacking for a specific modal, just set
                              the prop <br />
                              no-stacking on the<code translate="no">
                                b-modal</code
                              >
                              component
                            </p>

                            <!-- Button trigger modal -->
                            <b-button v-b-modal.modal-multi-1 variant="primary"
                              >Open First Modal</b-button
                            >

                            <b-modal
                              id="modal-multi-1"
                              size="lg"
                              title="First Modal"
                              ok-only
                              no-stacking
                            >
                              <p class="my-2">
                                Here is the first modal content.
                              </p>
                              <b-button
                                v-b-modal.modal-multi-2
                                variant="primary"
                                >Open Second Modal</b-button
                              >
                            </b-modal>

                            <b-modal
                              id="modal-multi-2"
                              title="Second Modal"
                              ok-only
                            >
                              <p class="my-2">
                                Here is the second modal content.
                              </p>
                              <b-button
                                v-b-modal.modal-multi-3
                                size="sm"
                                variant="primary"
                                >Open Third Modal</b-button
                              >
                            </b-modal>

                            <b-modal
                              id="modal-multi-3"
                              size="sm"
                              title="Third Modal"
                              ok-only
                            >
                              <p class="my-1">
                                Here is the third modal content.
                              </p>
                            </b-modal>
                          </div>
                        </div>
                      </div>
                      <!-- end row -->
                    </div>
                  </div>
                </div>
              </div>
              <!-- end row -->

              <!-- start pagination -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="card overflow-hidden" id="pagination">
                    <div class="card-body">
                      <h4 class="card-title mb-4">Pagination</h4>

                      <div class="row">
                        <div class="col-lg-6">
                          <div class="">
                            <h5 class="font-size-14">Basic</h5>
                            <p class="card-title-desc">
                              Pagination links indicate a series of related
                              content exists across multiple pages.
                            </p>

                            <b-pagination
                              v-model="defaultvalue"
                              :total-rows="30"
                              :per-page="10"
                              aria-controls="my-table"
                            ></b-pagination>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="mt-4 mt-lg-0">
                            <h5 class="font-size-14">Custom</h5>
                            <p class="card-title-desc">
                              Add <code>.pagination-rounded</code> with
                              <code>.pagination</code> class for rounded
                              pagination.
                            </p>

                            <b-pagination
                              class="pagination-rounded"
                              v-model="custompagination"
                              :total-rows="30"
                              :per-page="10"
                              aria-controls="my-table"
                            ></b-pagination>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">Sizing</h5>
                            <p class="card-title-desc">
                              Add <code>size="lg"</code> or
                              <code>size="sm"</code> for pagination additional
                              sizes.
                            </p>

                            <b-pagination
                              :total-rows="30"
                              :per-page="10"
                              aria-controls="my-table"
                              size="lg"
                            ></b-pagination>

                            <b-pagination
                              :total-rows="30"
                              :per-page="10"
                              aria-controls="my-table"
                              size="sm"
                            ></b-pagination>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end pagination -->

              <!-- start Progress -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="card" id="progress">
                    <div class="card-body">
                      <h4 class="card-title mb-4">Progress</h4>

                      <div class="row">
                        <div class="col-lg-6">
                          <div>
                            <h5 class="font-size-14">Basic</h5>
                            <p class="card-title-desc">
                              Progress components are built with two HTML
                              elements, some CSS to set the width, and a few
                              attributes.
                            </p>

                            <div class="">
                              <b-progress
                                :value="25"
                                :max="100"
                                class="mb-4"
                                variant="primary"
                              ></b-progress>
                              <b-progress
                                :value="50"
                                :max="100"
                                class="mb-4"
                                variant="warning"
                              ></b-progress>
                              <b-progress
                                :value="75"
                                :max="100"
                                class="mb-4"
                                variant="success"
                              ></b-progress>
                              <b-progress
                                :value="100"
                                variant="danger"
                              ></b-progress>
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="mt-4 mt-lg-0">
                            <h5 class="font-size-14">Heights</h5>
                            <p class="card-title-desc">
                              We only set a <code>height</code> value on the
                              <code>.progress-bar</code>, so if you change that
                              value the outer <code>.progress</code> will
                              automatically resize accordingly.
                            </p>

                            <div class="">
                              <b-progress
                                :value="25"
                                :max="100"
                                class="mb-4"
                                variant="danger"
                                height=".2rem"
                              ></b-progress>
                              <b-progress
                                :value="45"
                                :max="100"
                                class="progress-md mb-4"
                                variant="primary"
                              ></b-progress>
                              <b-progress
                                :value="75"
                                :max="100"
                                class="progress-md mb-4"
                                variant="warning"
                                height=".75rem"
                              ></b-progress>
                              <b-progress
                                :value="64"
                                :max="100"
                                class="progress-md mb-4"
                                variant="info"
                                height="1.5rem"
                              ></b-progress>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row mt-3">
                        <div class="col-lg-12">
                          <div class="mt-4">
                            <h5 class="font-size-14">Striped & Animated</h5>
                            <p class="card-title-desc">
                              Add <code>.progress-bar-striped</code> to any
                              <code>.progress-bar</code> to apply a stripe via
                              CSS gradient over the progress bar’s background
                              color.
                            </p>

                            <div class="">
                              <b-progress
                                striped
                                :value="10"
                                :max="100"
                                class="mb-4"
                                variant="primary"
                              ></b-progress>
                              <b-progress
                                striped
                                :value="25"
                                :max="100"
                                class="mb-4"
                                variant="success"
                              ></b-progress>

                              <b-progress
                                striped
                                :value="50"
                                :max="100"
                                class="mb-4"
                                variant="info"
                              ></b-progress>
                              <b-progress
                                striped
                                :value="75"
                                :max="100"
                                class="mb-4"
                                variant="warning"
                              ></b-progress>
                              <b-progress
                                striped
                                :value="100"
                                :max="100"
                                class="mb-4"
                                variant="danger"
                              ></b-progress>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end row -->

              <!-- Start Tooltip - popover -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="card" id="tooltip-popover">
                    <div class="card-body">
                      <h4 class="card-title mb-4">Tooltips & Popovers</h4>

                      <div>
                        <div>
                          <h5 class="font-size-14">Tooltips</h5>
                          <p class="card-title-desc">
                            Hover over the links below to see tooltips.
                          </p>

                          <div class="button-items" id="tooltip-container">
                            <b-button id="tooltip-top" variant="primary"
                              >Tooltip on top</b-button
                            >
                            <b-tooltip target="tooltip-top"
                              >Tooltip on top</b-tooltip
                            >
                            <b-button id="tooltip-button" variant="primary"
                              >Tooltip on bottom</b-button
                            >
                            <b-tooltip
                              target="tooltip-button"
                              placement="bottom"
                              >Tooltip on bottom</b-tooltip
                            >
                            <b-button id="tooltip-left-button" variant="primary"
                              >Tooltip on left</b-button
                            >
                            <b-tooltip target="tooltip-left-button"
                              >Tooltip on left</b-tooltip
                            >
                            <b-button
                              id="tooltip-right-button"
                              variant="primary"
                              >Tooltip on right</b-button
                            >
                            <b-tooltip
                              target="tooltip-right-button"
                              placement="bottom"
                              >Tooltip on right</b-tooltip
                            >
                          </div>
                        </div>

                        <div class="mt-4 pt-2">
                          <h5 class="font-size-14">Popovers</h5>
                          <p class="card-title-desc">
                            Add small overlay content, like those found in iOS,
                            to any element for housing secondary information.
                          </p>

                          <div class="button-items" id="popover-container">
                            <b-button
                              v-b-popover.top="
                                'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'
                              "
                              variant="secondary"
                              >Popover on top</b-button
                            >

                            <b-button
                              v-b-popover.bottom="
                                'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'
                              "
                              variant="secondary"
                              >Popover on bottom</b-button
                            >
                            <b-button
                              v-b-popover.right="
                                'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'
                              "
                              variant="secondary"
                              >Popover on right</b-button
                            >
                            <b-button
                              v-b-popover.left="
                                'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'
                              "
                              variant="secondary"
                              >Popover on left</b-button
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end Tooltip - popover -->

              <!-- start spinner -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="card" id="spinner">
                    <div class="card-body">
                      <h4 class="card-title mb-4">Spinners</h4>

                      <div class="row">
                        <div class="col-lg-6">
                          <div>
                            <div>
                              <h5 class="font-size-14">Border</h5>
                              <p class="card-title-desc">
                                Use the border spinners for a lightweight
                                loading indicator.
                              </p>

                              <div>
                                <b-spinner
                                  class="m-2"
                                  variant="primary"
                                  role="status"
                                ></b-spinner>
                              </div>
                            </div>

                            <div class="mt-4 pt-2">
                              <h5 class="font-size-14">Color variation</h5>
                              <p class="card-title-desc">
                                Add <code>text-*</code> color for a Spinner
                                color variation.
                              </p>
                              <b-spinner
                                class="m-2"
                                variant="primary"
                                role="status"
                              ></b-spinner>
                              <b-spinner
                                class="m-2"
                                variant="secondary"
                                role="status"
                              ></b-spinner>
                              <b-spinner
                                class="m-2"
                                variant="success"
                                role="status"
                              ></b-spinner>
                              <b-spinner
                                class="m-2"
                                variant="info"
                                role="status"
                              ></b-spinner>
                              <b-spinner
                                class="m-2"
                                variant="warning"
                                role="status"
                              ></b-spinner>
                              <b-spinner
                                class="m-2"
                                variant="danger"
                                role="status"
                              ></b-spinner>
                              <b-spinner
                                class="m-2"
                                variant="dark"
                                role="status"
                              ></b-spinner>
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="mt-4 mt-lg-0">
                            <div>
                              <h5 class="font-size-14">Growing</h5>
                              <p class="card-title-desc">
                                Switch to the grow spinner.it does repeatedly
                                grow Continue!
                              </p>

                              <div>
                                <b-spinner
                                  type="grow"
                                  class="m-2"
                                  variant="primary"
                                  role="status"
                                ></b-spinner>
                              </div>
                            </div>
                          </div>
                          <div class="mt-4 pt-2">
                            <h5 class="font-size-14">Color Variation</h5>
                            <p class="card-title-desc">
                              Add <code>text-*</code> color for a Spinner color
                              variation.
                            </p>

                            <b-spinner
                              type="grow"
                              class="m-2"
                              variant="primary"
                              role="status"
                            ></b-spinner>
                            <b-spinner
                              type="grow"
                              class="m-2"
                              variant="secondary"
                              role="status"
                            ></b-spinner>
                            <b-spinner
                              type="grow"
                              class="m-2"
                              variant="success"
                              role="status"
                            ></b-spinner>
                            <b-spinner
                              type="grow"
                              class="m-2"
                              variant="info"
                              role="status"
                            ></b-spinner>
                            <b-spinner
                              type="grow"
                              class="m-2"
                              variant="warning"
                              role="status"
                            ></b-spinner>
                            <b-spinner
                              type="grow"
                              class="m-2"
                              variant="danger"
                              role="status"
                            ></b-spinner>
                            <b-spinner
                              type="grow"
                              class="m-2"
                              variant="dark"
                              role="status"
                            ></b-spinner>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end spinner -->

              <!-- Start Grid -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="card" id="grid">
                    <div class="card-body">
                      <h4 class="card-title">Grid</h4>
                      <p class="card-title-desc mb-4">
                        See how aspects of the Bootstrap grid system work across
                        multiple devices with a handy table.
                      </p>
                      <div class="table-responsive">
                        <table class="table table-bordered table-striped mb-0">
                          <thead>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col" class="text-center">
                                xs<br />
                                <span class="fw-normal">&lt;576px</span>
                              </th>
                              <th scope="col" class="text-center">
                                sm<br />
                                <span class="fw-normal">≥576px</span>
                              </th>
                              <th scope="col" class="text-center">
                                md<br />
                                <span class="fw-normal">≥768px</span>
                              </th>
                              <th scope="col" class="text-center">
                                lg<br />
                                <span class="fw-normal">≥992px</span>
                              </th>
                              <th scope="col" class="text-center">
                                xl<br />
                                <span class="fw-normal">≥1200px</span>
                              </th>
                              <th scope="col" class="text-center">
                                xxl<br />
                                <span class="fw-normal">≥1400px</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th class="text-nowrap" scope="row">
                                Grid behavior
                              </th>
                              <td>Horizontal at all times</td>
                              <td colspan="5">
                                Collapsed to start, horizontal above breakpoints
                              </td>
                            </tr>
                            <tr>
                              <th class="text-nowrap" scope="row">
                                Max container width
                              </th>
                              <td>None (auto)</td>
                              <td>540px</td>
                              <td>720px</td>
                              <td>960px</td>
                              <td>1140px</td>
                              <td>1320px</td>
                            </tr>
                            <tr>
                              <th class="text-nowrap" scope="row">
                                Class prefix
                              </th>
                              <td><code>.col-</code></td>
                              <td><code>.col-sm-</code></td>
                              <td><code>.col-md-</code></td>
                              <td><code>.col-lg-</code></td>
                              <td><code>.col-xl-</code></td>
                              <td><code>.col-xxl-</code></td>
                            </tr>
                            <tr>
                              <th class="text-nowrap" scope="row">
                                # of columns
                              </th>
                              <td colspan="6">12</td>
                            </tr>
                            <tr>
                              <th class="text-nowrap" scope="row">
                                Gutter width
                              </th>
                              <td colspan="6">
                                24px (12px on each side of a column)
                              </td>
                            </tr>
                            <tr>
                              <th class="text-nowrap" scope="row">
                                Custom gutters
                              </th>
                              <td colspan="6">Yes</td>
                            </tr>
                            <tr>
                              <th class="text-nowrap" scope="row">Nestable</th>
                              <td colspan="6">Yes</td>
                            </tr>
                            <tr>
                              <th class="text-nowrap" scope="row">Offsets</th>
                              <td colspan="6">Yes</td>
                            </tr>
                            <tr>
                              <th class="text-nowrap" scope="row">
                                Column ordering
                              </th>
                              <td colspan="6">Yes</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end Grid -->

              <!-- start Video -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="card" id="video">
                    <div class="card-body">
                      <h4 class="card-title mb-4">Video</h4>

                      <div class="row">
                        <div class="col-lg-6">
                          <div>
                            <h5 class="font-size-14">
                              Responsive Embed Video 16:9
                            </h5>
                            <p class="card-title-desc">
                              Aspect ratios can be customized with modifier
                              classes.
                            </p>

                            <div class="">
                              <!-- 16:9 aspect ratio -->
                              <div class="ratio ratio-16x9">
                                <iframe
                                  src="https://www.youtube.com/embed/1y_kfWUCFDQ"
                                  title="YouTube video"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-6">
                          <div class="mt-4 mt-lg-0">
                            <h5 class="font-size-14">
                              Responsive Embed Video 21:9
                            </h5>
                            <p class="card-title-desc">
                              Aspect ratios can be customized with modifier
                              classes.
                            </p>

                            <div class="">
                              <!-- 21:9 aspect ratio -->
                              <div class="ratio ratio-21x9">
                                <iframe
                                  src="https://www.youtube.com/embed/1y_kfWUCFDQ"
                                  title="YouTube video"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row mt-3">
                        <div class="col-lg-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">
                              Responsive Embed Video 4:3
                            </h5>
                            <p class="card-title-desc">
                              Aspect ratios can be customized with modifier
                              classes.
                            </p>

                            <div class="">
                              <!-- 4:3 aspect ratio -->
                              <div class="ratio ratio-4x3">
                                <iframe
                                  src="https://www.youtube.com/embed/1y_kfWUCFDQ"
                                  title="YouTube video"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="mt-4">
                            <h5 class="font-size-14">
                              Responsive Embed Video 1:1
                            </h5>
                            <p class="card-title-desc">
                              Aspect ratios can be customized with modifier
                              classes.
                            </p>

                            <div class="">
                              <!-- 1:1 aspect ratio -->
                              <div class="ratio ratio-1x1">
                                <iframe
                                  src="https://www.youtube.com/embed/1y_kfWUCFDQ"
                                  title="YouTube video"
                                  allowfullscreen
                                ></iframe>
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
            </div>
          </div>
          <!-- end content page -->

          <!-- Start right-side-nav -->
          <div class="d-none d-lg-block">
            <div class="ui-elements-demo-bar card">
              <ul class="nav nav-pills flex-column">
                <li class="nav-item">
                  <a href="#buttons" class="nav-link">Buttons</a>
                </li>
                <li class="nav-item">
                  <a href="#badges" class="nav-link">Badges</a>
                </li>
                <li class="nav-item">
                  <a href="#dropdowns" class="nav-link">Dropdowns</a>
                </li>
                <li class="nav-item">
                  <a href="#images" class="nav-link">Images</a>
                </li>
                <li class="nav-item">
                  <a href="#cards" class="nav-link">Cards</a>
                </li>
                <li class="nav-item">
                  <a href="#tabs-accordions" class="nav-link"
                    >Tabs & Accordions</a
                  >
                </li>
                <li class="nav-item">
                  <a href="#modals" class="nav-link">Modals</a>
                </li>
                <li class="nav-item">
                  <a href="#pagination" class="nav-link">Pagination</a>
                </li>
                <li class="nav-item">
                  <a href="#progress" class="nav-link">Progress</a>
                </li>

                <li class="nav-item">
                  <a href="#tooltip-popover" class="nav-link"
                    >Tooltips & Popovers</a
                  >
                </li>
                <li class="nav-item">
                  <a href="#spinner" class="nav-link">Spinners</a>
                </li>
                <li class="nav-item">
                  <a href="#grid" class="nav-link">Grid</a>
                </li>
                <li class="nav-item">
                  <a href="#video" class="nav-link">Video</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>
