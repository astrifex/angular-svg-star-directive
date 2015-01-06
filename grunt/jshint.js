'use strict';

module.exports = function (grunt, options) {
  return {
    options: {
      node: true
    },
    source: {
      src: ['src/**/*.js']
    },
    tests: {
      src: ['test/**/*.js']
    },
    grunt: {
      src: ['Gruntfile.js', 'grunt/**/*.js']
    }
  };
};
