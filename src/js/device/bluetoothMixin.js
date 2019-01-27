var BluetoothMixin = {
   data() {
      return {
         bluetoothOn: false,
         btScanned: '',
         btReceiving: false,
         btDelay: 200
      };
   },
   methods: {
      collectBtData(data) {
         this.btScanned += data;
         if (!this.btReceiving)
            setTimeout(() => {
               this.updateCode(this.btScanned);
               this.btScanned = '';
               this.btReceiving = false;
            }, this.btDelay);
         this.btReceiving = true;
      },

      connectBtScanner() {
         this.$bluetooth.getPaired()
            .then(devices => {
               return this.$bluetooth.startReceiving
                  (devices[0].address, this.collectBtData, this.basicErrorHandler);
            })
            .then(() => this.bluetoothOn = true)
            .catch(error => {
               if (error.code != 5)
                  this.bluetoothOn = false
            });
      },

      checkBtScanner() {
         this.$bluetooth.isReadyToReceive()
            .then(isReady => {
               if (!isReady)
                  this.connectBtScanner();
            })
            .catch(error => {
               this.bluetoothOn = false;
               this.basicErrorHandler(error);
            });
      },

      disconnectBtScanner() {
         this.$bluetooth.stopReceiving().
            then(() => {
               console.log("Connection closed");
               this.bluetoothOn = false;
            });
      }
   }
};
export default BluetoothMixin;

//this.btIntervalHandle = setInterval(this.checkBtScanner, 1000);
//clearInterval(this.btIntervalHandle);
