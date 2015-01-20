angular.module('starter.controllers', [])

  .controller('TodoCtrl', function($scope, Camera) {
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
  .controller('TodoCtrl', function($scope, $timeout, $ionicModal, $ionicSideMenuDelegate, Projects, Camera) {
    console.log("TodoCtrl 1");
    //Projects.initDB();
    $scope.tasks = [
      {title: "Activity"},
      {title: "Service"},
      {title: "Broadcast"},
      {title: "ContentProvider"}
    ];

    var createProject = function(projectTitle) {
      var newProject = Projects.newProject(projectTitle);
      Projects.openReqSave(newProject).then(function(isSuccess) {
        console.log("createProject 1");
        if (isSuccess) {
          Projects.openReqAll().then(function(projects) {
            $scope.projects = projects;
            $scope.selectProject(newProject, $scope.projects.length-1);
          })
          /*
          $scope.projects.push(newProject);
          $scope.selectProject(newProject, $scope.projects.length-1);
          */
        }
      })
    };


    /*
    $scope.projects = Projects.openReqAll();
    if (typeof($scope.projects) == "undefined") {
      // typeof, number | string | boolean | object | function | undefined
      $scope.projects = [];
    }*/

    //$scope.projects = Projects.all();
    //$scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

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
        title: task.title,
        lastPhoto: $scope.lastPhoto
      });
      $scope.taskModal.hide();

      //Projects.save($scope.projects);
      Projects.openReqSave($scope.activeProject);

      task.title = "";
      task.lastPhoto = "";
      $scope.lastPhoto = "";
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

    $scope.taskClick = function(task) {
      toast.showShort("task " + task.title + " click ." );
    }

    $timeout(function() {
      Projects.openReqAll().then(function(projects) {
        console.log("TodoCtrl openReqAll 1");
        $scope.projects = projects;
        console.log("TodoCtrl openReqAll 2");
        if ($scope.projects.length == 0) {
          while (true) {
            var projectTitle = prompt("Your first project title: ");
            if (projectTitle) {
              createProject(projectTitle);
              break;
            }
          }
        } else {
          $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];
        }
      });
    }, 1000)

    console.log("TodoCtrl 0");
  })

