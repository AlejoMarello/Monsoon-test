'use strict';

/**
 * @ngdoc function
 * @name monsoonProjectApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the monsoonProjectApp
 */
angular.module('monsoonProjectApp.about')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
