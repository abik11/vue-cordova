<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <p>{{$t('home.app_ver')}}: {{sharedData.appVersion}}</p>
         <p>{{$t('home.wifi_status')}}: {{wifiStatus}}</p>
         <p>{{$t('home.time_elapsed')}}: {{timeElapsed}}</p>
         <p><router-link to="/scan">{{$t('home.scan_barcode')}}</router-link></p>
         <p><router-link to="/mac">{{$t('home.show_mac')}}</router-link></p>
         <p><router-link to="/picture">{{$t('home.make_picture')}}</router-link></p>
         <p><router-link to="/sms">{{$t('home.send_message')}}</router-link></p>
         <p><router-link to="/runtask">{{$t('home.run_bg_task')}}</router-link></p>
         <p><a href="#" @click="clear">{{$t('home.clear_data')}}</a></p>
         <language />
      </div>
   </transition>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorMixin from '../core/errorMixin';
   import ClearMixin from '../core/clearMixin';
   import Language from '../language/language.vue';

   export default {
      name: 'home',
      components: {Language},
      mixins: [ErrorMixin, ClearMixin],
      data: function () {
         return {
            networkOn: false,
            timeElapsed: 0,
            sharedData: DataStore.state
         }
      },
      computed: {
         wifiStatus() {
            var key = this.networkOn ? 'on' : 'off'; 
            return this.$t(`common.${key}`);
         }
      },
      methods: {
         checkWifi() {
            this.networkOn = this.$device.checkWifiConnection();
         }
      },
      mounted() {
         setInterval(() => this.timeElapsed++, 1000);
         setInterval(() => this.checkWifi(), 1000);
      }
   }
</script>