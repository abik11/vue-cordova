var VueCordovaBluetooth = {};

//https://github.com/tanelih/phonegap-bluetooth-plugin

VueCordovaBluetooth.install = function (Vue, options) {
   
   var bluetooth = {
      isEnabled() {
         return new Promise((resolve, reject) => {
            window.bluetooth.isEnabled
               (result => resolve(result), () => reject("Bluetooth is not enabled"));
         });
      },

      isReadyToReceive() {
         return new Promise((resolve, reject) => {
            window.bluetooth.isConnectionManaged 
               (result => resolve(result), () => reject("No bluetooth connection is managed"));
         });
      },

      getPaired() {
         return this.isEnabled()
            .then(isEnabled => {
               return new Promise((resolve, reject) => {
                  if (isEnabled) {
                     window.bluetooth.getPaired
                        (devices => resolve(devices), () => reject("Couldn't get paired bluetooth devices"));
                  }
                  else {
                     reject("Bluetooth is disabled");
                  }
               });
            });
      },

      getPairedDeviceDetails(deviceName) {
         var that = this;
         return new Promise((resolve, reject) => {
            that.getPaired()
               .then(devices => {
                  var dev = _.find(devices, d =>
                     { return _.startsWith(d.name, deviceName) });

                  resolve(dev);
               })
               .catch(e => reject(e));
         });
      },

      startReceiving(address, success, error) {
         return new Promise((resolve, reject) => {
            window.bluetooth.getUuids(device => resolve(device), e => reject(e), address);
         })
            .then(device => {
               console.log("Connecting to device:");
               console.log(device);
               return new Promise((resolve, reject) => {
                  window.bluetooth.connect
                     (() => resolve(), e => reject(e), { address: device.address, uuid: device.uuids[0] });
               });
            })
            .then(() => {
               console.log("Opening connection");
               window.bluetooth.startConnectionManager(success, error);
            });
      },

      stopReceiving() {
         return new Promise((resolve, reject) => {
            console.log("Closing connection");
            window.bluetooth.stopConnectionManager(() => resolve(), e => reject(e));
         })
            .then(() => {
               return new Promise((resolve, reject) =>
                  window.bluetooth.disconnect(() => resolve(), e => reject(e)));
            });
      }
   };

   Vue.prototype.$bluetooth = bluetooth;
};

export default VueCordovaBluetooth;


/*

--- USAGE ---

   connectBtScanner() {
      this.$bluetooth.getPairedDeviceDetails(this.sharedData.bluetoothScannerName)
         .then(data => {
            return this.$bluetooth.startReceiving
                  (data.address, this.updateCode, this.basicErrorHandler);
         })
         .then(() => this.bluetoothOn = true)
         .catch(() => this.bluetoothOn = false);
   }

   this.$bluetooth.stopReceiving().
      then(() => {
         console.log("Connection closed");
         this.bluetoothOn = false;
      });

*/