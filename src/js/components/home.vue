<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <h1>{{$t('common.hello_world')}}</h1>
         <p>{{sharedData.appVersion}}</p>
         <router-link to="/mac">Show MAC</router-link>
      </div>
   </transition>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorMixin from '../core/errorMixin';

   export default {
      name: 'home',
      mixins: [ErrorMixin],
      data: function () {
         return {
            sharedData: DataStore.state
         }
      },
      computed: {},
      methods: {},
      mounted() {
         window.setInterval(() => console.log('.'), 1000);
      }
   }
</script>