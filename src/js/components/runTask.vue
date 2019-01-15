<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <button @click="start">{{$t('run_task.start_task')}}</button>
         <br />
         <br />
         <button @click="stop">{{$t('run_task.stop_task')}}</button>
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
         start() {
            cordova.plugins.backgroundMode.enable();
         },
         stop() {
            cordova.plugins.backgroundMode.disable();
         }
      },
      mounted() {
         cordova.plugins.backgroundMode.on('enable', function () {
            setInterval(function () {
               cordova.plugins.backgroundMode.wakeUp(); //in progress...
            }, 5000);
         });
      }
   }
</script>