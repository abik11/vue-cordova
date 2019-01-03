<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <p>{{$t('home.app_ver')}}: {{sharedData.appVersion}}</p>
         <p>{{$t('home.wifi_status')}}: {{wifiStatus}}</p>
         <p>{{$t('home.time_elapsed')}}: {{timeElapsed}}</p>
         <p><router-link to="/scan">{{$t('home.scan_barcode')}}</router-link></p>
         <p><router-link to="/mac">{{$t('home.show_mac')}}</router-link></p>
         <p><a href="#">{{$t('home.clear_data')}}</a></p>
         <language />
      </div>
   </transition>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorMixin from '../core/errorMixin';
   import Language from '../language/language.vue';

   export default {
      name: 'home',
      components: {Language},
      mixins: [ErrorMixin],
      data: function () {
         return {
            timeElapsed: 0,
            sharedData: DataStore.state
         }
      },
      computed: {
         wifiStatus() {
            var key = this.$device.checkWifiConnection() ? 'on' : 'off'; 
            return this.$t(`common.${key}`);
         }
      },
      methods: {},
      mounted() {
         setInterval(() => this.timeElapsed++, 1000);
      }
   }
</script>