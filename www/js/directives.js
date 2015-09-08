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
  });
