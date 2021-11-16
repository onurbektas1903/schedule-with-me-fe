<script>
import appConfig from "@/app.config";

/**
 * Coming-soon component
 */
export default {
  page: {
    title: "Coming Soon",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      start: "",
      end: "",
      interval: "",
      days: "",
      minutes: "",
      hours: "",
      seconds: "",
      starttime: "Oct 5, 2020 15:37:25",
      endtime: "Apr 8, 2022 16:37:25",
    };
  },
  mounted() {
    this.start = new Date(this.starttime).getTime();
    this.end = new Date(this.endtime).getTime();
    // Update the count down every 1 second
    this.timerCount(this.start, this.end);
    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end);
    }, 1000);
  },
  methods: {
    timerCount: function(start, end) {
      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = start - now;
      var passTime = end - now;

      if (distance < 0 && passTime < 0) {
        clearInterval(this.interval);
        return;
      } else if (distance < 0 && passTime > 0) {
        this.calcTime(passTime);
      } else if (distance > 0 && passTime > 0) {
        this.calcTime(distance);
      }
    },
    calcTime: function(dist) {
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
    },
  },
};
</script>

<template>
  <div class="my-5 pt-sm-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="text-center mb-5">
            <router-link to="/" class="auth-logo">
              <img
                src="@/assets/images/logo-dark.png"
                alt=""
                height="24"
                class="auth-logo-dark"
              />
              <img
                src="@/assets/images/logo-light.png"
                alt=""
                height="24"
                class="auth-logo-light"
              />
            </router-link>
            <p class="font-size-15 text-muted mt-3">
              Responsive <strong>Bootstrap 5</strong> Admin Dashboard
            </p>
          </div>
          <div class="card overflow-hidden">
            <div class="row g-0">
              <div class="col-lg-6  order-2 order-lg-1">
                <div class="p-lg-5 p-4">
                  <h5>Let's get started with Samply</h5>
                  <p class="font-size-15 text-muted">
                    It will be as simple as in fact it will be occidental.
                  </p>

                  <div class="mt-5">
                    <div
                      data-countdown="2022/08/04"
                      class="counter-number"
                    ></div>
                    <div data-countdown="2022/08/04" class="counter-number">
                      <div class="coming-box">
                        {{ days }}
                        <span>Days</span>
                      </div>
                      <div class="coming-box">
                        {{ hours }}
                        <span>Hours</span>
                      </div>
                      <div class="coming-box">
                        {{ minutes }}
                        <span>Minutes</span>
                      </div>
                      <div class="coming-box">
                        {{ seconds }}
                        <span>Seconds</span>
                      </div>
                    </div>
                  </div>

                  <div class="input-section mt-5">
                    <div class="row">
                      <div class="col">
                        <div class="position-relative">
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Enter email address..."
                          />
                        </div>
                      </div>
                      <div class="col-auto">
                        <button
                          type="submit"
                          class="btn btn-primary w-md waves-effect waves-light"
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 order-1 order-lg-2">
                <div class="p-lg-5 p-4 bg h-100">
                  <div class="comingsoon-img">
                    <img
                      src="@/assets/images/coming-soon-img.png"
                      alt=""
                      class="img-fluid mx-auto d-block"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
