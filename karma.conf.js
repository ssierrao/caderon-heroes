// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function karmaConfig(config) {
  const webpackConfig = require('./config/webpack.config.js');
  const webpack = require('webpack');

  webpackConfig.entry = undefined;
  webpackConfig.output = undefined;
  // karma is actually very brittle. The commons chunk plugin as well as the define plugin break it, so we
  // disable these
  webpackConfig.plugins = webpackConfig.plugins
    .filter(p => !(p instanceof webpack.optimize.CommonsChunkPlugin))
    .filter(p => !(p instanceof webpack.DefinePlugin));
  webpackConfig.devtool = 'inline-source-map';

  config.set({
    frameworks: [
      'mocha', 'chai', 'sinon', 'sinon-chai'
    ],

    reporters: [
      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      'progress',


      // Reference: https://github.com/karma-runner/karma-junit-reporter
      // Report results in junit xml format
      'junit',
      // Reference: https://github.com/litixsoft/karma-mocha-reporter
      // Report results in mocha format
      'mocha',

      // Reference: https://github.com/dtabuenc/karma-html-reporter
      // Report results in html format
      'html',

      // Reference: https://github.com/webpack-contrib/istanbul-instrumenter-loader
      // Report results in istambul format
      'coverage-istanbul'
    ],

    files: [
      // Grab all files in the app folder that contain .spec.
      'node_modules/sinon-stub-promise/index.js',
      'config/karma-shim.js',
    ],

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'config/karma-shim.js': ['webpack', 'sourcemap']
    },

    // Configure junit test reporter
    junitReporter: {
      outputDir: 'build/test'
    },

    // Configure mocha test reporter
    mochaReporter: {
      output: 'autowatch'
    },

    // Configure html test reporter
    htmlReporter: {
      outputDir: 'build/test',
      focusOnFailures: true,
      namedFiles: false,
      reportName: 'karma-chrome-launcher'
    },

    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true,
      dir: 'build/coverage'
    },

    webpack: webpackConfig,

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: 'errors-only'
    },
    plugins: [
      require('karma-chai'),
      require('karma-remap-coverage'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-mocha'),
      require('karma-mocha-reporter'),
      require('karma-chrome-launcher'),
      require('karma-sinon'),
      require('karma-sinon-chai'),
      require('karma-sourcemap-loader'),
      require('istanbul-lib-coverage'),
      require('karma-webpack')
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: ['Chrome_headless'],
    customLaunchers: {
      Chrome_headless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          ' --remote-debugging-port=9222',
        ]
      }
    },
    singleRun: true,
    concurrency: Infinity,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 50000
  });
};
