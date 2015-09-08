
angular.module('test', [])
  .controller('MapController', function($scope) {
    $scope.mapCreated = function(map) {
      $scope.map = map;
    };
  })
  .controller('TestController', function($scope, $state) {
    $scope.gotest = function () {
      $state.go('patrol'); // ui-sref="root.main" ui-sref-opts="{reload: false}"
    };

    $scope.camera = function() {
      var cameraOptions = new Object();
      cameraOptions.quality = 75;

      navigator.camera.getPicture(function(imageData) {
        console.log(imageData);
      }, function() {
      }, cameraOptions);
    };

    $scope.contextMap = function() {
      var conPar = {};
      conPar.action = "cn.mr.aiwaiqin.map.MapTestActivity";
      window.pgappContext.callActivity(conPar, function(result) {
        console.log(result);
      });
    };

    $scope.scan = function () {
      cordova.plugins.barcodeScanner.scan(function(result) {
        console.log("scanned result " + result.text + "\nformat " + result.format + "\ncancelled " + result.cancelled);
      }, function(error) {
        console.log("scanning failed " + error);
      });
    };

    $scope.genTemplate = function() {
      var data = new Object();

      // 表单配置
      var formBaseComponent = new Array();
      var formCustComponent = new Array();

      var f1 = {};
      f1.colName = "name";
      f1.class = "id_singleLine";
      f1.name = "名称";

      var f2 = {};
      f2.colName = "email";
      f2.class = "id_singleLine";
      f2.name = "邮箱";

      formBaseComponent.push(f1);
      formCustComponent.push(f2);

      var templateConfig = {};
      templateConfig.formBaseComponent = formBaseComponent;
      templateConfig.formCustComponent = formCustComponent;
      templateConfig.configVersion = 1;

      data.templateConfig = templateConfig;

      // 表单实例
      var fins1 = {};
      fins1.colName = "name";
      fins1.class = "id_singleLine";
      fins1.value = "jack";

      var fins2 = {};
      fins2.colName = "email";
      fins2.class = "id_singleLine";
      fins2.value ="jack@gmail.com";

      var formBaseInstance = new Array();
      var formCustInstance = new Array();

      formBaseInstance.push(fins1);
      formCustInstance.push(fins2);

      var templateInstance = {};
      templateInstance.insId = 1;
      templateInstance.formBaseInstance = formBaseInstance;
      templateInstance.formCustInstance = formCustInstance;

      data.templateInstance = templateInstance;

      var dataJson = JSON.stringify(data);
      console.log(dataJson);

      $state.go('form', {
        data: dataJson
      });
    };

    $scope.filetest = function() {
      write("test cordova plugin file", directory, filename);
    };

    var datas = "global data";
    var directory = "iwaiqin";
    var filename = "test_iwaiqin.txt";

    function write(data, directory, filename) {
      this.datas = data;
      this.directory = directory;
      this.filename = filename;
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
    }

    function onFileSystemSuccess(fileSystem) {
      newFile = fileSystem.root.getFile(filename, {
        create: true,
        exclusive: false
      }, onDirectorySuccess, onFileSystemFail);

    }

    function onDirectorySuccess(fileEntry) {
      fileEntry.createWriter(onFileWriterSuccess, onFileSystemFail);
    }

    function onFileWriterSuccess(writer) {
      writer.onwrite = function(evt) {
        console.log("write success");
      };
      writer.onerror = function(evt) {
        console.log("write error -- " + evt);
      };
      writer.onabort = function(evt) {
        console.log("write abort");
      };

      writer.write(datas);
      
    }

    function onFileSystemFail(error) {
      console.log("failed to retrieve file: " + error.code);
    }


    try {
      $scope.cplatformId = cordova.platformId;
      
      $scope.dcordova = device.cordova;
      $scope.dmodel = device.model;
      $scope.dplatform = device.platform;
      $scope.duuid = device.uuid;
      $scope.dversion = device.version;
      $scope.dmanufacturer = device.manufacturer;

      $scope.applicationDirectory = cordova.file.applicationDirectory;
      $scope.storageDirectory = cordova.file.applicationStorageDirectory;
      $scope.dataDirectory = cordova.file.dataDirectory;
      $scope.cacheDirectory = cordova.file.cacheDirectory;
      $scope.externalStorageDirectory = cordova.file.externalApplicationStorageDirectory;
      $scope.externalDataDirectory = cordova.file.externalDataDirectory;
      $scope.externalCacheDirectory = cordova.file.externalCacheDirectory;
      $scope.externalRootDirectory = cordova.file.externalRootDirectory;
      $scope.tempDirectory = cordova.file.tempDirectory;
      $scope.syncedDataDirectory = cordova.file.syncedDataDirectory;
      $scope.documentsDirectory = cordova.file.documentsDirectory;
      $scope.sharedDirectory = cordova.file.sharedDirectory;

    } catch (e) {
      console.log(e);
    }
    
  });

