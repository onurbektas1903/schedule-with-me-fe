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


const configs = {
  keycloakURL: process.env.VUE_APP_KEYCLOAK_AUTH_URL,
  clientId: process.env.VUE_APP_CLIENT_ID,
  realm: process.env.VUE_APP_REALM,
  wsUrl:  process.env.VUE_APP_WS_URL
};

import "@/assets/scss/app.scss";
import Keycloak from "keycloak-js";
import SocketApi from "@/helpers/backend/socket-api";

Vue.component('VueSlideBar', VueSlideBar)
Vue.use(VueSweetalert2);
Vue.component('apexchart', VueApexCharts)
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(vco)

Vue.config.productionTip = false
const keyCloakObj = {
  realm: configs.realm,
  url: configs.keycloakURL ,
  clientId: configs.clientId,
  onLoad: 'login-required'
};
//TODO keycloakı servis haline getirerek çağrıldığı yerleri refactor et
let keycloak = new Keycloak(keyCloakObj);
keycloak.init({onLoad: keyCloakObj.onLoad}).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    //TODO keycloak'ı servis haline getirince bu kısmı sil
    window.keycloakObj = keycloak;
    let roleGroups = [];
    keycloak.idTokenParsed.user_group_info.forEach(grp=>{
      roleGroups.push(grp);
    })
    let user = {
      id: keycloak.idTokenParsed.email,
      username: keycloak.idTokenParsed.preferred_username,
      name: keycloak.idTokenParsed.preferred_username,
      email: keycloak.idTokenParsed.email,
      token: keycloak.token,
      roleGroups: roleGroups,
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


