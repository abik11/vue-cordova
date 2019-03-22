<template>
   <transition name="fade" mode="out-in">
      <v-layout align-center justify-center column fill-height>
         <div class="text-xs-center">
            <v-btn outline color="primary" @click="scanCode">{{$t('common.scan')}}</v-btn>
         </div>
         <div class="text-xs-center">
            <flashing-label :text="scanned" />
            <error-label :error="error" />
         </div>
      </v-layout>
   </transition>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorMixin from '../core/errorMixin';
   import FlashingLabel from '../components/flashingLabel.vue';
   import ErrorLabel from '../components/errorLabel.vue';

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
            this.$device.scanBarcode(
               this.onScanned,
               this.basicErrorHandler
            );
         },
         onScanned(result) {
            this.scanned = result.text;
            this.error = '';
         }
      }
   }
</script>