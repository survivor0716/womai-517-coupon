'use strict';

/**
 * @ngdoc service
 * @name womai517CouponApp.api
 * @description
 * # api
 * Factory in the womai517CouponApp.
 */
angular.module('womai517CouponApp')
  .factory('api', function ($log, $http, $q, $window, config) {
    // Service logic
    function requestSuccess(response) {
      if (typeof response.data === 'object') {
        var data = response.data;
        if (!data.errCode) {
          $log.debug(data);
          return $q.resolve(data.data);
        } else {
          return $q.reject(data.errMsg);
        }
      } else {
        return $q.reject(JSON.stringify(response));
      }
    }

    function requestFail(response) {
      return $q.reject(JSON.stringify(response));
    }

    // Public API here
    return {
      getMExtend: function (location) {
        var params = location || {};
        //$window.alert('请求参数: location: ' + JSON.stringify(params));
        return $http.post(config.getMExtend, params)
          .then(requestSuccess, requestFail);
      }
    };
  });
