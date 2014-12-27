'use strict';

module.exports = function (grunt, options) {
  return {
    options: {
      node: true
    },
    source: {
      src: ['svg-star.js', 'src/directives/*.js', 'src/services/*.js']
    },
    tests: {
      src: ['test/unit/*.js', 'test/e2e/*.js']
    },
    grunt: {
      src: ['Gruntfile.js', 'grunt/**/*.js']
    }
  };
};
