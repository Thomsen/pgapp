angular.module('starter.routes', [])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('root', {
        url: '/',
        abstract: true,
        templateUrl: 'layout-sidemenu.html'
      })
      .state('root.home', {
        url: 'home',
        views: {
          'side-left': {
            templateUrl: 'index-left.html',
            controller: 'ProjectController'
          },
          'side-content': {
            templateUrl: 'index-home.html',
            controller: 'TaskController'
          }
        }
      })
      .state('root.about', {
        url: 'about',
        views: {
          'side-left': {
            templateUrl: 'index-left.html',
            controller: 'ProjectController'
          },
          'side-content': {
            templateUrl: 'index-about.html',
            controller: 'AboutController'
          }
        }
      })
      .state('root.settings', {
        url: 'settings',
        views: {
          'side-left': {
            templateUrl: 'index-left.html',
            controller: 'ProjectController'
          },
          'side-content': {
            templateUrl: 'index-settings.html',
            controller: 'SettingsController'
          }
        }
      })

      .state('home', {
        url: '/ahome',
        templateUrl: 'fst-home.html'
      })
      .state('detail', {
        url: '/detail?id',
        views: {
          'mainContainer': {
            templateUrl: 'templates/detail.html',
            controller: 'JPushController'
          }
        }
      });
    $urlRouterProvider.otherwise('/home');
  }])

  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.platform.android.tabs.position("bottom");
    $ionicConfigProvider.tabs.style("standard");
  })

  .config(function($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  })
