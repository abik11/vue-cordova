<template>
   <router-view></router-view>
</template>

<script>
   import DataStore from './core/dataStore';

   export default {
      name: 'app',
      data: function () {
         return {
            sharedData: DataStore.state
         }
      },
      methods: {
      }
   }
</script>