<template>
   <v-layout align-center justify-center column fill-height>
      <div class="text-xs-center">
         <transition name="bounce" mode="out-in">
            <v-btn v-if="!sharedData.taskActive" key="start" outline color="primary" @click="start">
               {{$t('run_task.start_task')}}
            </v-btn>
            <v-btn v-else="sharedData.taskActive" key="stop" outline color="primary" @click="stop">
               {{$t('run_task.stop_task')}}
            </v-btn>
         </transition>
         <p class="pa-3">{{$t('run_task.task_desc')}}</p>
      </div>
   </v-layout>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorMixin from '../core/errorMixin';

   export default {
      name: 'runTask',
      mixins: [ErrorMixin],
      data: function () {
         return {
            taskActive: false,
            sharedData: DataStore.state
         }
      },
      methods: {
         start() {
            cordova.plugins.backgroundMode.enable();
            cordova.plugins.backgroundMode.on('enable', this.startBgAction);
            cordova.plugins.backgroundMode.on('disable', this.endBgAction);
         },
         stop() {
            cordova.plugins.backgroundMode.disable();
         },
         startBgAction() {
            //cordova.plugins.backgroundMode.overrideBackButton();
            //cordova.plugins.backgroundMode.excludeFromTaskList();
            powerManagement.dim();

            this.sharedData.taskHandler = setInterval
               (() => cordova.plugins.backgroundMode.moveToForeground(), 5000);

            this.sharedData.taskActive = true;
            console.log('Bg mode started');
         },
         endBgAction() {
            powerManagement.setReleaseOnPause(false);
            clearInterval(this.sharedData.taskHandler);
            cordova.plugins.backgroundMode.un('enable', this.startBgAction);
            cordova.plugins.backgroundMode.un('disable', this.endBgAction);
            this.sharedData.taskActive = false;
            console.log('Bg mode stoped');
         }
      }
   }
</script>