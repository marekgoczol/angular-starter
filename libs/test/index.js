var test = angular.module('test', []);

test.directive('appTest', require('./app-test-directive.js'));

module.exports = test;
