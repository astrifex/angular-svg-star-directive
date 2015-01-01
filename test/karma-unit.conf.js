module.exports = function (config) {
  config.set({
    basePath: '../',
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/seedrandom/seedrandom.js',
      'dist/angular-svg-star-directive.js',
      'test/unit/*.js'
    ],

    reporters: ['progress'],

    port: 9876,
    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],

    captureTimeout: 60000,

    autoWatch: false,
    singleRun: true
  });
};
