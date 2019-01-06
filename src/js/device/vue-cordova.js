var VueCordova = {};

VueCordova.install = function (Vue, options) {
   var imageMimeType = 'image/jpeg';

   var defaults = {
      defaultErrorHandler(error) {
         console.error(error);
      },
      barcodeScannerConfig: {
         preferFrontCamera: false,
         showFlipCameraButton: false,
         prompt: "Scan barcode",
         resultDisplayDuration: 500,
         formats: "QR_CODE,DATA_MATRIX,CODE_128,CODE_39,CODE_93,UPC_E,UPC_A,EAN_8,EAN_13"
      },
      cameraConfig: {
         quality: 50,
         targetWidth: 800,
         targetHeight: 600,
         encoding: imageMimeType == 'image/jpeg' ? Camera.EncodingType.JPEG : Camera.EncodingType.PNG,
         correctOrientation: false,
         saveToPhotoAlbum: false,
         destinationType: Camera.DestinationType.FILE_URI
      }
   };

   var device = {
      getMacAddress: function (success, error) {
         if (typeof (error) === 'undefined')
            error = defaults.defaultErrorHandler;
         cordova.exec(success, error, 'getmac', 'getMacAddress', []);
      },

      getBarcodeScannerConfig() {
         return defaults.barcodeScannerConfig;
      },

      checkWifiConnection() {
         return navigator.connection.type == Connection.WIFI;
      },

      getCameraConfig() {
         return defaults.cameraConfig;
      },

      getPicture(success, error, options) {
         if (typeof (error) === 'undefined')
            error = defaults.defaultErrorHandler;
         if (typeof (options) === 'undefined')
            options = defaults.cameraConfig;
         navigator.camera.getPicture(success, error, options);
      },

      readFile(fileName, onFileLoaded, onFileError) {
         window.resolveLocalFileSystemURL(fileName, function (fileEntry) {
            fileEntry.file(function (file) {
               var reader = new FileReader();
               //Attach onLoadEnd event handler for FileReader
               reader.onloadend = onFileLoaded;
               reader.onerror = onFileError;
               //Execute read action - will cause onLoadEnd event
               reader.readAsBinaryString(file);
               //Binary String can be encoded with base64 (btoa javascript function)
               //Such base64 string can be send as JSON via HTTP to WCF for example
            }, onFileError);
         }, defaults.defaultErrorHandler);
      },

      imageMimeType: imageMimeType
   };

   Vue.prototype.$device = device;
};

export default VueCordova;