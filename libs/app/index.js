var test = require('test');

var app = angular.module('app', [
    'ui.router',
    'test'
]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/state1");

    $stateProvider
        .state('state1', {
            url: '/state1',
            template: '<app-test></app-test>'
        })
        .state('state2', {
            url: '/state2',
            template: '<p>State 2</p>'
        });

});

module.exports = app;
