<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <p>Run task</p>
      </div>
   </transition>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorMixin from '../core/errorMixin';

   export default {
      name: 'runTask',
      mixins: [ErrorMixin],
      data: function () {
         return {
            sharedData: DataStore.state
         }
      },
      methods: {
      }
   }
</script>