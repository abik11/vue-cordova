<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <button @click="captureImage">{{$t('make_picture.make_picture')}}</button>
         <br />
         <div v-if="imageUri.length != 0">
            <img class=".img" :src="imageUri" />
            <br />
            <button @click="sendImage">{{$t('common.send')}}</button>
         </div>
      </div>
   </transition>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorMixin from '../core/errorMixin';

   export default {
      name: 'makePicture',
      mixins: [ErrorMixin],
      data: function () {
         return {
            imageUri: '',
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

            var image = new Promise((resolve, reject) => {
               this.$device.readFile(this.imageUri, e => resolve(btoa(e.target.result)), () => reject());
            });

            image.then(imageBase64 => {
               console.log(imageBase64);
            });
         },
         sendImage() {
            this.getImageAsBase64();
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