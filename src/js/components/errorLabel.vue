<template>
   <transition name="label">
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