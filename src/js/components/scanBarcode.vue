<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <p>Barcode Scanner</p>
      </div>
   </transition>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorMixin from '../core/errorMixin';

   export default {
      name: 'scanBarcode',
      mixins: [ErrorMixin],
      data: function () {
         return {
            scanned: '',
            sharedData: DataStore.state
         }
      }
   }
</script>