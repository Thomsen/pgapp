// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

  .config(function($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  })

  .run(['$ionicPlatform', '$ionicPopup', '$rootScope', '$location',
    function($ionicPlatform, $ionicPopup, $rootScope, $location) {
    $ionicPlatform.ready(function() {
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

