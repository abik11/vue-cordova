<template>
   <v-app>
      <router-view></router-view>
   </v-app>
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