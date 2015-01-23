angular.module('starter.controllers', [])

  .controller('NavController', function($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    }
    $scope.headerTitle = 'Home';
  })

  .controller("CameraController", function($scope, Data, Camera) {
    //$scope.lastPhoto = Data.lastPhoto;
    $scope.getPhoto = function() {
      Camera.getPicture().then(function(imageUri) {
        console.log(imageUri);
        //Data.lastPhoto = imageUri;
        $scope.$root.$broadcast("photoEvent", imageUri);
      }, function(err) {
        console.log(err);
      }, {
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false
      });
    };
  })

  .controller('ProjectController', function($scope, $ionicSideMenuDelegate, $timeout, Projects) {

    var createProject = function(projectTitle) {
      var newProject = Projects.newProject(projectTitle);
      Projects.openReqSave(newProject).then(function(isSuccess) {
        console.log("createProject 1");
        if (isSuccess) {
          Projects.openReqAll().then(function(projects) {
            $scope.projects = projects;
            $scope.selectProject(newProject, $scope.projects.length-1);
          })
        }
      })
    };

    $scope.newProject = function() {
      var projectTitle = prompt('Project name');
      if (projectTitle) {
        createProject(projectTitle);
      }
    };

    $scope.selectProject = function(project, index) {
      $scope.$root.$boradcast('activeProject', project);
      Projects.setLastActiveIndex(index);
      $ionicSideMenuDelegate.toggleLeft(false);
    };

    $timeout(function() {
      Projects.openReqAll().then(function(projects) {
        $scope.projects = projects;
        if ($scope.projects.length == 0) {
          while (true) {
            var projectTitle = prompt("Your first project title: ");
            if (projectTitle) {
              createProject(projectTitle);
              break;
            }
          }
        } else {
          var index = Projects.getLastActiveIndex();
          $scope.selectProject($scope.projects(index), index);
        }
      });
    }, 1000)
  })

  .controller('TodoController', function($scope, $timeout, $ionicModal, $ionicSideMenuDelegate, Data, Projects, Geolocation) {

    /**
    var i = 0;
    setInterval(function() {
      console.log("interval 5 seconds");
      Projects.save(i);
      i++
    }, 5000);*/

    console.log("TodoCtrl 1");
    $scope.tasks = [
      {title: "Activity"},
      {title: "Service"},
      {title: "Broadcast"},
      {title: "ContentProvider"}
    ];

    //$scope.lastPhoto = Data.lastPhoto;
    $scope.$on("photoEvent", function(event, lastPhoto) {
      $scope.lastPhoto = lastPhoto;
    })

    $scope.$on("activeProject", function(event, activeProject) {
      $scope.activeProject = activeProject;
    })

    $ionicModal.fromTemplateUrl('task-new.html', function(modal) {
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
        title: task.title,
        lastPhoto: $scope.lastPhoto
      });
      $scope.taskModal.hide();
      Projects.openReqSave($scope.activeProject);

      task.title = "";
      task.lastPhoto = "";
      $scope.lastPhoto = "";
    };

    $scope.closeNewTask = function() {
      $scope.taskModal.hide();
    };


    $scope.taskClick = function(task) {
      toast.showShort("task " + task.title + " click ." );
      Geolocation.watchLoc();
    }



    console.log("TodoCtrl 0");
  })

