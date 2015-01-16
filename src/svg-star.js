var Star = require('./star').Star;

angular.module('astrifex.svg-star', []).
  directive('svgStar', function () {
    var starTemplate =
      '<svg version="1.1" ng-attr-view_box="{{viewBox}}" preserveAspectRatio="xMidYMid meet" class="star-container">' +
      '<path ng-attr-d="{{path}}" ng-attr-fill="{{fill}}" ng-attr-stroke="{{stroke}}" class="star-shape"></path>' +
      '</svg>';

    var defaultSize = 20,
        defaultCorners = 5,
        defaultSpokeRatio = 0.5;

    return {
      restrict: 'E',
      scope: {
        size: '@',
        corners: '@',
        spokeRatio: '@',
        skew: '@',
        randomness: '@',
        roundness: '@',
        fill: '@',
        stroke: '@'
      },
      template: starTemplate,
      compile: function compileSvgStar(elt, attrs) {
        if (!attrs.size) attrs.size = defaultSize;
        if (!attrs.corners) attrs.corners = defaultCorners;
        if (!attrs.spokeRatio) attrs.spokeRatio = defaultSpokeRatio;

        return function linkSvgStar($scope, elt, attrs) {
          $scope.$watchGroup(['size', 'corners', 'spokeRatio', 'skew', 'randomness'], function updateStar() {
            var star = new Star({
              corners: $scope.corners,
              spokeRatio: $scope.spokeRatio,
              size: $scope.size,
              skew: $scope.skew,
              randomness: $scope.randomness
            });

            $scope.viewBox = star.getViewBox().join(' ');
            $scope.path = star.getPath().join(' ');
          });
        };
      }
    };
  });
