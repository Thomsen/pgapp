
module.exports = {
  callContext: function(message, onSuccess, onError) {
    cordova.exec(onSuccess, onError, "pgappPlugin", "callContext", [message]);
  }
}