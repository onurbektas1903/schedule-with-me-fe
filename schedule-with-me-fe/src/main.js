import Vue from 'vue';
import App from './App.vue';
import router from './router';

import i18n from './i18n'

import vco from "v-click-outside"
import VueSlideBar from 'vue-slide-bar'
import BootstrapVue from 'bootstrap-vue';
import VueApexCharts from 'vue-apexcharts'
import Vuelidate from 'vuelidate'
import store from '@/state/store';
import VueSweetalert2 from 'vue-sweetalert2';
import * as VueGoogleMaps from 'vue2-google-maps'

import { initFirebaseBackend } from './helpers/firebase/authUtils';
import { configureFakeBackend } from './helpers/fakebackend/fake-backend';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTId,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPId,
  measurementId: process.env.VUE_APP_MEASUREMENTID
};

if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
  initFirebaseBackend(firebaseConfig);
} else {
  configureFakeBackend();
}

import "@/assets/scss/app.scss";
import Keycloak from "keycloak-js";
import SocketApi from "@/helpers/fakebackend/socket-api";
import Toasted from 'vue-toasted';

Vue.component('VueSlideBar', VueSlideBar)
Vue.use(VueSweetalert2);
Vue.component('apexchart', VueApexCharts)
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(vco)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE',
    libraries: 'places',
  },
  installComponents: true
});
Vue.use(Toasted, {
  duration: 1000,
  position: 'top-center'
})

Vue.config.productionTip = false
const keyCloakObj = {
  realm: 'obss-scheduler',
  url: 'http://localhost:8888/auth',
  clientId: 'schedule-app-fe',
  onLoad: 'login-required'
};
let keycloak = new Keycloak(keyCloakObj);

keycloak.init({onLoad: keyCloakObj.onLoad}).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    let user = {
      id: keycloak.idTokenParsed.email,
      username: keycloak.idTokenParsed.preferred_username,
      name: keycloak.idTokenParsed.preferred_username,
      email: keycloak.idTokenParsed.email,
      token: keycloak.token,
      roles: keycloak.resourceAccess['schedule-app-be'].roles
    }
    var socket = new SocketApi("http://localhost:8080/websocket");
    socket.connect();
//Token Refresh
    setInterval(() => {
      keycloak.updateToken(70).then((refreshed) => {
        if (refreshed) {

          user.token = keycloak.token;
          sessionStorage.setItem("authUser", JSON.stringify(user));

        } else {
          console.log('Token not refreshed, valid for '
              + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
        }
      }).catch(() => {
        console.log('Failed to refresh token');
      });
    }, 6000)
    sessionStorage.setItem("authUser", JSON.stringify(user));
    new Vue({
      router,
      store,
      i18n,
      render: h => h(App)
    }).$mount('#app')
      console.log("Authenticated");
  }
}).catch(reason => {
  debugger;
  console.log(reason);
});


