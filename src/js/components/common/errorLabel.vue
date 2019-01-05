<template>
   <transition appear
               name="custom-classes-transition"
               enter-active-class="animated flash"
               leave-active-class="animated fadeOut">
      <span v-show="error.length > 0" style="color:darkred;"><strong>{{error}}</strong></span>
   </transition>
</template>

<script>
   export default {
      name: 'errorLabel',
      props: {
         error: {
            type: String,
            default: ''
         }
      }
   }
</script>