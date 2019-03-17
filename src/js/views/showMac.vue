<template>
   <transition name="fade" mode="out-in">
      <v-layout align-center justify-center column>
         <v-flex xs12 text-xs-center>
            <p>{{macAddress}}</p>
         </v-flex>
      </v-layout>
</transition>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorMixin from '../core/errorMixin';

   export default {
      name: 'showMac',
      mixins: [ErrorMixin],
      data: function () {
         return {
            macAddress: '',
            sharedData: DataStore.state
         }
      },
      watch: {
         macAddress: (newValue, oldValue) => {
            console.log(newValue);
            console.log(this.$i18n.t('show_mac.cannot_get_mac'));
            if (newValue == 'error')
               this.macAddress = this.$i18n.t('show_mac.cannot_get_mac');
         }
      },
      mounted() {
         this.$device.getMacAddress(mac => this.macAddress = mac);
      }
   }
</script>