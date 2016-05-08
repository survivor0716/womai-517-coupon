'use strict';

/**
 * @ngdoc function
 * @name womai517CouponApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the womai517CouponApp
 */
angular.module('womai517CouponApp')
  .controller('RegisterCtrl', function ($log, $window, $scope, $http, $location, wxshare) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings.bodyClass = 'register';

    $scope.submitReg = function () {
      var params = {
        phone         : $scope.inputPhone,
        code          : $scope.inputCaptcha,
        couponid      : $scope.settings.couponid,
        captchaSession: $scope.settings.captchaId
      };
      $log.debug(params);
      $http.post('http://m.womai.com/517Coupon/submit', params)
        .then(function (response) {
          $log.debug('success: ', response);
          $window.alert(response.data.errMsg);
          $location.path('/');
        }, function (response) {
          $log.debug('error: ', response);
        });
    };
  });
