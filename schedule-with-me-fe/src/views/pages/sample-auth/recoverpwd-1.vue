<script>
import appConfig from "@/app.config";

/**
 * Recoverpwd-component
 */
export default {
  page: {
    title: "Recover Password",
    meta: [{ name: "description", content: appConfig.description }],
  },
};
</script>

<template>
  <div class="account-pages my-5 pt-sm-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="text-center mb-5">
            <router-link to="/" class="auth-logo">
              <img
                src="@/assets/images/logo-dark.png"
                alt=""
                height="28"
                class="auth-logo-dark"
              />
              <img
                src="@/assets/images/logo-light.png"
                alt=""
                height="28"
                class="auth-logo-light"
              />
            </router-link>
            <p class="font-size-15 text-muted mt-3">
              Responsive <b>Bootstrap 5</b> Admin Dashboard
            </p>
          </div>
          <div class="card overflow-hidden">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="p-lg-5 p-4">
                  <div>
                    <h5>Reset Password</h5>
                    <p class="text-muted">Re-Password with Samply.</p>
                  </div>

                  <div class="mt-4 pt-3">
                    <div class="alert alert-success mb-4" role="alert">
                      Enter your Email and instructions will be sent to you!
                    </div>

                    <form>
                      <div class="mb-3">
                        <label class="fw-semibold" for="useremail">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          id="useremail"
                          placeholder="Enter email"
                        />
                      </div>

                      <div class="mt-4 text-end">
                        <button
                          class="btn btn-primary w-md waves-effect waves-light"
                          type="submit"
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="p-lg-5 p-4 bg-auth h-100 d-none d-lg-block">
                  <div class="bg-overlay"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- end card -->
          <div class="mt-5 text-center">
            <p>
              Remember It ?
              <router-link
                to="/auth/login-1"
                class="fw-semibold text-decoration-underline"
              >
                Login
              </router-link>
            </p>
            <p>
              © {{ new Date().getFullYear() }} <b>Samply</b>. Crafted with
              <i class="mdi mdi-heart text-danger"></i> by Pichforest
            </p>
          </div>
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </div>
  <!-- end account page -->
</template>
