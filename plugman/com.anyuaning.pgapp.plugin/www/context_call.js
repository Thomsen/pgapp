
function onSuccess(message) {
  console.log("context call success: " + message);
}

function onError(message) {
  console.log("context call error: " + message);
}

module.exports = {
  callActivity: function(message, onSuccess, onError) {
    cordova.exec(onSuccess, onError, "pgappContext", "callActivity", [message]);
  },

  callService: function(message, onSuccess, onError) {
    cordova.exec(onSuccess, onError, "pgappContext", "callService", [message]);
  },

  stopService: function(message) {
    cordova.exec(onSuccess, onError, "pgappContext", "callService", [message]);
  }

}