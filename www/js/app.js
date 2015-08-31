// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
pgapp = angular.module('starter', ['ionic', 'ionic-material', 'ngCordova', 'ionic.service.core', 'ionic.service.push', 'starter.controllers', 'starter.services', 'starter.routes', 'starter.directives', 'geoposition', 'firebase'])

  .run(['$ionicPlatform', '$ionicPopup', '$rootScope', '$location', '$state', 'AlarmTimer', 'GeopositionService', 'JPushService',
        function($ionicPlatform, $ionicPopup, $rootScope, $location, $state, AlarmTimer, GeopositionService, JPushService) {
          $ionicPlatform.ready(function() {
            console.log("ready 1");

            //navigator.splashscreen.hide();

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            //      if(window.cordova && window.cordova.plugins.Keyboard) {
            //        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //      }  // Cannot read property 'Keyboard'

            if(window.StatusBar) {//window.statusbar属性功能：statusbar属性本身也是一个对象，用于访问它自已的visible属性从而确定状态栏是否可见。
              StatusBar.styleDefault();
            }

            if (!window.indexedDB) {//HTML5本地存储
              window.alert("doesn't support indexeddb");
            } else {
              console.log("support indexedDB");
            }

            if (window.plugins && window.plugins.jPushPlugin) {
              /*
              console.log("jpushplugin init");
              window.plugins.jPushPlugin.init();
              window.plugins.jPushPlugin.setDebugMode(true);

              var onGetRegistrationID = function(data) {
                try {
                  alert("jpushplugin:registrationID is " + data);
                } catch (e) {
                  alert("jpushplugin get id " + e);
                };
              };
              window.plugins.jPushPlugin.getRegistrationID(onGetRegistrationID);
               */
              var setTagsWithAliasCallback = function(event) {
                window.alert('result code: ' + event.resultCode + ' tags: ' + event.tags + ' alias: ' + event.alias);
              };
              var openNotificationInAndroidCallback = function(data) {
                var json = data;
                window.alert(data);
                if (typeof data === 'string') {
                  json = JSON.parse(data);
                }
                //var id = json.extras['cn.jpush.android.EXTRA'].id;
                var id = json.extras['cn.jpush.android.MSG_ID'];
                window.alert(id);
                $state.go('detail', {id:id});
              };
              var config = {
                stwa: setTagsWithAliasCallback,
                oniac: openNotificationInAndroidCallback
              };
              JPushService.init(config);
            }

            //？
            GeopositionService.createTable();

            // sqlite db
            if (window.sqlitePlugin) {
              var sqliteDB = window.sqlitePlugin.openDatabase({name: "my.db"});//打开数据库
              sqliteDB.transaction(function(tx) {
                tx.executeSql('drop table if exists users');//如果user表存在，删除
                tx.executeSql('create table if not exists users (_id integer primary key, username text, password text)');//创建user表
                o
                sqliteDB.executeSql("pragma table_info (users);", [], function(res) {//查看表信息
                  console.log("PRAGMA res: " + JSON.stringify(res));
                });

                tx.executeSql("insert into users (username, password) values (?, ?)", ["pg", "123456"], function(tx, res) {//插入
                  console.log("insertId: " + res.insertId + " -- probably 1");
                  console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

                  sqliteDB.transaction(function(tx) {
                    tx.executeSql("select count(id) as cnt from users;", [], function(tx, res) {//删除重复的表
                      console.log("res.rows.length: " + res.rows.length + " -- should be 1");//仅在控制台中打印相关信息
                      console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
                    });
                  });
                });

              }, function(e) {
                console.log("Error: " + e.message);
              });
            }

          });

          $ionicPlatform.registerBackButtonAction(function(e) {
            //e.preventDefault();
            function showConfirm() {
              var confirmPopup = $ionicPopup.confirm({
                title: '<strong>退出应用?</strong>',
                template: '你确定退出应用吗？',
                okText: '退出',
                cancelText: '取消'});

              confirmPopup.then(function(res) {
                if (res) {
                  console.log("confirmPopup exit ");
                  //            navigator.app.exitApp();
                  var contextParams = {};
                  contextParams.action = "com.anyuaning.pgapp.service.TimerEventService";
                  window.pgappContext.stopService(contextParams); // pgappContext undefined
                  ionic.Platform.exitApp();
                } else {
                }
              });
            }

            console.log("location path ", $location.path());
            showConfirm();
            /*
             if ($location.path() == '/index') {
             showConfirm();
             } else if ($rootScope.$viewHistory.backView) {
             console.log('currentView:', $rootScope.$viewHistory.currentView);
             $rootScope.$viewHistory.backView.go();
             } else {
             showConfirm();
             }*/
            return false;
          }, 100);

        }]);

pgapp.value('pggeocache', {"longitude": 0, "latitude": 0, "alitutde": "", "accuracy": "", "altitudeAccuracy": "", "heading": "", "source": ""});

pgapp.config(['$ionicAppProvider', function($ionicAppProvider) {
  $ionicAppProvider.identify({
    app_id: '090f535d',
    api_key: '761675e8c6839aa399a2c19cce195c2b32ee8b50f2f421fc',
    dev_push: true
  });
}]);
