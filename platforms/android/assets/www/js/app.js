// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.services'])

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

      alert("device already");
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

  .factory('Projects', function() {
    return  {
      all: function() {
        var projectString = window.localStorage['projects'];
        if (projectString) {
          return angular.fromJson(projectString);
        }
        return [];
      },
      save: function(projects) {
        console.log('save project: ', projects);
        window.localStorage['projects'] = angular.toJson(projects);
      },
      newProject: function(projectTitle) {
        return {
          title: projectTitle,
          tasks: []
        };
      },
      getLastActiveIndex: function() {
        return parseInt(window.localStorage['lastActiveProjects']) || 0;
      },
      setLastActiveIndex: function(index) {
        window.localStorage['lastActiveProject'] = index;
      }
    }
  })

  .controller('TodoCtrl', function($scope, $ionicModal, $ionicSideMenuDelegate, Projects, Camera) {
    $scope.tasks = [
      {title: "Activity"},
      {title: "Service"},
      {title: "Broadcast"},
      {title: "ContentProvider"}
    ];

    var createProject = function(projectTitle) {
      var newProject = Projects.newProject(projectTitle);
      $scope.projects.push(newProject);
      Projects.save($scope.projects);
      $scope.selectProject(newProject, $scope.projects.length-1);
    }

    $scope.projects = Projects.all();

    $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

    $scope.newProject = function() {
      var projectTitle = prompt('Project name');
      if (projectTitle) {
        createProject(projectTitle);
      }
    };

    $scope.selectProject = function(project, index) {
      $scope.activeProject = project;
      Projects.setLastActiveIndex(index);
      $ionicSideMenuDelegate.toggleLeft(false);
    };

    $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
      $scope.taskModal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });

    $scope.newTask = function() {
      $scope.taskModal.show();
    };

    $scope.createTask = function(task) {
      if (!$scope.activeProject || !task) {
        return ;
      }
      $scope.activeProject.tasks.push({
        title: task.title
      });
      $scope.taskModal.hide();

      Projects.save($scope.projects);

      task.title = "";
    };

    $scope.closeNewTask = function() {
      $scope.taskModal.hide();
    };

    $scope.toggleProjects = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.getPhoto = function() {
      Camera.getPicture().then(function(imageUri) {
        console.log(imageUri);
        $scope.lastPhoto = imageUri;
      }, function(err) {
        console.err(err);
      }, {
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false
      });
    };

  })

