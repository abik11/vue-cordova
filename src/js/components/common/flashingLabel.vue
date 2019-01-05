<template>
   <transition appear
               name="custom-classes-transition"
               enter-active-class="animated flash"
               leave-active-class="animated fadeOut">
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