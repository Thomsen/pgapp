// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.routes', 'starter.directives'])

  .run(['$ionicPlatform', '$ionicPopup', '$rootScope', '$location',
        function($ionicPlatform, $ionicPopup, $rootScope, $location, AlarmTimer) {
          $ionicPlatform.ready(function() {
            console.log("ready 1");

            navigator.splashscreen.hide();

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            //      if(window.cordova && window.cordova.plugins.Keyboard) {
            //        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //      }  // Cannot read property 'Keyboard'
            if(window.StatusBar) {
              StatusBar.styleDefault();
            }

            if (!window.indexedDB) {
              window.alert("doesn't support indexeddb");
            } else {
              console.log("support indexedDB");
            }

            // sqlite db
            var sqliteDB = window.sqlitePlugin.openDatabase({name: "my.db"});
            sqliteDB.transaction(function(tx) {
              tx.executeSql('drop table if exists users');
              tx.executeSql('create table if not exists users (_id integer primary key, username text, password text)');

              sqliteDB.executeSql("pragma table_info (users);", [], function(res) {
                console.log("PRAGMA res: " + JSON.stringify(res));
              });

              tx.executeSql("insert into users (username, password) values (?, ?)", ["pg", "123456"], function(tx, res) {
                console.log("insertId: " + res.insertId + " -- probably 1");
                console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

                sqliteDB.transaction(function(tx) {
                  tx.executeSql("select count(id) as cnt from users;", [], function(tx, res) {
                    console.log("res.rows.length: " + res.rows.length + " -- should be 1");
                    console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
                  });
                });
              });

            }, function(e) {
              console.log("Error: " + e.message);
            });

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
                  ionic.Platform.exitApp();
                } else {
                }
              });
            }

            console.log("location path ", $location.path())
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

        }])

