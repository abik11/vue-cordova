var VueCordovaBluetooth = {};

//Download this plugin and install it from local files:
//(if you can't install it by the name)
//https://github.com/tanelih/phonegap-bluetooth-plugin

VueCordovaBluetooth.install = function (Vue, options) {
   
   var bluetooth = {
      isEnabled() {
         return new Promise((resolve, reject) => {
            window.bluetooth.isEnabled
               (() => resolve(), () => reject("Bluetooth is not enabled"));
         });
      },

      isConnected() {
         return new Promise((resolve, reject) => {
            window.bluetooth.isConnected
               (() => resolve(), () => reject("No bluetooth device is connected"));
         });
      },

      getPaired() {
         return this.isEnabled()
            .then(() => {
               return new Promise((resolve, reject) => {
                  window.bluetooth.getPaired
                     (devices => resolve(devices), () => reject("Couldn't get paired bluetooth devices"));
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

      connect(address, success, error) {
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
               window.bluetooth.startConnectionManager(success, error);
            });
      }
   };

   Vue.prototype.$bluetooth = bluetooth;
};

export default VueCordovaBluetooth;

/*

USAGE:

this.$bluetooth.isConnected()
   .then(() => { return this.$bluetooth.getPairedDeviceDetails('SP210'); })
   .then(data => { return this.$bluetooth.connect(data.address, data => console.log(data), e => error(e)); })

*/
