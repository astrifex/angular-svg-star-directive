angular.module('md5.svg-star', []).
  directive('svgStar', function () {
    var starTemplate =
      '<svg version="1.1" viewBox="0 0 {{size}} {{size}}" preserveAspectRatio="xMinYMin meet">' +
      '<polygon stroke="black" points="{{points}}"></polygon>' +
      '</svg>';

    var calculatePoints = function (cx, cy, corners, spokeRatio, radius) {
      var angleStart = -0.5 * Math.PI,
          angleEnd = 1.5 * Math.PI,
          angleStep = Math.PI / corners,
          innerRadius = radius * spokeRatio;

      var points = [];

      // XXX: does the angle < angleEnd bounds check need an epsilon?
      for (var angle = angleStart, index = 0; angle < angleEnd; angle += angleStep, index++) {
        var r = index % 2 === 0 ? radius : innerRadius;
        points.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
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

        var points = calculatePoints(radius, radius, $scope.corners, $scope.spokeRatio, radius);

        var pointsStr = '';
        for (var i = 0; i < points.length; i++) {
          if (pointsStr) pointsStr += ' ';
          pointsStr += points[i][0] + ',' + points[i][1];
        }

        $scope.points = pointsStr;
      };

      $scope.$watchGroup(['size', 'corners', 'spokeRatio'], updatePoints);
    };

    return {
      restrict: 'E',
      scope: {
        size: '@',
        corners: '@',
        spokeRatio: '@'
      },
      template: starTemplate,
      compile: compileTemplate
    };
  });
