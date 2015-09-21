
angular.module('test', [])
  .controller('MapController', function($scope) {
    $scope.mapCreated = function(map) {
      $scope.map = map;
    };
  })
  .controller('TestController', function($scope, $state, $cordovaSQLite) {
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

    var db;
    $scope.sqlite = function() {
      console.log("---------sqlite start exec-------------");
      if (window.sqlitePlugin) {
        if (!db) {
         db  = window.sqlitePlugin.openDatabase("test.db");
        }
        console.log(" ------- db transaction ---------");
        db.transaction(function(tx) {
          tx.executeSql("create table if not exists t_event(_id integer primary key, title text, date text);");
          tx.executeSql("create table if not exists t_template(_id integer primary key, name text, version text);");
        });

        var inser = function(title, date) {
          db.transaction(function(tx) {
            console.log("inser 1 tx " + angular.toJson(tx));
            tx.executeSql("insert into t_event(title, date) values(?, ?)", [title, date], function(tx, res) {
              console.log("inser 3 tx " + angular.toJson(tx));
              find(tx);
            }, function(err) {
              console.log("inser 1 err: " + err.message);
              return false;
            });
            console.log("inser 2 tx " + angular.toJson(tx));
            tx.executeSql("insert into t_template(name, version) values(?, ?);", ["inser", date], function(tx, res) {
              console.log("inser 4 tx " + angular.toJson(tx));
            }, function(err) {
              console.log("inser 2 err: " + err.message);
              return true;
            });
          });
          db.transaction(function(tx) {
            console.log("inser 2 tx " + angular.toJson(tx));
            tx.executeSql("insert into t_template(name, version) values(?, ?)", ["inser", date], function(tx, res) {
              console.log("inser 4 tx " + angular.toJson(tx));
            }, function(err) {
              console.log("inser 2 err: " + err.message);
              return true;
            });
          });
        };

        var insertmpl = function(name, date) {
          db.transaction(function(tx) {
            console.log("name: " + name + " date: " + date);
            tx.executeSql("insert into t_template(name, version) values(?, ?);", ["insertmpl", date], function(tx, res) {

            });
          });
        };

        var find = function(tx) {
          //db.transaction(function(tx) {
          tx.executeSql("select * from t_event;", [], function(tx, res) {
            console.log("t_event " + angular.toJson(res));
            console.log("t_event " + angular.toJson(res.rows));
            console.log("t_event " + angular.toJson(res.rows.item(0)));
            if (res) {
              var len = res.rows.length;
              var results = [];
              for (var i=0; i<len; i++) {
                results.push(res.rows.item(i));
              }
              console.log("results " + angular.toJson(results));
              $scope.items = results;
            }
            //});
          });
        };

        var title, date;
        var i = 0;
        // for (var i=0; i<100; i++) {
        title = "title " + i;
        date = angular.toJson(new Date());
        inser(title, date);
        insertmpl(title, date);
        //}
      }

      console.log("-------------sqlite end exec-----------------");
    };

    $scope.ngsqlite = function() {
      console.log("---------ngsqlite start exec-------------");
      if (window.sqlitePlugin) {
        if (!db) {
          db = $cordovaSQLite.openDB("test.db");
        }

        console.log("--------- ngsqlite create table ------");
        $cordovaSQLite.execute(db, "create table if not exists t_event_ng(_id integer primary key, title text, date text);");
        $cordovaSQLite.execute(db, "create table if not exists t_template_ng(_id integer primary key, name text, version text);");

        var inser2 = function(title, date) {
          var insql2 = "insert into t_event_ng(title, date) values(?, ?)";
          $cordovaSQLite.execute(db, insql2, [title, date]).then(function(res) {
            console.log("ng inser2 res event " + angular.toJson(res));
          }, function(err) {
            console.log(err);
          });
          var insql3 = "insert into t_template_ng(name, version) values(?, ?)";
          $cordovaSQLite.execute(db, insql3, [title, date]).then(function(res) {
            console.log("ng inser2 res template " + angular.toJson(res));
          }, function(err) {
            console.log(err);
          });
        };

        console.log("---------- ngsqlite insert date ---------");
        inser2("title 1", angular.toJson(new Date()));

      }
      console.log("-------------ngsqlite end exec-----------------");
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

