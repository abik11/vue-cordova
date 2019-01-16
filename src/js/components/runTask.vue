<template>
   <transition appear name="custom-classes-transition" enter-active-class="animated fadeIn">
      <div>
         <button v-if="!taskActive" @click="start">{{$t('run_task.start_task')}}</button>
         <button v-else="taskActive" @click="stop">{{$t('run_task.stop_task')}}</button>
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
            cordova.plugins.backgroundMode.overrideBackButton();
            cordova.plugins.backgroundMode.excludeFromTaskList();
            cordova.plugins.backgroundMode.on('enable', this.bgAction);
            this.taskActive = true;
         },
         stop() {
            cordova.plugins.backgroundMode.disable();
            this.taskActive = false;
         },
         bgAction() {
            setInterval(() => {
               cordova.plugins.backgroundMode.moveToForeground();
               //cordova.plugins.notification.local.schedule({
               //   title: 'Vue-Cordova Notification',
               //   text: 'This notification comes from the background task.',
               //   foreground: true
               //});
            }, 5000);
         }
      },
      mounted() {
         this.taskActive = cordova.plugins.backgroundMode.isActive();
      }
   }
</script>