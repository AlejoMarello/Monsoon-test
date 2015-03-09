'use strict';
  /**
  * @ngdoc directive
  * @name monsoonProjectApp.directives.monsoonImage:monsoonImage
  *
  * @description
  * This directive loads an image and shows it only if the image
  * could be loaded correctly
  *
  * @example
  * <monsoon-image
  *   src="imageURL"
  *   holder-class="holderClass">
  * </monsoon-image>
  *
  * @param {String} src, String with the image URL to be shown
  * @param {String} holderClass, optional class name for
  * the holder that is shown until the image is loded properly
  */
angular.module('monsoonProjectApp.directives.monsoonImage', [])
  .directive('monsoonImage', function($timeout) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/monsoon-image/monsoon-image.tpl.html',
      scope: {
        src: '=',
        holderClass: '@'
      },
      link: function postLink(scope, iElement) {
        var imageElement = iElement.find('img');
        imageElement.on('load', function() {
          scope.$apply(function() {
            scope.isLoaded = true;
          });
        });

        scope.$on('$destroy', function() {
          imageElement.off('load');
        });
      }
    };
  });
