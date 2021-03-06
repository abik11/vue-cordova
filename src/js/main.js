﻿require.context("../img/", true, /\.(jpe?g|png|gif|svg)$/i);
require('es6-promise').polyfill();
import Polyfill from './core/es6-polyfill.js';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import VueCordova from './device/vue-cordova.js';
import VueI18n from 'vue-i18n';
import Locale from './language/vue-i18n-locales.js';
import '../css/main.scss';
import theme from './theme.js';
//---
import App from './app.vue';
import Home from './views/home.vue';
import ScanBarcode from './views/scanBarcode.vue';
import ShowMac from './views/showMac.vue';
import MakePicture from './views/makePicture.vue';
import SendMessage from './views/sendMessage.vue';
import RunTask from './views/runTask.vue';

(function () {
   "use strict";

   document.addEventListener('deviceready', onDeviceReady.bind(this), false);

   function onDeviceReady() {
      document.addEventListener('pause', onPause.bind(this), false);
      document.addEventListener('resume', onResume.bind(this), false);
      
      Polyfill.objectAssign();
      Vue.use(Vuetify, { theme, iconfont: 'mdi' });
      Vue.use(VueRouter);
      Vue.use(VueCordova);
      Vue.use(VueI18n);

      const router = new VueRouter({
         base: __dirname,
         routes: [
            { path: '/', component: Home },
            { path: '/scan', component: ScanBarcode },
            { path: '/mac', component: ShowMac },
            { path: '/picture', component: MakePicture },
            { path: '/sms', component: SendMessage  },
            { path: '/runtask', component: RunTask }
         ]
      });

      const i18n = new VueI18n({
         locale: 'en',
         fallbackLocale: 'en',
         messages: Locale
      });

      new Vue({ components: { App }, router, i18n }).$mount("#app");
   }

   function onPause() { }
   function onResume() { }
})();
