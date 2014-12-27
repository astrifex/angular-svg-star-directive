angular.module('md5.svg-star', []).
  directive('svgStar', function () {
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

    var starTemplate = function (elt, attrs) {
      var size       = attrs.size           || defaultSize,
          corners    = attrs.corners        || defaultCorners,
          spokeRatio = attrs['spoke-ratio'] || defaultSpokeRatio,
          radius     = size / 2;

      var points = calculatePoints(radius, radius, corners, spokeRatio, radius);

      var pointsStr = '';
      for (var i = 0; i < points.length; i++) {
        if (pointsStr) pointsStr += ' ';
        pointsStr += points[i][0] + ',' + points[i][1];
      }

      return '<svg version="1.1" viewBox="0 0 ' + size + ' ' + size + '" preserveAspectRatio="xMinYMin meet">' +
             '<polygon stroke="black" points="' + pointsStr + '"></polygon>' +
             '</svg>';
    };

    return { restrict: 'E', template: starTemplate };
  });
