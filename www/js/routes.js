angular.module('starter.routes', [])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('root', {
        url: '/',
        abstract: true,
        templateUrl: 'templates/layout/layout-sidemenu.html'
      })
      .state('root.home', {
        url: 'home',
        views: {
          'side-left': {
            templateUrl: 'templates/main/index-left.html',
            controller: 'ProjectController'
          },
          'side-content': {
            templateUrl: 'templates/main/index-home.html',
            controller: 'TaskController'
          }
        }
      })
      .state('root.about', {
        url: 'about',
        views: {
          'side-left': {
            templateUrl: 'templates/main/index-left.html',
            controller: 'ProjectController'
          },
          'side-content': {
            templateUrl: 'templates/main/index-about.html',
            controller: 'AboutController'
          }
        }
      })
      .state('root.settings', {
        url: 'settings',
        views: {
          'side-left': {
            templateUrl: 'templates/main/index-left.html',
            controller: 'ProjectController'
          },
          'side-content': {
            templateUrl: 'templates/main/index-settings.html',
            controller: 'SettingsController'
          }
        }
      })

      .state('home', {
        url: '/ahome',
        templateUrl: 'templates/fst-home.html'
      })
      .state('modal', {
        url: '/modal',
        templateUrl: 'templates/modal.html'
      })
      .state('test', {
        url: '/test',
        templateUrl: 'templates/test.html'
      })
      .state('form', {
        params: {
          data: null
        },
        url: '/form',
        templateUrl: 'templates/form.html',
        controller: 'FormController'
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
  });
