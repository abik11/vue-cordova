require.context("../img/", true, /\.(jpe?g|png|gif|svg)$/i);
require('es6-promise').polyfill();
import Polyfill from './core/es6-polyfill.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCordova from './device/vue-cordova.js';
import VueI18n from 'vue-i18n';
import Locale from './language/vue-i18n-locales.js';
import '../css/index.scss';
//---
import Home from './components/home.vue';
import ScanBarcode from './components/scanBarcode.vue';
import ShowMac from './components/showMac.vue';

(function () {
   "use strict";

   document.addEventListener('deviceready', onDeviceReady.bind(this), false);

   function onDeviceReady() {
      document.addEventListener('pause', onPause.bind(this), false);
      document.addEventListener('resume', onResume.bind(this), false);
      
      Polyfill.objectAssign();
      Vue.use(VueRouter);
      Vue.use(VueCordova);
      Vue.use(VueI18n);

      const router = new VueRouter({
         base: __dirname,
         routes: [
            { path: '/', component: Home },
            { path: '/scan', component: ScanBarcode },
            { path: '/mac', component: ShowMac }
         ]
      });

      const i18n = new VueI18n({
         locale: 'en',
         fallbackLocale: 'en',
         messages: Locale
      });

      new Vue({ router, i18n }).$mount("#app");
   }

   function onPause() { }
   function onResume() { }
})();
