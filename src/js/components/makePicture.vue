<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <button @click="captureImage">{{$t('make_picture.make_picture')}}</button>
         <br />
         <img class=".img" v-if="imageUri.length != 0" :src="imageUri" />
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
         }
         //tmp() {
         //   var snImage = new Promise(function (resolve, reject) {
         //      that.$device.readFile(that.snPicture, e => resolve(btoa(e.target.result)), () => reject());
         //   });
         //   var itemImage = new Promise(function (resolve, reject) {
         //      that.$device.readFile(that.itemPicture, e => resolve(btoa(e.target.result)), () => reject());
         //   });
         //}
      }
   }
</script>

<style lang="scss" scoped>
   .img {
      width: 800px;
      height: 600px;
   }
</style>