angular.module('starter.services', [])

  .factory('Camera', ['$q', function($q) {
    return {
      getPicture: function(options) {
        var q = $q.defer();
        console.log("navigator camera getPicture");
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
    var setUp = false;
    initDB = function() {
      console.log("initDB 1");
      var deferq = $q.defer();
      if (setUp) {
        deferq.resolve(true);
        return deferq.promise;
      }
      console.log("initDB 2");
      var openReq = window.indexedDB.open("projects", 1);
      console.log("initDB 3");
      openReq.onupgradeneeded = function(event) {
        var db = event.target.result;
        var store = db.createObjectStore("project", {autoIncrement: true});
        var titleIndex = store.createIndex("by_title", "title", {unique: true});
        console.log("initDB 7");
      }
      console.log("initDB 4");
      openReq.onsuccess = function(event) {
        projDB = event.target.result;
        projDB.error = function(event) {
          deferq.reject("database error: " + event.target.errorCode);
        };
        setup = true;
        deferq.resolve(true);
      }
      console.log("initDB 5");
      openReq.onerror = function(event) {
        console.err("project database error: " + event.target.errorCode);
        deferq.reject(event.toString());
      }
      console.log("initDB 6");
      return deferq.promise;
    };

    return  {
      all: function() {
        var projectString = window.localStorage['projects'];
        if (projectString) {
          return angular.fromJson(projectString);
        }
        return [];
      },
      openReqAll: function() {
        var q = $q.defer();
        initDB().then(function() {
          var projects = [];
          var iProject = projDB.transaction("project", "readonly");
          var store = iProject.objectStore("project");
          var index = store.index("by_title");
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
        })
        return q.promise;
      },
      save: function(projects) {
        console.log('save project: ', projects);
        window.localStorage['projects'] = angular.toJson(projects); // localstorage file
      },
      openReqSave: function(project) {
        var q = $q.defer();
        initDB().then(function() {
          console.log("openReqSave 1");
          var iProject = projDB.transaction("project", "readwrite");
          console.log("openReqSave 2");
          var store = iProject.objectStore("project");
          console.log("openReqSave 3");
          //store.put(angular.toJson(project));
          store.put(project);
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
        return parseInt(window.localStorage['lastActiveProjects']) || 0;
      },
      setLastActiveIndex: function(index) {
        window.localStorage['lastActiveProject'] = index;
      }
    }
  }])
