'use strict';

angular.module('monsoonProjectApp.services.media')
/**
* @ngdoc service
* @name monsoonProjectApp.services.media.GALLERIES_LOCAL_DATA
*
* @description
* Workaround for crooss-domain errors when trying to load the
* data from a localhost.
*
*/
  .constant('GALLERIES_LOCAL_DATA', {
    'galleries': [
      {
        'id': '1',
        'name': 'This is a very nice gallery of Boston Terriers',
        'image_ids': ['76', '55', '7890']
      },
      {
        'id': '5',
        'name': 'This is probably the best gallery of Boston Terriers',
        'image_ids': ['33', '66', '99']
      },
      {
        'id': '76',
        'name': '14 Boston Terriers that will blow your mind completely.',
        'image_ids': ['33', '76', '1', '2', '3', '4', '5', '7', '6', '8', '9', '10', '11', '12']
      }
    ]
  })
/**
* @ngdoc service
* @name monsoonProjectApp.services.media.LOCAL_STORAGE_GALLERIES_KEY
*
* @description
* Key used for store and retrieve galleries data from localStorage
*
*/
  .constant('LOCAL_STORAGE_GALLERIES_KEY', {
    'value': 'localGalleries'
  })
/**
* @ngdoc service
* @name monsoonProjectApp.services.media.galleryService
*
* @requires $resource
* @requires $q
* @requires localStorageService
* @requires GALLERIES_LOCAL_DATA
* @requires LOCAL_STORAGE_GALLERIES_KEY
*
* @description
* Provides Galleries information
*
*/
  .factory('galleryService', function(
    $resource, $q, localStorageService,
    GALLERIES_LOCAL_DATA, LOCAL_STORAGE_GALLERIES_KEY
  ) {
    var backendResponse,
      allGalleriesUrl = 'http://www.mocky.io/v2/54c0435b7163c98b01384637',
      galleriesResource = $resource(allGalleriesUrl, {}, {
        get: {
          cache: false,
          method: 'GET',
          responseType: 'json'
        }
      });

    function firstTimeLoad() {
      return localStorageService.get(LOCAL_STORAGE_GALLERIES_KEY.value) ||
        galleriesResource.get().$promise
          .catch(function() {
            // in case of an error loading the data from the backend
            // (likely a cross-domain error)
            // the data will be fetched from a constant
            return GALLERIES_LOCAL_DATA;
          })
          .then(function(response) {
            localStorageService.set(LOCAL_STORAGE_GALLERIES_KEY.value, response);
            return backendResponse = response;
          });
    }

    function getAllGalleries() {
      var deferred = $q.defer(),
        finalValue = backendResponse || firstTimeLoad();

      deferred.resolve(finalValue);

      return deferred.promise;
    }

    return {
    /**
    * @ngdoc function
    * @name monsoonProjectApp.services.media#getAllGalleries
    * @methodOf monsoonProjectApp.services.media
    *
    * @description
    * Returns a media object including all the galleries data
    *
    * @return {promise} A promise which will contains an Object with the
    * following structure:
    * {
    *   'galleries': [
    *     {
    *       'id': '1',
    *       'name': 'This is a very nice gallery of Boston Terriers',
    *       'image_ids': ['76', '55', '7890']
    *     }
    *   ]
    * }
    */
      getAllGalleries: getAllGalleries
    };
  });
