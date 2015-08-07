'use strict';

window.colocons = angular.module('colocons', ['ui.router', 'ngMaterial']);

colocons.config(($stateProvider) => {
  $stateProvider.state('home', {
      url: '/',
      templateUrl: 'partial-home.html'
    });
});
