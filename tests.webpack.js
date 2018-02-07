// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.
require('@angular');
require('zone.js');
require('@angular/core/testing');
require('@angular/platform-browser-dynamic/testing');

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
var __karma__;
var require;

// Prevent Karma from running prematurely.
__karma__.loaded = function () {
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./src', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
