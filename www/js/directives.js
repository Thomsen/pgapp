angular.module('starter.directives', [])

  .directive('formItem', function() {
    return {
      restrict: 'E',
      template: '<form name="GenForm">',
      replace: true,
      link: function(scope, element, attrs) {
        var genHtml = {
          id_singleLine: function(o) {
            return "<div></div>";
          }
        };
      }
    };
  })

  .directive('formAuto', function() {
    return {
      restrict: 'E',
      scope: {
        data: '=data',
        formValue: '='
      },
      templateUrl: 'templates/field.html',
      link: function(scope, element, attrs) {

      },
      replace: true
    };
  })

  .directive('hello', function() {
    return {
      restrict: 'E', // E 元素 A 属性 C 样式类 M 注释
      template: '<div>Hi there <span ng-transclude></span></div>',
      // replace: true
      transclude: true
    };
  })

  .directive('expander', function() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      require: '^?accordion',
      scope: {
        title: '=expanderTitle'
      },
      template: '<div>'
      + '<div class="title" ng-click="toggle()">{{title}}</div>'
      + '<div class="body" ng-show="showMe" ng-transclude></div>'
        + '</div>',
      link: function(scope, element, attrs, accordionController) {  // accordionController is null, expander out need accordion
        scope.showMe = false;
        accordionController.addExpander(scope);  // not read property 'addExpander' of nul
        scope.toggle = function toggle() {
          scope.showMe = !scope.showMe;
          accordionController.gotOpened(scope);
        };
      }
    };
  })

  .directive('accordion', function() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      template: '<div ng-transclude></div>',
      controller: function() {
        var expanders = [];
        this.gotOpened = function(selectedExpander) {
          angular.forEach(expanders, function(expander) {
            if (selectedExpander != expander) {
              expander.showMe = false;
            }
          });
        };
        this.addExpander = function(expander) {
          expanders.push(expander);
        };
      }
    };
  })

  .directive('map', function() {
    return {
      restrict: 'E',
      scope: {
        onCreate: '&'
      },
      link: function ($scope, $element, $attr) {
        function initialize() {
          console.log("element 0 " + $element[0].outerHTML);
          var map = new BMap.Map($element[0]);
          var point = new BMap.Point(116.404, 39.915);
          map.centerAndZoom(point, 15);
          map.enableScrollWheelZoom();

          // 控件
          map.addControl(new BMap.NavigationControl()); // 左上角
          map.addControl(new BMap.ScaleControl());  // 左下角
          map.addControl(new BMap.OverviewMapControl());
          map.addControl(new BMap.MapTypeControl()); // 右上角
          //var opts = {offset: new BMap.Size(150, 5)};
          //var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL};
          map.setCurrentCity("南京");

          // 覆盖物
          var marker = new BMap.Marker(point);
          map.addOverlay(marker);

          // 事件
          map.addEventListener("click", function() {
            alert("you cicked map");
          });
          map.addEventListener("dragend", function() {
            var center = map.getCenter();
            alert("map center change " + center.lng + ", " + center.lat);
          });

          // 图层
          var traffic = new BMap.TrafficLayer();
          map.addTileLayer(traffic);

          // 工具 need three lib
          // var myPushpin = new BMap.PushpinTool(map);
          // myPushpin.addEventListener("markend", function(e) {
          //   alert("you pos " + e.marker.getPoint().lng + ", " + e.marker.getPoint().lat);
          // });
          // myPushpin.open();

          // 服务
          // var local = new BMap.LocalSearch(map, {
          //   renderOptions: {map: map}
          // });
          //var local = new BMap.LocalSearch("南京市", {renderOptions: {map: map, autoViewport: true}, pageCapacity: 8});
          var local = new BMap.LocalSearch(map, {renderOptions: {map: map, panel: "results"}});
          //local.search("东软软件园");
          //local.searchNearby("小吃", "前门");

          var myGeo = new BMap.Geocoder();
          myGeo.getPoint("南京市东软软件园", function(point) {
            if (point) {
              map.centerAndZoom(point, 16);
              map.addOverlay(new BMap.Marker(point));
            }
          }, "南京市"); // 地理编码
          myGeo.getLocation(new BMap.Point(116.364, 39.993), function(result) {
            if (result) {
              alert(result.address);
            }
          });

          $scope.onCreate({map: map});
        }
        window.onload = initialize();
      }
    };
  });
