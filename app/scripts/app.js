'use strict';

/**
 * @ngdoc overview
 * @name womai517CouponApp
 * @description
 * # womai517CouponApp
 *
 * Main module of the application.
 */
angular
  .module('womai517CouponApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    //'ngTouch',
    'ng-fastclick'
  ], convertTransformRequest)
  .config(function ($logProvider, $routeProvider) {
    $logProvider.debugEnabled(true);

    $routeProvider
      .when('/', {
        templateUrl : 'views/main.html',
        controller  : 'MainCtrl',
        controllerAs: 'main',
        resolve     : {
          couponLeft  : function ($log, $http, $q) {
            return $http.post('http://m.womai.com/517Coupon/couponLeft')
              .then(function (response) {
                if (typeof response.data === 'object') {
                  var data = response.data;
                  $log.debug('couponLeft: ', data);
                  return data.errCode == 0 ? $q.resolve(data.data) : $q.reject(data.errMsg);
                  //return data.data;
                } else {
                  return $q.reject(JSON.stringify(response.data));
                }
              }, function (response) {
                return $q.reject(response.data.errMsg);
              });
          }
        }
      })
      //.when('/reg', {
      //  templateUrl : 'views/register.html',
      //  controller  : 'RegisterCtrl',
      //  controllerAs: 'register'
      //})
      .when('/rule', {
        templateUrl : 'views/rule.html',
        controller  : 'RuleCtrl',
        controllerAs: 'rule'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($log, $rootScope, $route) {
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
      $log.debug('reload');
      //$route.reload();
    });
  });

function convertTransformRequest($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  var param = function (obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function (data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
}
