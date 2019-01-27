<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <p>{{macAddress}}</p>
      </div>
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
      mount() {
         this.$device.getMacAddress(mac => this.macAddress = mac);
      }
   }
</script>