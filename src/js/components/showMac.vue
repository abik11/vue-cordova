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
      beforeMount() {
         var that = this;
         this.$device.getMacAddress(mac => that.macAddress = mac);
      }
   }
</script>