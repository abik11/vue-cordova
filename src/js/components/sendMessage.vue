<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <input type="text" :placeholder="$t('send_message.phone_number')" v-model="phoneNumber" />
         <br />
         <textarea :placeholder="$t('send_message.enter_message')" v-model="message"></textarea>
         <br />
         <button @click="send">{{$t('common.send')}}</button>
         <br />
         <flashing-label :text="feedback" />
         <error-label :error="error" />
      </div>
   </transition>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorMixin from '../core/errorMixin';
   import ErrorLabel from '../components/common/errorLabel.vue';
   import FlashingLabel from '../components/common/flashingLabel.vue';

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
            sms.send(
               this.phoneNumber,
               this.message,
               this.$device.getSmsConfig(),
               () => {
                  this.feedback = this.$i18n.t('send_message.message_sent');
                  console.log("SMS has been sent");
                  this.message = '';
                  this.error = '';
               },
               this.basicErrorHandler
            );
         }
      }
   }
</script>