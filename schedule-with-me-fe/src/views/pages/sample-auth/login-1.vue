<script>
import appConfig from "@/app.config";

/**
 * Login-1 component
 */
export default {
  page: {
    title: "Login",
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
                    <h5>Welcome Back !</h5>
                    <p class="text-muted">Sign in to continue to Samply.</p>
                  </div>

                  <div class="mt-4 pt-3">
                    <form>
                      <div class="mb-3">
                        <label for="username" class="fw-semibold"
                          >Username</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="username"
                          placeholder="Enter username"
                        />
                      </div>

                      <div class="mb-3 mb-4">
                        <label for="userpassword" class="fw-semibold"
                          >Password</label
                        >
                        <input
                          type="password"
                          class="form-control"
                          id="userpassword"
                          placeholder="Enter password"
                        />
                      </div>

                      <div class="row align-items-center">
                        <div class="col-6">
                          <div class="form-check">
                            <input
                              type="checkbox"
                              class="form-check-input font-size-16"
                              id="remember-check"
                            />
                            <label class="form-check-label" for="remember-check"
                              >Remember me</label
                            >
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="text-end">
                            <button
                              class="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >
                              Log In
                            </button>
                          </div>
                        </div>
                      </div>

                      <div class="mt-4">
                        <router-link to="/auth/recoverpwd-1" class="text-muted"
                          ><i class="mdi mdi-lock me-1"></i> Forgot your
                          password?</router-link
                        >
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
              Don't have an account ?
              <router-link
                to="/auth/register-1"
                class="fw-semibold text-decoration-underline text-primary"
              >
                Sign up
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
