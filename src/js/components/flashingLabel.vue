<template>
   <transition name="label">
      <span v-show="text.length > 0">{{text}}</span>
   </transition>
</template>

<script>
   export default {
      name: 'flashingLabel',
      props: {
         text: {
            type: String,
            default: ''
         }
      }
   }
</script>