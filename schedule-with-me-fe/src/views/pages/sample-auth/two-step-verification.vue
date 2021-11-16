<script>
import CodeInput from "vue-verification-code-input";
import appConfig from "@/app.config";

/**
 * Two-step-verification component
 */
export default {
  page: {
    title: "Two Step Verification",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    CodeInput
  }
}
</script>

<template>
    <div class="account-pages my-5 pt-sm-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="text-center mb-5 text-muted">
                        <router-link to="/" class="auth-logo">
                            <img src="@/assets/images/logo-dark.png" alt="" height="28" class="auth-logo-dark">
                            <img src="@/assets/images/logo-light.png" alt="" height="28" class="auth-logo-light">
                        </router-link>
                        <p class="font-size-15 text-muted mt-3">Responsive <b>Bootstrap 5</b> Admin Dashboard</p>
                    </div>
                </div>
            </div>
            <!-- end row -->
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card">
                        <div class="card-body">
                            <div class="p-2">
                                <div class="text-center">

                                    <div class="avatar-md mx-auto">
                                        <div class="avatar-title rounded-circle bg-light">
                                            <i class="bx bxs-envelope h1 mb-0 text-primary"></i>
                                        </div>
                                    </div>
                                    <div class="p-2 mt-4">
                                        <h4>Verify your email</h4>
                                        <p class="mb-5 text-muted">Please enter the 6 digit code sent to <span
                                                class="font-weight-semibold">example@abc.com</span></p>

                                        <form>
                                            <CodeInput :loading="false" class="input ms-3" />
                                        </form>

                                        <div class="mt-4">
                                            <router-link to="/" class="btn btn-success w-md">Confirm</router-link>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- end card -->
                    <div class="mt-5 text-center">
                        <p>Didn't receive a code ? <a href="#" class="fw-semibold text-decoration-underline text-primary"> Resend </a> </p>
                        <p>© {{ new Date().getFullYear() }} <b>Samply</b>. Crafted with <i class="mdi mdi-heart text-danger"></i> by Pichforest</p>
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