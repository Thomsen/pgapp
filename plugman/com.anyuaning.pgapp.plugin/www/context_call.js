
function onSuccess(message) {
  console.log("context call success: " + message);
}

function onError(message) {
  console.log("context call error: " + message);
}

module.exports = {
  callActivity: function(contextParams, onSuccess, onError) {
    var contextAction = contextParams.action;
    var contextValue = contextParams.value;
    var args = [contextAction, contextValue];
    cordova.exec(onSuccess, onError, "pgappContext", "callActivity", args);
  },

  callService: function(contextParams, onSuccess, onError) {
    var contextAction = contextParams.aciton;
    var args = [contextAction];
    cordova.exec(onSuccess, onError, "pgappContext", "callService", args);
  },

  stopService: function(contextParams) {
    var contextAction = contextParams.action;
    var args = [contextAction];
    cordova.exec(onSuccess, onError, "pgappContext", "callService", args);
  }

}
