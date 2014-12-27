'use strict';

module.exports = function ngAnnotate(grunt, options) {
  return {
    options: {},
      dist: {
        files: {
          'dist/angular-svg-star-directive.js': [ 'dist/angular-svg-star-directive.pre.js' ]
        }
    }
  };
};
