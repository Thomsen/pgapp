geoposition = angular.module('geoposition', []);

geoposition.controller('GeopositionController', function($scope, $timeout, GeopositionService, rwcgeocache) {
  var timer = $timeout(function() {
    // 页面显示最近坐标
    $scope.longitude = rwcgeocache.longitude;
    $scope.latitude = rwcgeocache.latitude;
    console.log("geo timer 1");
  }, 5000);

  $timeout(function() {
    rwcgeocache.longitude = 180;
    rwcgeocache.latitude = 90;
    console.log("geo timer 2");
  }, 6000);

  $scope.clock = {
    now: new Date()
  };

  var updateView = function() {
    $scope.clock.now = new Date();
    console.log("geo timer 3");
    $scope.longitude = rwcgeocache.longitude;
    $scope.latitude = rwcgeocache.latitude;
  };

  setInterval(function() {
    $scope.$apply(updateView);
  }, 3000);

});

geoposition.factory('GeopositionService', function(pggeocache) {

  var dbInstance;
  var getInstance = function() {
    if (!dbInstance) {
      // native already singleton
      try {
        dbInstance = window.sqlitePlugin.openDatabase({name: 'GeopositionCached.db'});
      } catch (e) {
      }
      //console.log("patrol db open");
    }
    return dbInstance;
  };

  // 坐标成功处理
  positionSuccess = function(position) {
    pggeocache.longitude = position.coords.longitude;
    pggeocache.latitude = position.coords.latitude;
    pggeocache.accuracy = position.coords.accuracy;
    pggeocache.altitudeAccuracy = position.coords.altitudeAccuracy;
    pggeocache.heading = position.coords.heading;
    pggwocache.speed = position.coords.speed;
  };

  // 坐标失败处理
  positionError = function(error) {
    alter('code: ' + error.code + '\n message: ' + error.message + '\n');
  };

  return {

    // 获取坐标信息
    getPositoin: function() {
      navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
    },

    // 监控坐标信息
    watchPosition: function() {
      navigator.geolocaiton.watchPosition(positionSuccess, positionError, {enableHighAccuracy: true});
    },

    // 创建坐标缓存表
    createTable: function() {
      if (!getInstance()) {
        return ;
      }
      getInstance().transaction(function(tx) {
        //tx.executeSql('drop table if exists geoposition;');
        tx.executeSql('create table if not exists geoposition (id integer primary key, longitude text, latitude text, mobile_time text, corrected_time text, buz_flag text, patrol_radius text, status text, source text )');
      });
    },

    // 保存坐标信息
    saveData: function(geocache) {
      if (!getInstance()) {
        return ;
      }
      getInstance().transaction(function(tx) {
        var longitude = geocache.longitude;
        var latitude = geocache.latitude;
        var mobile_time = geocache.mobile_time;
        var corrected_time = geocache.corrected_time;
        var buz_flag = geocache.buz_flag;
        var patrol_radius = geocache.patrol_radius;
        var status = geocache.status;
        var source = geocache.source;

	tx.executeSql("insert into geoposition (longitude, latitude, mobile_time, corrected_time, buz_flag, patrol_radius, status, source) values (?, ?, ?, ?, ?, ?, ?, ?)", [longitude, latitude, mobile_time, corrected_time, buz_flag, patrol_radius, status, source], function(tx, res) {
          console.log("insert id: " + res.insertId);
          //alert("insert id " + res.insertId);
        }, function(e) {
          console.log("insert error: " + e.message);
        });
      });
    },

    // 更新坐标状态信息
    updateData: function(dataId, status) {
      if (!getInstance()) {
        return ;
      }
      getInstance().transaction(function(tx) {

        tx.executeSql("update geoposition set status = ? where id = ?;", [status, dataId], function(tx, res) {
          console.log("update id: " + res.insertId);
        }, function(e) {
          console.log("update error: " + e.message);
        });
      });
    },

    // 查询已缓存坐标信息
    findDatas: function(onSuccess) {
      if (!getInstance()) {
        return ;
      }
      console.log("geoposition find datas");
      getInstance().transaction(function(tx) {
        // getInstance().executeSql("sele... no execute
        tx.executeSql("select * from geoposition;", [],
                      onSuccess, function(e) {
                        concole.log("select error: " + e.message);
                      });
      });
    },

    // 删除已经上传的坐标
    deleteDatas: function(status) {
      if (!getInstance()) {
        return ;
      }
      getInstance().transaction(function(tx) {
        tx.executeSql("delete from geoposition where status = ?;", [status], function(tx, res) {
        }, function(e) {
          console.log("delete error: " + e.message);
        });
      });
    }

  };
});
