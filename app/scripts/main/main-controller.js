'use strict';

/**
 * @ngdoc function
 * @name monsoonProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the monsoonProjectApp
 */
angular.module('monsoonProjectApp.main')
  .controller('MainCtrl', function ($scope, galleryService) {

    galleryService.getAllGalleries()
      .then(function(response) {
        $scope.galleries = response.galleries;
      });
  });
