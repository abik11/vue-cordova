<template>
   <v-app>
      <transition name="fade" mode="out-in">
         <router-view></router-view>
      </transition>
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