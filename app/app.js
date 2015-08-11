'use strict';

window.colocons = angular.module('colocons', ['ui.router', 'ngMaterial']);

colocons.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider.state('index', {
    url: '/',
    views: {
      'menu': {
        controller: 'menuCtrl',
        controllerAs: 'menu'
      },
      'toolbar': {
        controller: 'toolbarCtrl',
        controllerAs: 'toolbar'
      }
    }
  });
  $urlRouterProvider.otherwise('/');
});
colocons.controller('menuCtrl', () => {
  return new class {
    constructor() {
      this.menuLinks = [{
        name: 'Statut',
        href: 'Statut'
      }, {
        name: 'Préférences',
        href: 'Statut'
      }];
    }
  }();
});

colocons.controller('toolbarCtrl', ['$mdSidenav', ($mdSidenav) => {
  return new class {
    constructor() {
      this.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
      };
    }
  }();
}]);
