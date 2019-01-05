<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <button @click="scanCode">{{$t('common.scan')}}</button>
         <br />
         <flashing-label :text="scanned" />
         <error-label :error="error" />
      </div>
   </transition>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorMixin from '../core/errorMixin';
   import FlashingLabel from './common/flashingLabel.vue';
   import ErrorLabel from './common/errorLabel.vue';

   export default {
      name: 'scanBarcode',
      components: { FlashingLabel, ErrorLabel },
      mixins: [ErrorMixin],
      data: function () {
         return {
            scanned: '',
            error: '',
            sharedData: DataStore.state
         }
      },
      methods: {
         scanCode() {
            cordova.plugins.barcodeScanner.scan(
               this.onScanned,
               this.basicErrorHandler,
               this.$device.getBarcodeScannerConfig()
            );
         },
         onScanned(result) {
            this.scanned = result.text;
            this.error = '';
         }
      }
   }
</script>