<script>
import appConfig from "@/app.config";

/**
 * Register-1 component
 */
export default {
  page: {
    title: "Register",
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
                    <h5>Register account</h5>
                    <p class="text-muted">Get your free Samply account now.</p>
                  </div>

                  <div class="mt-4 pt-3">
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

                      <div class="mb-3">
                        <label class="fw-semibold" for="username"
                          >Username</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="username"
                          placeholder="Enter username"
                        />
                      </div>

                      <div class="mb-3">
                        <label class="fw-semibold" for="userpassword"
                          >Password</label
                        >
                        <input
                          type="password"
                          class="form-control"
                          id="userpassword"
                          placeholder="Enter password"
                        />
                      </div>

                      <div class="mt-4 text-end">
                        <button
                          class="btn btn-primary w-md waves-effect waves-light"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>

                      <div class="mt-4 text-center">
                        <p class="mb-0 text-muted">
                          By registering you agree to the Samply
                          <a
                            href="#"
                            class="text-primary fw-semibold text-decoration-underline"
                            >Terms of Use</a
                          >
                        </p>
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
              Already have an account ?
              <router-link 
                to="/auth/login-1"
                class="fw-semibold text-decoration-underline"
              >
                Login
              </router-link>
            </p>
            <p>
              © {{ new Date().getFullYear() }}
              <b>Samply</b>. Crafted with
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
