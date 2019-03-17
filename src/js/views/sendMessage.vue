<template>
   <transition name="fade" mode="out-in">
      <v-layout row wrap fill-height>
         <v-flex xs12 text-xs-center>
            <v-text-field outline
                          v-model="phoneNumber"
                          :label="$t('send_message.phone_number')"
                          prepend-inner-icon="phone">
            </v-text-field>
         </v-flex>
         <v-flex xs12 text-xs-center>
            <v-textarea outline
                        auto-grow
                        :label="$t('send_message.enter_message')"
                        v-model="message">
            </v-textarea>
         </v-flex>
         <v-flex xs12 text-xs-center>
            <v-btn outline color="primary" @click="send">{{$t('common.send')}}</v-btn>
         </v-flex>
         <v-flex xs12 text-xs-center>
            <flashing-label :text="feedback" />
            <error-label :error="error" />
         </v-flex>
      </v-layout>
   </transition>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorMixin from '../core/errorMixin';
   import ErrorLabel from '../components/errorLabel.vue';
   import FlashingLabel from '../components/flashingLabel.vue';

   export default {
      name: 'sendMessage',
      mixins: [ErrorMixin],
      components: {ErrorLabel, FlashingLabel},
      data: function () {
         return {
            phoneNumber: '',
            message: '',
            feedback: '',
            error: '',
            sharedData: DataStore.state
         }
      },
      methods: {
         send() {
            this.$device.sendSms(
               this.phoneNumber,
               this.message,
               this.onMessageSent,
               this.basicErrorHandler
            );
         },
         onMessageSent() {
            console.log("SMS has been sent");
            this.feedback = this.$i18n.t('send_message.message_sent');
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