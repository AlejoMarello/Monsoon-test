'use strict';

/**
 * @ngdoc overview
 * @name monsoonProjectApp
 * @description
 * # monsoonProjectApp
 *
 * Main module of the application.
 */
angular
  .module('monsoonProjectApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule',
    'monsoonProjectApp.directives',
    'monsoonProjectApp.services',
    'monsoonProjectApp.main',
    'monsoonProjectApp.about'
  ])
  .config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

    // set the routes using ui.router

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'scripts/main/main.tpl.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'scripts/about/about.tpl.html',
        controller: 'AboutCtrl'
      });

    // set the prefix for localStorage

    localStorageServiceProvider
      .setPrefix('monsoonApp');
  });
