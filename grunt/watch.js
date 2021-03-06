'use strict';

module.exports = function (grunt, options) {
    return {
        options : {
            livereload: 7777
        },
        source: {
            files: ['src/**/*.js', 'test/**.js'],
            tasks: [
                'jshint',
                'concat:dist',
                'ngAnnotate',
                'uglify',
                'test-unit',
                'concat:license'
            ]
        }
    };
};
