module.exports = function(config) {
  config.set({
    basePath: '../',
    files: [
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-route/angular-route.js',
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/js/**/*.js',
      'test/unit/**/*.js'
    ],
    autowatch: true,
    frameworks: ['jasmine'],
    browsers: ['Firefox'],
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],
    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};