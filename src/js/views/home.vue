<template>
   <v-layout column class="footer-spacer">
      <v-flex xs12>
         <v-toolbar color="primary">
            <v-toolbar-title>vue-cordova</v-toolbar-title>
            <v-spacer></v-spacer>
            <transition name="bounce" mode="out-in">
               <v-icon v-if="networkOn" key="wifi">wifi</v-icon>
               <v-icon v-else key="wifi_off">wifi_off</v-icon>
            </transition>
         </v-toolbar>
      </v-flex>

      <v-flex xs12>
         <v-list two-line>
            <template v-for="(view, index) in views">
               <router-link :to="view.link">
                  <v-list-tile :key="index">
                     <v-list-tile-content>
                        <v-list-tile-title>{{ $t(view.name) }}</v-list-tile-title>
                     </v-list-tile-content>
                  </v-list-tile>
               </router-link>
               <v-divider :key="-index"></v-divider>
            </template>
            <v-list-tile @click="clear">
               <v-list-tile-content>
                  <v-list-tile-title>{{ $t('home.clear_data') }}</v-list-tile-title>
               </v-list-tile-content>
            </v-list-tile>
         </v-list>
      </v-flex>

      <v-footer fixed height="auto">
         <v-card flat tile class="pa-3" color="secondary" style="width: 100%;">
            <v-layout align-center justify-center fill-height>
               <v-flex xs7>
                  <language />
               </v-flex>
               <v-flex xs5 class="grey--text text--darken-1 text-xs-right">
                  {{$t('home.app_ver')}}: {{sharedData.appVersion}}<br />
                  {{$t('home.time_elapsed')}}: {{timeElapsed}}
               </v-flex>
            </v-layout>
         </v-card>
      </v-footer>
   </v-layout>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorMixin from '../core/errorMixin';
   import ClearMixin from '../core/clearMixin';
   import Language from '../language/language.vue';

   export default {
      name: 'home',
      components: { Language },
      mixins: [ErrorMixin, ClearMixin],
      data: function () {
         return {
            views: [
               { name: 'home.scan_barcode', link: '/scan' },
               { name: 'home.show_mac', link: '/mac' },
               { name: 'home.make_picture', link: '/picture' },
               { name: 'home.send_message', link: '/sms' },
               { name: 'home.run_bg_task', link: '/runtask' }
            ],
            networkOn: false,
            timeElapsed: 0,
            sharedData: DataStore.state
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

<style lang="scss" scoped>
   .v-list a {
      text-decoration: none;
      color: black;
   }
</style>