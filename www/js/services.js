angular.module('starter.services', ['geoposition'])
  .factory('Data', function() {
    var i = 0;
    return {
      lastPhoto: "",

      Task: function() {
        title: "";
        date: "";
      },

      Person: function() {
        title: "";
        tasks: [];
      }
    }
  })

  .factory('AlarmTimer', ['$q', 'Data', 'Projects', 'GeopositionService', 'pggeocache', function($q, Data, Projects, GeopositionService, pggeocache) {
    var i = 0;
    var project = new Object();
    project.title = "";
    project.tasks = [];

    var timer;

    return {
      testTimer: function() {
        timer = setInterval(function() {
          console.log("testTimer exec after 5 seconds");
          var task = new Object();
          project.title = 'testTimer';
          var time = new Date();
          task.title = i + "_" + time;
          project.tasks.unshift(task);
          Projects.openReqSave(project);
          i++;
        }, 10000);
      },
      clearTimer: function() {
        clearInterval(timer);
      },
      testAlarmTimer: function() {
        pgappTimer.loopTimer("test alarm timer", function(message) {
          project.title = 'testAlarmTimer';
          var alarmTask = new Object();
          var alarmTime = new Date();
          alarmTask.title = i + "_" + alarmTime;
          project.tasks.unshift(alarmTask);
          Projects.openReqSave(project);
          i++;

          // save geocache
          pggeocache.mobile_time = new Date();
          GeopositionService.saveData(pggeocache);

        }, function(message) {
          console.log("test alarm timer error: " + message);
        });
      }
    }
  }])

  .factory('Camera', ['$q', function($q) {
    return {
      getPicture: function(options) {
        var q = $q.defer();
        console.log("navigator camera getPicture");
        var options = new Object();
        options.sourceType = 1;  /* 0: gallery 1: camera */
        navigator.camera.getPicture(function(result) {
          console.log("getPicture success");
          q.resolve(result);
        }, function(err) {
          console.log("getPicture failure");
          q.reject(err);
        }, options);

        return q.promise;
      }
    }
  }])

  .factory('Projects', ['$q', function($q) {
    var projDB;
    var setup = false;

    return  {
      initDB: function() {
        console.log("initDB 1");
        var deferq = $q.defer();
        if (setup) {
          deferq.resolve(true);
          return deferq.promise;
        }
        console.log("initDB 2");
        var openReq = window.indexedDB.open("projects");
        console.log("initDB 3");
        openReq.onupgradeneeded = function(event) {
          var db = event.target.result;
          var store = db.createObjectStore("project", {autoIncrement: true});
          var titleIndex = store.createIndex("by_title", "title", {unique: true});
          console.log("initDB 7");
        }
        console.log("initDB 4");
        openReq.onsuccess = function(event) {
          //projDB = event.target.result;
          projDB = openReq.result;
          projDB.error = function(event) {
            deferq.reject("database error: " + event.target.errorCode);
          };
          setup = false;
          deferq.resolve(true);
        }
        console.log("initDB 5");
        openReq.onerror = function(event) {
          console.error("project database error: " + event.target.errorCode);
          deferq.reject(event.toString());
        }
        console.log("initDB 6");
        return deferq.promise;
      },

      all: function() {
        var projectString = window.localStorage['projects'];
        if (projectString) {
          return angular.fromJson(projectString);
        }
        return [];
      },
      openReqAll: function() {
        console.log("openReqAll 1");
        var q = $q.defer();
        this.initDB().then(function(setup) {
          var projects = [];
          if (setup) {
            // converting circular structure to JSON Object.stringfy() ($timeout)
            console.log("openReqAll 2 projDB: " + angular.toJson(projDB));
            var iProject = projDB.transaction("project", "readonly");
            console.log("openReqAll 3 " + iProject.db.objectStoreNames[0]);
            console.log("openReqAll 3 iProject.db: " + angular.toJson(iProject.db));
            var store = iProject.objectStore("project");
            console.log("openReqAll 4");
            var index = store.index("by_title");
            console.log("openReqAll 5");
            var request = store.openCursor();
            request.onsuccess = function() {
              var cursor = request.result;
              if (cursor) {
                //report(cursor.value.title);
                //projects.push(angular.fromJson(cursor.value));
                projects.push(cursor.value);
                cursor.continue();
              } else {
                // report(null);
              }
            }
            iProject.oncomplete = function(event) {
              q.resolve(projects);
            }
          }
        })
        return q.promise;
      },
      save: function(projects) {
        console.log('save project: ', projects);
        window.localStorage['projects'] = angular.toJson(projects); // localstorage file
      },
      openReqSave: function(project) {
        var q = $q.defer();
        this.initDB().then(function() {
          console.log("OpenReqSave 1 projDB: " + angular.toJson(projDB));
          var iProject = projDB.transaction("project", "readwrite");
          console.log("openReqSave 2");
          var store = iProject.objectStore("project");
          var index = store.index("by_title");
          var request = index.openCursor(project.title);
          request.onsuccess = function() {
            var matching = request.result;
            if (matching) {
              matching.update(project);
            } else {
              store.put(project);
            }
          }
          request.onerror = function() {
          }
          console.log("openReqSave 3");
          iProject.oncomplete = function() {
            console.log("project saved");
            q.resolve(true);
          }

        })
        return q.promise;
      },
      newProject: function(projectTitle) {
        return {
          title: projectTitle,
          tasks: []
        };
      },
      getLastActiveIndex: function() {
        return parseInt(window.localStorage['lastActiveProject']) || 0;
      },
      setLastActiveIndex: function(index) {
        window.localStorage['lastActiveProject'] = index;
      }
    }
  }])

  .factory("Geolocation", function() {
    var onSuccess = function(position) {
      alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    };
    var onError = function(error) {
      alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    };
    var watchId;
    var now = new Date().getTime();
    var _60_seconds_from_now = new Date(now + 60 * 1000);
    return {
      loc: function() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      },
      watchLoc: function() {
        // notification
        window.plugin.notification.local.add({
          id: 1,
          title: 'watch loc',
          message: 'Obtain GPS',
          repeat: 'weekly',
          date: _60_seconds_from_now});

        // loc
        watchId = navigator.geolocation.watchPosition(onSuccess, onError, {enableHighAccuracy: true});
      },
      clearWatch: function() {
        navigator.geolocation.clearWatch(watchID);
      }
    }
  })