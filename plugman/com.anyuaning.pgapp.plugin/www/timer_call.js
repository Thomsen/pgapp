
module.exports = {
  onceTimer: function(message, onSuccess, onError) {
    cordova.exec(onSuccess, onError, "pgappTimer", "onceTimer", [message]);
  },

  loopTimer: function(message, onSuccess, onError) {
    cordova.exec(onSuccess, onError, "pgappTimer", "loopTimer", [message]);
  },
}