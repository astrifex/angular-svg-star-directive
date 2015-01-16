exports.Star = Star;

function Star(options) {
  if (!(this instanceof Star)) return new Star(options);

  // Settings provided by options
  var corners, spokeRatio, size, skew, randomness, roundness;

  // Derived values
  var radius, angleStep;

  // Exposed methods
  this.getPath = getPath;
  this.getViewBox = getViewBox;

  // Handle passed-in options
  (function handleOptions() {
    // numerify val without allowing NaN to creep in
    function numberOrZero(val) { return +val || 0; }

    corners = Math.max(0,Math.floor(numberOrZero(options.corners)));
    spokeRatio = numberOrZero(options.spokeRatio);
    size = numberOrZero(options.size);
    skew = numberOrZero(options.skew);
    randomness = numberOrZero(options.randomness);
    roundness = numberOrZero(options.roundness);

    radius = size / 2;
    angleStep = Math.PI / corners;
  })();

  // Returns a path array with SVG path-ops and *polar* coordinate pairs
  function calculateBasePath() {
    if (corners <= 0) return [];

    var outerRadius, innerRadius;
    if (Math.abs(spokeRatio) < 1) {
      outerRadius = size / 2;
      innerRadius = outerRadius * spokeRatio;
    } else {
      innerRadius = size / (spokeRatio > 0 ? 2 : -2);
      outerRadius = innerRadius / spokeRatio;
    }

    var basePath = ['M'];
    var angleStart = -0.5 * Math.PI;
    for (var index = 0; index < corners; index++) {
      // Point on outer ring
      basePath.push([outerRadius, angleStart + angleStep * (2 * index)]);
      // Point on inner ring
      basePath.push([innerRadius, angleStart + angleStep * ((2 * index + 1) + skew)]);
    }
    basePath.push('z');

    return basePath;
  }

  var path;
  function getPath() {
    if (!path) {
      // Calculate the base path in polar coordinates
      path = calculateBasePath();

      // Jitter the path if randomness is specified
      if (randomness) {
        var rng = new Math.seedrandom();
        var randomBetween = function randomBetween(min, max) {
          return rng() * (max - min) + min;
        };

        path = path.map(function (elem) {
          if (elem instanceof Array) {
            var r = elem[0], theta = elem[1];
            elem = [
              r     + randomness * randomBetween(-r, r),
              theta + randomness * randomBetween(-angleStep, angleStep)
            ];
          }
          return elem;
        });
      }

      // Map polar coordinates to Cartesian
      path = path.map(function (elem) {
        if (elem instanceof Array) {
          var r = elem[0], theta = elem[1];
          elem = [r * Math.cos(theta), r * Math.sin(theta)];
        }
        return elem;
      });
    }
    return path;
  }

  function getViewBox() {
    function step(previousValue, currentValue) {
      if (currentValue instanceof Array) {
        previousValue[0] = Math.min(previousValue[0], currentValue[0]);
        previousValue[1] = Math.min(previousValue[1], currentValue[1]);
        previousValue[2] = Math.max(previousValue[2], currentValue[0]);
        previousValue[3] = Math.max(previousValue[3], currentValue[1]);
      }
      return previousValue;
    }

    // Calculate bounds as (xmin,ymin,xmax,ymax)
    var bounds = this.getPath().reduce(step, [0, 0, 0, 0]);

    // Calculate half-side of the viewBox (add fudge-factor of 1 for default stroke-width)
    var halfSide = 1 + Math.max(-bounds[0], -bounds[1], bounds[2], bounds[3], size / 2);

    // Calculate the viewBox
    return [-halfSide,-halfSide,2*halfSide,2*halfSide];
  }
}
