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
    var openReq = window.indexedDB.open("projects");
    openReq.onupgradeneeded = function(event) {
      var db = event.target.result;
      var store = db.createObjectStore("project", {autoIncrement: true});
      var titleIndex = store.createIndex("by_title", "title", {unique: true});

    }
    openReq.onsuccess = function(event) {
    }
    openReq.onerror = function(event) {
    }
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
        var i_project = openReq.result.transaction("project", "readonly");
        var store = i_project.objectStore("project");
        var index = store.index("by_title");
        var request = index.openCursor();
        request.onsuccess = function() {
          var cursor = request.result;
          var projects = [];
          if (cursor) {
            //report(cursor.value.title);
            projects.push(cursor.values);
            cursor.continue();
          } else {
            // report(null);
          }
          q.resolve(projects);
        }
        return q.promise;
      },
      save: function(projects) {
        console.log('save project: ', projects);
        window.localStorage['projects'] = angular.toJson(projects); // localstorage file
      },
      openReqSave: function(projects) {
        var i_project = openReq.result.transaction("project", "readwrite");
        var store = i_project.objectStore("project");
        store.put(angular.toJson(projects));
        i_project.oncomplete = function() {
          console.log("project saved");
        }
      },
      newProject: function(projectTitle) {
        return {
          title: projectTitle,
          tasks: []
        };
      },
      getLastActiveIndex: function() {
        //return parseInt(window.localStorage['lastActiveProjects']) || 0;
      },
      setLastActiveIndex: function(index) {
        //window.localStorage['lastActiveProject'] = index;
      }
    }
  }])
