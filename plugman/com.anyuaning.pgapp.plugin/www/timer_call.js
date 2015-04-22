
module.exports = {
  onceTimer: function(timerArgs, onSuccess, onError) {
    var interval = timerArgs.interval;
    cordova.exec(onSuccess, onError, "pgappTimer", "onceTimer", [interval]);
  },

  loopBroadTimer: function(timerArgs, onSuccess, onError) {
    var interval = timerArgs.interval;
    var serviceClassName = timerArgs.serivceClassName;
    var action = timerArgs.action;
    cordova.exec(onSuccess, onError, "pgappTimer", "loopBroadcastTimer", [interval, serviceClassName, action]);
  },

  cancelBroadTimer: function(timerArgs, onSuccess, onError) {
    var interval = timerArgs.interval;
    var serviceClassName = timerArgs.serviceClassName;
    var action = timerArgs.action;
    cordova.exec(onSuccess, onError, "pgappTimer", "cancelBroadcastTimer", [interval, serviceClassName, action]);
  },

  loopServTimer: function(timerArgs, onSuccess, onError) {
    var interval = timerArgs.interval;
    var serviceClassName = timerArgs.serviceClassName;
    var action = timerArgs.action;
    cordova.exec(onSuccess, onError, "pgappTimer", "loopServiceTimer", [interval, serviceClassName, action]);
  },

  cancelServTimer: function(timerArgs, onSuccess, onError) {
    var interval = timerArgs.interval;
    var serviceClassName = timerArgs.serviceClassName;
    var action = timerArgs.action;
    cordova.exec(onSuccess, onError, "pgappTimer", "cancelServiceTimer", [interval, serviceClassName, action]);  // interval is not defined
  },
}