# vue-cordova
This is a Cordova project made with Vue.js in Visual Studio 2017. It may serve as a starting point for something bigger.

##### Build
Before building the application run: `npm i` or restore packages through Visual Studio GUI.

### Tools
This is a mobile application project made with:
* Visual Studio 2017
* Cordova
* Vue.js
* Webpack

##### Rimraf
Because on Windows you may encounter problems if you will try to delete *node_modules* directory, it is also recommended to install **rimraf** package from npm.


### Visual Studio Extensions and tools
Any other IDE or text editor can be used to work with this project but with the following extensions for VS2017 it becomes a very handy IDE for hybrid-mobile development. It is recommended to install the following tools for VS2017:
* Visual Studio Tools for Apache Cordova 
* Vue.js Pack 2017
* WebPack Task Runner
* GitHub Extension for Visual Studio

### Cordova plugins
To allow Cordova to access hardware or system functions you sometimes need to install additional plugins that bring the functionality to Cordova. You can always see the list of installed plugins in **config.xml** file where they are described with **plugin** markup. Here you also got the list of plugins used in this project if you want to install them on your own:
* cordova-plugin-whitelist
* phonegap-plugin-barcodescanner
* cordova-plugin-getmacandroid6
* cordova-plugin-network-information
* cordova-plugin-camera
* cordova-plugin-file
* cordova-sms-plugin

##### Permissions
Plugins are quite strictly connected with permissions. Usually when you install the plugin it modifies **AndroidManifest.xml** and adds required permissions there, but sometimes it doesn't work as expected. If you encounter problems with permissions, the easiest way to overcome it is to add manually permissions to the manifest.<br />
In your project directory go to: `./platforms/android/AndroidManifest.xml` and add there the permissions that you need, for example:
```xml
<uses-permission android:name="android.permission.SEND_SMS" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```

### CSS
You will not find too much styles here, it is supposed to be as simple and *bare* as possible. If you would like to add some CSS framework, you can see [here](https://github.com/abik11/todo-app-vue) an example of how to add Materialize to Vue.js project. Adding other frameworks should be very similar.