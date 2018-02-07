// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.
require('angular');
require('angular-mocks/angular-mocks');

// TODO. Configure js specs
//const context = require.context('../../src/', true, /\.spec\.ts$|\.spec\.js$/);
const context = require.context('./src/', true, /\.spec\.ts$/);
context.keys().forEach(context);
