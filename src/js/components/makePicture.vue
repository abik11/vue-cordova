<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <button @click="captureImage">{{$t('make_picture.make_picture')}}</button>
         <br />
         <div v-if="imageUri.length != 0">
            <img class=".img" :src="imageUri" />
            <br />
            <input type="text" :placeholder="$t('send_message.phone_number')" v-model="phoneNumber" />
            <br />
            <button @click="sendImage">{{$t('common.send')}}</button>
            <br />
            <flashing-label :text="feedback" />
            <error-label :error="error" />
         </div>
      </div>
   </transition>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorMixin from '../core/errorMixin';
   import ErrorLabel from '../components/common/errorLabel.vue';
   import FlashingLabel from '../components/common/flashingLabel.vue';

   export default {
      name: 'makePicture',
      mixins: [ErrorMixin],
      components: { ErrorLabel, FlashingLabel },
      data: function () {
         return {
            imageUri: '',
            phoneNumber: '',
            feedback: '',
            error: '',
            sharedData: DataStore.state
         }
      },
      methods: {
         captureImage() {
            this.$device.getPicture
               (imageUri => this.imageUri = imageUri);
         },
         getImageAsBase64() {
            // You can get image as base64 straight from the cordova-plugin-camera 
            // by setting the destinationType to DATA_URL, but here it is done a bit
            // longer way just to present how to work with cordova-plugin-file.
            // Remember that working with very long base64 strings is quite 
            // memory consuming so if it is possible to use FILE_URI option,
            // it is much better to use it.

            return new Promise((resolve, reject) => {
               this.$device.readFile
                  (this.imageUri, e => resolve(btoa(e.target.result)), () => reject());
            });
         },
         sendImage() {
            this.getImageAsBase64()
               .then(imgBase64 => {
                  this.$device.sendMms(
                     this.phoneNumber,
                     this.$i18n.t('make_picture.picture_here'),
                     `data:image/jpeg;base64,${imgBase64}`,
                     this.onPictureSent,
                     this.basicErrorHandler,
                     'INTENT'
                  );
               });
         },
         onPictureSent() {
            console.log("MMS has been sent");
            this.feedback = this.$i18n.t('make_picture.picture_sent');
            this.error = '';
         }
      }
   }
</script>

<style lang="scss" scoped>
   .img {
      width: 800px;
      height: 600px;
   }
</style>
