(function() {

"use strict";

angular.module('md5.svg-star', []).
  directive('svgStar', function () {
    var starTemplate =
      '<svg version="1.1" viewBox="{{-0.5 * size}} {{-0.5 * size}} {{size}} {{size}}" preserveAspectRatio="xMidYMid meet" class="star-container">' +
      '<polygon points="{{points}}" fill="{{fill}}" stroke="{{stroke}}" class="star-shape"></polygon>' +
      '</svg>';

    var calculatePoints = function (corners, spokeRatio, radius, skew, randomness) {
      var steps = 2 * corners,
          angleStart = -0.5 * Math.PI,
          angleStep = (2 * Math.PI) / steps,
          innerRadius = radius * spokeRatio;

      skew = skew ? +skew : 0;

      var randomSeed, rng;
      if (randomness) {
        randomSeed = Math.random();
        rng = new Math.seedrandom(randomSeed);
      }

      var points = [];

      for (var index = 0; index < steps; index++) {
        var outer = index % 2 === 0,
            r = outer ? radius : innerRadius,
            sk = outer ? 0 : skew,
            theta = angleStart + (index + sk) * angleStep;

        if (rng) {
          r += randomness * ((rng() * 2 * r) - r);
          theta += randomness * ((rng() * 2 * angleStep) - angleStep);
        }

        points.push([r * Math.cos(theta), r * Math.sin(theta)]);
      }

      return points;
    };

    var defaultSize = 20,
        defaultCorners = 5,
        defaultSpokeRatio = 0.5;

    var compileTemplate = function (elt, attrs) {
      if (!attrs.size) attrs.size = defaultSize;
      if (!attrs.corners) attrs.corners = defaultCorners;
      if (!attrs.spokeRatio) attrs.spokeRatio = defaultSpokeRatio;

      return { post: linkTemplate };
    };

    var linkTemplate = function ($scope, elt, attrs) {
      var updatePoints = function () {
        var radius = $scope.size / 2;

        var points = calculatePoints($scope.corners, $scope.spokeRatio, radius, $scope.skew, $scope.randomness);

        var pointsStr = '';
        for (var i = 0; i < points.length; i++) {
          if (pointsStr) pointsStr += ' ';
          pointsStr += points[i][0] + ',' + points[i][1];
        }

        $scope.points = pointsStr;
      };

      // XXX: Requires Angular 1.3
      //$scope.$watchGroup(['size', 'corners', 'spokeRatio', 'skew', 'randomness'], updatePoints);
      $scope.$watch('size+","+corners+","+spokeRatio+","+skew+","+randomness', updatePoints);
    };

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
      compile: compileTemplate
    };
  });

}());