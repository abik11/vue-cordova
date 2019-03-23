<template>
   <v-layout align-center justify-center column fill-height>
      <v-snackbar v-model="toast" right top :timeout="toastTimeout">
         {{ $t('send_message.message_sent') }}
         <v-btn color="primary" flat @click="toast = false">{{ $t('common.close') }}</v-btn>
      </v-snackbar>
      <v-snackbar v-model="errorToast" color="error" right top :timeout="errorToastTimeout">
         {{ error }}
         <v-btn color="secondary" flat @click="clearError">{{ $t('common.close') }}</v-btn>
      </v-snackbar>
      <div class="text-xs-center">
         <v-text-field outline
                       v-model="phoneNumber"
                       :label="$t('send_message.phone_number')"
                       prepend-inner-icon="phone">
         </v-text-field>
      </div>
      <div class="text-xs-center">
         <v-textarea outline
                     auto-grow
                     :label="$t('send_message.enter_message')"
                     v-model="message">
         </v-textarea>
      </div>
      <div class="text-xs-center">
         <v-btn outline color="primary" 
                :disabled="phoneNumber.length == 0" 
                @click="send">
            {{$t('common.send')}}
         </v-btn>
      </div>
   </v-layout>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorToastMixin from '../core/errorToastMixin';

   export default {
      name: 'sendMessage',
      mixins: [ErrorToastMixin],
      data: function () {
         return {
            toast: false,
            toastTimeout: 2000,
            phoneNumber: '',
            message: '',
            sharedData: DataStore.state
         }
      },
      methods: {
         send() {
            if (this.phoneNumber == '') {
               this.error = this.$i18n.t('common.no_phone');
               return;
            }

            this.$device.sendSms(
               this.phoneNumber,
               this.message,
               this.onMessageSent,
               this.basicErrorHandler
            );
         },
         onMessageSent() {
            console.log("SMS has been sent");
            this.toast = true;
            this.message = '';
            this.error = '';
            localStorage.lastNumber = this.phoneNumber;
         }
      },
      mounted() {
         if (localStorage.lastNumber)
            this.phoneNumber = localStorage.lastNumber;
      }
   }
</script>