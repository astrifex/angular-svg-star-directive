'use strict';

module.exports = function (grunt, options) {
  return {
    dist: {
      options: {
        banner: '(function() {\n\n"use strict";\n\n',
        footer: '\n}());'
      },
      src: [
        'src/svg-star.js'
      ],
      dest: 'dist/angular-svg-star-directive.pre.js'
    },
    license: {
      src: [
        'src/header-MIT-license.txt',
        'dist/angular-svg-star-directive.min.no-header.js'
      ],
      dest: 'dist/angular-svg-star-directive.min.js'
    }
  };
};
