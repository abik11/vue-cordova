<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <button v-if="!sharedData.taskActive" @click="start">{{$t('run_task.start_task')}}</button>
         <button v-else="sharedData.taskActive" @click="stop">{{$t('run_task.stop_task')}}</button>
         <br />
         <p>{{$t('run_task.task_desc')}}</p>
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
            this.sharedData.taskHandler = setInterval
               (() => cordova.plugins.backgroundMode.moveToForeground(), 5000);
            this.sharedData.taskActive = true;
            console.log('Bg mode started');
         },
         endBgAction() {
            clearInterval(this.sharedData.taskHandler);
            cordova.plugins.backgroundMode.un('enable', this.startBgAction);
            cordova.plugins.backgroundMode.un('disable', this.endBgAction);
            this.sharedData.taskActive = false;
            console.log('Bg mode stoped');
         }
      }
   }
</script>