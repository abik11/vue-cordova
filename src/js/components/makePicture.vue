<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <p>Make picture</p>
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
            sharedData: DataStore.state
         }
      },
      //methods: {
      //   captureImage() {
      //      this.$device.getPicture(this.parseImage);
      //   },
      //   parseImage(imageUri) {
      //      this.imageUri = imageUri;
      //      this.$emit('image-changed', this.imageUri);
      //   },
      //   tmp() {
      //      var snImage = new Promise(function (resolve, reject) {
      //         that.$device.readFile(that.snPicture, e => resolve(btoa(e.target.result)), () => reject());
      //      });
      //      var itemImage = new Promise(function (resolve, reject) {
      //         that.$device.readFile(that.itemPicture, e => resolve(btoa(e.target.result)), () => reject());
      //      });
      //   }
      //}
   }
</script>