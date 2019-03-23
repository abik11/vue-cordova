<template>
   <v-layout align-center justify-center column fill-height>
      <div class="text-xs-center">
         <p>{{macAddress}}</p>
      </div>
   </v-layout>
</template>

<script>
   import DataStore from '../core/dataStore';

   export default {
      name: 'showMac',
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