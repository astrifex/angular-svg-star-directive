angular.module('md5.svg-star', []).
  directive('svgStar', function () {
    var starTemplate =
      '<svg version="1.1" ng-attr-view_box="{{-0.5 * size}} {{-0.5 * size}} {{size}} {{size}}" preserveAspectRatio="xMidYMid meet" class="star-container">' +
      '<path ng-attr-d="{{path}}" ng-attr-fill="{{fill}}" ng-attr-stroke="{{stroke}}" class="star-shape"></path>' +
      '</svg>';

    var calculatePath = function (corners, spokeRatio, radius, skew, randomness) {
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

      var path = ['M'];

      for (var index = 0; index < steps; index++) {
        var outer = index % 2 === 0,
            r = outer ? radius : innerRadius,
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

        var path = calculatePath($scope.corners, $scope.spokeRatio, radius, $scope.skew, $scope.randomness);

        var pathStr = '';
        for (var i = 0; i < path.length; i++) {
          if (pathStr) pathStr += ' ';
          if (Array.isArray(path[i])) {
            pathStr += path[i][0] + ' ' + path[i][1];
          } else {
            pathStr += path[i];
          }
        }

        $scope.path = pathStr;
      };

      $scope.$watchGroup(['size', 'corners', 'spokeRatio', 'skew', 'randomness'], updatePoints);
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
