module.exports = function (grunt, options) {
  return {
    dist: {
      files: {
        'dist/angular-svg-star-directive.pre.js': ['src/**/*.js']
      }
    }
  };
};
