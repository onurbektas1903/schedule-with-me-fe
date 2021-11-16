<script>
import appConfig from "@/app.config";

/**
 * Error-500
 */
export default {
  page: {
    title: "Error 500",
    meta: [{ name: "description", content: appConfig.description }],
  },
};
</script>

<template>
  <div class="my-5 pt-sm-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="text-center">
            <div class="row justify-content-center">
              <div class="col-sm-5">
                <div class="">
                  <img
                    src="@/assets/images/server-error.png"
                    alt=""
                    class="img-fluid mx-auto d-block"
                  />
                </div>
              </div>
            </div>
            <h4 class="text-uppercase mt-4">Internal Server Error</h4>
            <p class="text-muted">
              It will be as simple as Occidental in fact, it will be Occidental
            </p>
            <div class="mt-5">
              <router-link class="btn btn-primary" to="/"
                >Back to Dashboard</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
