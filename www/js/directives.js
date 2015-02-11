angular.module('starter.directives', [])

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
      scope: {
        title: '=expanderTitle'
      },
      template: '<div>'
      + '<div class="title" ng-click="toggle()">{{title}}</div>'
      + '<div class="body" ng-show="showMe" ng-transclude></div>'
        + '</div>',
      link: function(scope, element, attrs) {
        scope.showMe = false;
        scope.toggle = function toggle() {
          scope.showMe = !scope.showMe;
        }
      }
    }
  });