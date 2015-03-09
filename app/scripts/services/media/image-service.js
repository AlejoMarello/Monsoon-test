'use strict';

angular.module('monsoonProjectApp.services.media')
/**
* @ngdoc service
* @name monsoonProjectApp.services.media.IMAGES_LOCAL_DATA
*
* @description
* Workaround for crooss-domain errors when trying to load the
* data from a localhost.
*
*/
  .constant('IMAGES_LOCAL_DATA', {
    'images': [
      {
        'id': '76',
        'url': 'http://placebeet.com/300x200',
        'title': 'The BT Who Lived'
      },
      {
        'id': '55',
        'url': 'http://placebeet.com/300x200',
        'title': 'The BT Who Dreamt of Stardom'
      },
      {
        'id': '7890',
        'url': 'http://placebeet.com/300x200',
        'title': 'This BT is quite happy'
      },
      {
        'id': '33',
        'url': 'http://placebeet.com/300x200',
        'title': 'The BT of the Future'
      },
      {
        'id': '66',
        'url': 'http://placebeet.com/300x200',
        'title': 'The BT of the Past'
      },
      {
        'id': '99',
        'url': 'http://placebeet.com/300x200',
        'title': 'The BT With Which BT was BT'
      },
      {
        'id': '1',
        'url': 'http://placebeet.com/300x200',
        'title': 'BT'
      },
      {
        'id': '2',
        'url': 'http://placebeet.com/300x200',
        'title': 'BT Senior'
      },
      {
        'id': '3',
        'url': 'http://placebeet.com/300x200',
        'title': 'BT Junior'
      },
      {
        'id': '4',
        'url': 'http://placebeet.com/300x200',
        'title': 'Alpha BT'
      },
      {
        'id': '5',
        'url': 'http://placebeet.com/300x200',
        'title': 'Beta BT'
      },
      {
        'id': '6',
        'url': 'http://placebeet.com/300x200',
        'title': 'Delta BT'
      },
      {
        'id': '7',
        'url': 'http://placebeet.com/300x200',
        'title': 'Gamma BT'
      },
      {
        'id': '8',
        'url': 'http://placebeet.com/300x200',
        'title': 'Zeta BT'
      },
      {
        'id': '9',
        'url': 'http://placebeet.com/300x200',
        'title': 'Four Score and Twelve BTs ago'
      },
      {
        'id': '10',
        'url': 'http://placebeet.com/300x200',
        'title': 'A BT Among BTs'
      },
      {
        'id': '11',
        'url': 'http://placebeet.com/300x200',
        'title': 'Give a man a BT...'
      },
      {
        'id': '12',
        'url': 'http://placebeet.com/300x200',
        'title': 'BTBTBTBTBTBTBTBTBTBTBT'
      }
    ]
  })
/**
* @ngdoc service
* @name monsoonProjectApp.services.media.LOCAL_STORAGE_IMAGES_KEY
*
* @description
* Key used for store and retrieve images data from localStorage
*
*/
  .constant('LOCAL_STORAGE_IMAGES_KEY', {
    'value': 'localImages'
  })
/**
* @ngdoc service
* @name monsoonProjectApp.services.media.imageService
*
* @requires $resource
* @requires $q
* @requires localStorageService
* @requires IMAGES_LOCAL_DATA
* @requires LOCAL_STORAGE_IMAGES_KEY
*
* @description
* Provides Images information
*
*/
  .factory('imageService', function(
    $resource, $q, localStorageService,
    IMAGES_LOCAL_DATA, LOCAL_STORAGE_IMAGES_KEY
  ) {
    var backendResponse,
      allImagesUrl = 'http://www.mocky.io/v2/54c044327163c99701384639',
      imagesResource = $resource(allImagesUrl, {}, {
        get: {
          cache: false,
          method: 'GET',
          responseType: 'json'
        }
      });

    function firstTimeLoad() {
      return localStorageService.get(LOCAL_STORAGE_IMAGES_KEY.value) ||
        imagesResource.get().$promise
          .catch(function() {
            // in case of an error loading the data from the backend
            // (likely a cross-domain error)
            // the data will be fetched from a constant
            return IMAGES_LOCAL_DATA;
          })
          .then(function(response) {
            localStorageService.set(LOCAL_STORAGE_IMAGES_KEY.value, response);
            return backendResponse = response;
          });
    }

    function getAllImages() {
      var deferred = $q.defer(),
        finalValue = backendResponse || firstTimeLoad();

      deferred.resolve(finalValue);

      return deferred.promise;
    }

    function getImageById(id) {
      return getAllImages()
        .then(function(response) {
          return _.find(response.images, {'id': id});
        })
    }

    return {
    /**
    * @ngdoc function
    * @name monsoonProjectApp.services.media#getAllImages
    * @methodOf monsoonProjectApp.services.media
    *
    * @description
    * Returns a media object including all the images data
    *
    * @return {promise} A promise which will contains an Object with the
    * following structure:
    * {
    *   'images': [
    *     {
    *       'id': '1',
    *       'url': 'http://placebeet.com/300x200',
    *       'title': 'a title'
    *     }
    *   ]
    * }
    */
      getAllImages: getAllImages,
    /**
    * @ngdoc function
    * @name monsoonProjectApp.services.media#getImageById
    * @methodOf monsoonProjectApp.services.media
    *
    * @description
    * Returns a media object with the data from one img
    *
    * @param {String} An image id
    *
    * @return {promise} A promise which will contains an Object with the
    * following structure:
    *
    *     {
    *       'id': '1',
    *       'url': 'http://placebeet.com/300x200',
    *       'title': 'a title'
    *     }
    */
      getImageById: getImageById
    };
  });
