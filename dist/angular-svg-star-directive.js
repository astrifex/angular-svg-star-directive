(function() {

"use strict";

angular.module('astrifex.svg-star', []).
  directive('svgStar', function () {
    var starTemplate =
      '<svg version="1.1" ng-attr-view_box="{{viewBox}}" preserveAspectRatio="xMidYMid meet" class="star-container">' +
      '<path ng-attr-d="{{path}}" ng-attr-fill="{{fill}}" ng-attr-stroke="{{stroke}}" class="star-shape"></path>' +
      '</svg>';

    function Star(options) {
      if (!(this instanceof Star)) return new Star(options);

      var corners, spokeRatio, size, radius, skew, randomness;
      handleOptions();

      function handleOptions() {
        corners = options.corners;
        spokeRatio = options.spokeRatio;
        size = options.size;
        skew = options.skew;
        randomness = options.randomness;

        radius = size / 2;
      }

      function getPath() {
        var steps = 2 * corners,
            angleStart = -0.5 * Math.PI,
            angleStep = (2 * Math.PI) / steps;

        var outerRadius, innerRadius;
        if (Math.abs(spokeRatio) < 1) {
          outerRadius = radius;
          innerRadius = radius * spokeRatio;
        } else if (spokeRatio > 0) {
          outerRadius = radius / spokeRatio;
          innerRadius = radius;
        } else {
          outerRadius = radius / -spokeRatio;
          innerRadius = -radius;
        }

        skew = skew ? +skew : 0;

        var randomSeed, rng;
        if (randomness) {
          randomSeed = Math.random();
          rng = new Math.seedrandom(randomSeed);
        }

        var path = ['M'];

        for (var index = 0; index < steps; index++) {
          var outer = index % 2 === 0,
              r = outer ? outerRadius : innerRadius,
              sk = outer ? 0 : skew,
              theta = angleStart + (index + sk) * angleStep;

          if (rng) {
            r += randomness * ((rng() * 2 * r) - r);
            theta += randomness * ((rng() * 2 * angleStep) - angleStep);
          }

          path.push([r * Math.cos(theta), r * Math.sin(theta)]);
        }

        path.push('z');

        return path;
      }

      function getViewBox() {
        return [-radius, -radius, size, size];
      }

      this.getPath = getPath;
      this.getViewBox = getViewBox;
    }

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

}());