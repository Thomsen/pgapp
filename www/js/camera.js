
angular.module('starter.services', [])

// service
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

/*
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
*/
