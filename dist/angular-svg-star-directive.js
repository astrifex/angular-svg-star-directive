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

      var corners, spokeRatio, size, radius, skew, randomness, roundness;
      handleOptions();

      function handleOptions() {
        // numerify val without allowing NaN to creep in
        function numberOrZero(val) { return val ? +val : 0; }

        corners = Math.max(0,Math.floor(numberOrZero(options.corners)));
        spokeRatio = numberOrZero(options.spokeRatio);
        size = numberOrZero(options.size);
        radius = size / 2;
        skew = numberOrZero(options.skew);
        randomness = numberOrZero(options.randomness);
        roundness = numberOrZero(options.roundness);
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
        function step(previousValue, currentValue, index, array) {
          if (currentValue instanceof Array) {
            previousValue[0] = Math.min(previousValue[0], currentValue[0]);
            previousValue[1] = Math.min(previousValue[1], currentValue[1]);
            previousValue[2] = Math.max(previousValue[2], currentValue[0]);
            previousValue[3] = Math.max(previousValue[3], currentValue[1]);
          }
          return previousValue;
        }

        // Calculate bounds as (xmin,ymin,xmax,ymax)
        var bounds = this.getPath().reduce(step, [-radius, -radius, radius, radius]);

        // Convert bounds to viewBox
        bounds[2] = bounds[2] - bounds[0];
        bounds[3] = bounds[3] - bounds[1];

        return bounds;
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

}());