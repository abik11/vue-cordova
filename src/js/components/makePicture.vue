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
      }
   }
</script>