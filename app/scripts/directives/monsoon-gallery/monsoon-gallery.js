'use strict';
  /**
  * @ngdoc directive
  * @name monsoonProjectApp.directives.monsoonGallery:monsoonGallery
  *
  * @description
  * This directive creates an interactive image gallery from an array of image
  * IDs.
  *
  * @example
  * <monsoon-gallery
  *  name="gallery.name"
  *  images="gallery.image_ids"
  *  current="0">
  * </monsoon-gallery>
  *
  * @param {String} name, String with the gallery title
  * @param {Array} images, a non-empty array containing image ids
  * @param {Integer} (optional) current, the current visible image
  * of the gallery. It represents the aray element and will default to 0
  *
  */
angular.module('monsoonProjectApp.directives.monsoonGallery', ['monsoonProjectApp.services'])
  .directive('monsoonGallery', function(imageService) {

    function getNextImagePosition(current, total) {
      current += 1;
      return current >= total ? 0 : current;
    }

    function getLastImagePosition(current, total) {
      current -= 1;
      return current < 0 ? total - 1 : current;
    }

    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/monsoon-gallery/monsoon-gallery.tpl.html',
      scope: {
        name: '=',
        images: '=',
        current: '@'
      },
      link: function postLink(scope, iElement) {

        function setValidCurrent() {
          scope.current = scope.current || 0;
          scope.current = scope.images &&
            scope.images.length &&
            scope.images.length > scope.current &&
            scope.current >= 0 ?
            scope.current :
              (scope.images &&
              scope.images.length &&
              scope.images.length <= scope.current ?
              scope.images.length - 1 :
              undefined);
        }

        function loadCurrentImage() {
          scope.loading = true;
          imageService.getImageById(scope.images[scope.current])
            .then(function(response) {
              //cache buster is added to force image loading
              scope.imageData.url = response.url + '?cb=' + new Date().getTime();
              scope.imageData.title = response.title;
            })
            .finally(function() {
              scope.loading = false;
            });
        }

        function initGallery() {
          setValidCurrent();
          if (!_.isUndefined(scope.current)) {
            scope.invalid = false;
            scope.imageData = {};
            loadCurrentImage();
            scope.onNext = function() {
              scope.current = getNextImagePosition(scope.current, scope.images.length);
              loadCurrentImage(scope);
            };
            scope.onLast = function() {
              scope.current = getLastImagePosition(scope.current, scope.images.length);
              loadCurrentImage(scope);
            };
          }
        }

        scope.invalid = true;

        scope.$watch('images', function() {
          initGallery();
        });
      }
    };
  });
