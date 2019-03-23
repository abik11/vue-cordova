<template>
   <v-layout align-center justify-center column fill-height>
      <v-snackbar v-model="toast" right top :timeout="toastTimeout">
         {{ $t('make_picture.picture_sent') }}
         <v-btn color="primary" flat @click="toast = false">{{ $t('common.close') }}</v-btn>
      </v-snackbar>
      <v-snackbar v-model="errorToast" color="error" right top :timeout="errorToastTimeout">
         {{ error }}
         <v-btn color="secondary" flat @click="clearError">{{ $t('common.close') }}</v-btn>
      </v-snackbar>

      <div class="text-xs-center">
         <v-btn outline color="primary" @click="captureImage">{{$t('make_picture.make_picture')}}</v-btn>
      </div>
      <div v-if="imageUri.length != 0" class="text-xs-center">
         <v-layout column>
            <v-flex xs12>
               <img class="img" :src="imageUri" />
            </v-flex>
            <v-flex xs12 text-xs-center>
               <v-text-field outline
                             v-model="phoneNumber"
                             :label="$t('send_message.phone_number')"
                             prepend-inner-icon="phone">
               </v-text-field>
            </v-flex>
            <v-flex xs12 text-xs-center>
               <v-btn outline color="primary"
                      :disabled="phoneNumber.length == 0"
                      @click="sendImage">
                  {{$t('common.send')}}
               </v-btn>
            </v-flex>
         </v-layout>
      </div>
   </v-layout>
</template>

<script>
   import DataStore from '../core/dataStore';
   import ErrorToastMixin from '../core/errorToastMixin';

   export default {
      name: 'makePicture',
      mixins: [ErrorToastMixin],
      data: function () {
         return {
            toast: false,
            toastTimeout: 2000,
            imageUri: '',
            phoneNumber: '',
            sharedData: DataStore.state
         }
      },
      methods: {
         captureImage() {
            this.$device.getPicture
               (imageUri => this.imageUri = imageUri);
         },
         getImageAsBase64() {
            // You can get image as base64 straight from the cordova-plugin-camera
            // by setting the destinationType to DATA_URL, but here it is done a bit
            // longer way just to present how to work with cordova-plugin-file.
            // Remember that working with very long base64 strings is quite
            // memory consuming so if it is possible to use FILE_URI option,
            // it is much better to use it.

            return new Promise((resolve, reject) => {
               this.$device.readFile
                  (this.imageUri, e => resolve(btoa(e.target.result)), () => reject());
            });
         },
         sendImage() {
            if (this.phoneNumber == '') {
               this.error = this.$i18n.t('common.no_phone');
               return;
            }

            this.getImageAsBase64()
               .then(imgBase64 => {
                  this.$device.sendMms(
                     this.phoneNumber,
                     this.$i18n.t('make_picture.picture_here'),
                     `data:image/jpeg;base64,${imgBase64}`,
                     this.onPictureSent,
                     this.basicErrorHandler,
                     'INTENT'
                  );
               });
         },
         onPictureSent() {
            console.log("MMS has been sent");
            this.toast = true;
            this.error = '';
            localStorage.lastNumber = this.phoneNumber;
         }
      },
      mounted() {
         if (localStorage.lastNumber)
            this.phoneNumber = localStorage.lastNumber;
      }
   }
</script>

<style lang="scss" scoped>
   .img {
      max-width: 400px;
      max-height: 400px;
   }
</style>
