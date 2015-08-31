angular.module('starter.controllers', [])

  .controller('NavController', function($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.headerTitle = 'Home';

    $scope.$on("headerTitle", function(event, title) {
      $scope.headerTitle = title;
    });
  })

  .controller("ContextController", function($scope) {
    $scope.callContext = function() {
      console.log("pgappContext call");
      //pgappContext.callActivity("com.anyuaning.pgapp.CordovaMainActivity", function(message) {
      //console.log("call activity success: " + message);
      //}, function(message) {
      //console.log("call activity error: " + message);
      //});
      //pgappContext.callService("com.anyuaning.pgapp.service.TimerEventService", function(message) {
      //console.log("call service success: " + message);
      //}, function(message) {
      //console.log("call service error: " + message);
      //});
      var timerArgs = new Object();
      timerArgs.interval = 10000;//interval制定对function或methodName调用两次之间的时间，单位是毫秒
      pgappTimer.onceTimer(timerArgs, function(message) {
        console.log("pgappTimer call success: " + message);
      }, function(message) {
        console.log("pgappTimer call error: " + message);
      });
      timerArgs.action = "test";
      pgappTimer.loopBroadTimer(timerArgs, function(message) {
        console.log("pgappTimer call loop success: " + message);
      }, function(message) {
        console.log("pgappTimer call loop error: " + message);
      });
      timerArgs.serviceClassName = "com.anyuaning.pgapp.service.TimerEventService";
      timerArgs.action = "test2";
      pgappTimer.loopServTimer(timerArgs, function(message) {
        console.log("pgappTimer call loop service success: " + message);
      }, function(message) {
        console.log("pgappTimer call loop service error: " + message);
      });
      setTimeout(function() {
        console.log("cancel service timer");
        var cancelTimer = new Object();
        cancelTimer.serviceClassName = "com.anyuaning.pgapp.service.TimerEventService";
        cancelTimer.action = "test2";
        pgappTimer.cancelServTimer(cancelTimer, function(message) {
          console.log("pgappTimer cancel loop service success: " + message);
        }, function(message) {
          console.log("pgappTimer cancel loop service error: " + message);
        });
      }, 30000);
      setTimeout(function() {
        var cancelTim = new Object();
        cancelTim.action = "test";
        pgappTimer.cancelBroadTimer(cancelTim, function(message) {
          console.log("pgappTimer cancel loop broad success: " + message);
        }, function(message) {
          console.log("pgappTimer cancel loop broad error: " + message);
        });
      }, 20000);
    };

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

  .controller('ProjectController', function($scope, $ionicSideMenuDelegate, $location, $timeout, Projects, AlarmTimer, FirebaseProject) {

    var createProject = function(projectTitle) {
      var newProject = Projects.newProject(projectTitle);
      FirebaseProject.$add(newProject);
      Projects.openReqSave(newProject).then(function(isSuccess) {
        console.log("createProject 1");
        if (isSuccess) {
          Projects.openReqAll().then(function(projects) {
            $scope.projects = projects;
            $scope.selectProject(newProject, $scope.projects.length-1);
          });
        }
      });
    };

    $scope.newProject = function() {
      var projectTitle = prompt('Project name');
      if (projectTitle) {
        createProject(projectTitle);
      }
    };

    $scope.selectProject = function(project, index) {
      $scope.$root.$broadcast("headerTitle", project.title);
      $scope.$root.$broadcast("activeProject", project);
      Projects.setLastActiveIndex(index);
      $ionicSideMenuDelegate.toggleLeft(false);
      $location.path("/home");
    };

    if ($location.path() == '/home') {
      // first tabhost execute
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
            $scope.selectProject($scope.projects[index], index);
          }
          // test interval timer
          //AlarmTimer.testTimer();
          // test alarm timer
          //AlarmTimer.testAlarmTimer();
        });
      }, 1000);
    }
  })

  .controller('TaskController', function($scope, $timeout, $ionicModal, $ionicSideMenuDelegate, $ionicActionSheet, Data, Projects, Geolocation, FirebaseProject) {

    /*
     var i = 0;
     setInterval(function() {
     console.log("interval 5 seconds");
     Projects.save(i);
     i++;
     }, 5000);
     */

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
    });

    $scope.$on("activeProject", function(event, activeProject) {
      $scope.activeProject = activeProject;
    });

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

      if ($scope.lastPhoto) {
        task.lastPhoto = $scope.lastPhoto;
      }

      $scope.activeProject.tasks.push({
        title: task.title,
        lastPhoto: task.lastPhoto
      });

      //FirebaseProject.$getRecord($scope.activeProject.title).$add(task);
      FirebaseProject.$add(task);

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
      window.plugins.toast.showShortBottom("task " + task.title + " click ." );
      Geolocation.watchLoc();
    };

    $scope.showDetails = function() {
      $ionicActionSheet.show({
        buttons: [
          {text: 'Complete'}
        ],
        destructiveText: 'Delete',
        titleText: 'Update Todo',
        cancelText: 'Cancel',
        buttonClicked: function(index) {
          return true;
        }
      });
    };

    $scope.refreshTask = function() {
      Projects.openReqAll().then(function(projects) {
        $scope.projects = projects;
        var index = Projects.getLastActiveIndex();
        $scope.activeProject = $scope.projects[index];
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    console.log("TodoCtrl 0");
  })

  .controller('AboutController', function($scope, $rootScope, $ionicUser, $ionicPush, $state) {
    $scope.identifyUser = function() {
      console.log("ionic user: identifying with ionic user service");
      var user = $ionicUser.get();
      if (!user.user_id) {
        user.user_id = $ionicUser.generateGUID();
      };

      angular.extend(user, {
        name: 'Ionitron',
        bio: 'I come from planet Ion'
      });

      $ionicUser.identify(user).then(function() {
        $scope.identified = true;
        alert('Identified user ' + user.name + '\n Id ' + user.user_id);
      });
    };
    $scope.pushRegister = function() {
      console.log('ionic push: registering user');
      $ionicPush.register({
        canShowAlert: true,
        canSetBadge: true,
        canPlaySound: true,
        canRunActionOnWake: true,
        onNotification: function(notifiction) {
          console.log('notifi: ' + notification);
          return true;
        }
      });
    };
    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
      alert("successfully registered token " + data.token);
      console.log('ionic push: got token ', data.token, data.platform);
      $scope.token = data.token;
    });

  })

  .controller('SettingsController', function($scope, $http, $ionicModal) {
    $scope.expanders = [{
      title: 'expander 1',
      text: 'expander text 1'
    }, {
      title: 'expander 2',
      text: 'exapnder text 2'
    }, {
      title: 'expander 3',
      text: 'expander test 3'
    }];

    $scope.user = {

    };
    $scope.login = function(user) {
      /*
       $http({method: 'POST',
       params: {},
       data: {},
       url: "http://localhost:3000/users/login",
       header: {
       'Content-Type': 'application/json:charset=utf-8'
       },
       })*/
      var postData = user;
      $http.post("http://localhost:3000/users/login", postData,
                 {headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
                   /*'Accept': 'application/json'*/
                 },
                  transformRequest: function(data) {
                    var str = [];
                    for (var p in data) {
                      if (data.hasOwnProperty(p)) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                      }

                    }
                    return str.join("&");
                  },
                  transformResponse: function(data) {
                    return data;
                  }})
        .success(function(response, status, headers, config) {
          console.log("http status " + status);
          console.log("http response " + angular.toJson(response));
        })
        .error(function(response, status, headers, config) {
          console.log("http error " + status);
        });
    };

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

  })

  .controller('JPushController', function($scope, $stateParams) {
    var id = $stateParams.id;
    $scope.message = "message id : " + id;
  });
