<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <button @click="captureImage">{{$t('make_picture.make_picture')}}</button>
         <br />
         <div v-if="imageUri.length != 0">
            <img class=".img" :src="imageUri" />
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
            // You can get image as base64 straight from the 
            // cordova-plugin-camera but here it is done a bit 
            // longer way just to present how to work with cordova-plugin-file

            return new Promise((resolve, reject) => {
               this.$device.readFile
                  (this.imageUri, e => resolve(btoa(e.target.result)), () => reject());
            });
         },
         sendImage() {
            this.getImageAsBase64()
               .then(imgBase64 => {
                  this.$device.sendMms(
                     '797026001',
                     'Here is a picture',
                     `data:image/jpeg;base64,${imgBase64}`,
                     this.onPictureSent,
                     e => console.log(e)
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