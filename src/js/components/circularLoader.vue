<template>
   <div class="progress-loader">
      <v-progress-circular :size="size" :width="width" color="primary" indeterminate>
      </v-progress-circular>
   </div>
</template>
 
<script>
   export default {
      name: 'cornerLoader',
      props: {
         size: {
            type: Number,
            default: 20
         },
         width: {
            type: Number,
            default: 4
         }
      }
   }
</script>
 
<style lang="scss" scoped>
   .progress-loader {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 1000;
   }
</style>
