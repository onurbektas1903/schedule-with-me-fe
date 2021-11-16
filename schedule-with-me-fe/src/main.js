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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
