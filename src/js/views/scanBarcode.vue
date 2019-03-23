<template>
   <v-layout align-center justify-center column fill-height>
      <v-snackbar v-model="errorToast" color="error" right top :timeout="errorToastTimeout">
         {{ error }}
         <v-btn color="secondary" flat @click="clearError">{{ $t('common.close') }}</v-btn>
      </v-snackbar>
      <div class="text-xs-center">
         <v-btn outline color="primary" @click="scanCode">{{$t('common.scan')}}</v-btn>
      </div>
      <div class="text-xs-center">
         <p>{{ scanned }}</p>
      </div>
   </v-layout>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorToastMixin from '../core/errorToastMixin';

   export default {
      name: 'scanBarcode',
      mixins: [ErrorToastMixin],
      data: function () {
         return {
            scanned: '',
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