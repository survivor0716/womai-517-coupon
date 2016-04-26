'use strict';

/**
 * @ngdoc function
 * @name womai517CouponApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the womai517CouponApp
 */
angular.module('womai517CouponApp')
  .controller('RegisterCtrl', function ($log, $scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings.isRegister = true;

    $scope.submitReg = function () {
      var params = {
        phone: $scope.inputPhone,
        code: $scope.inputCaptcha,
        couponid: $scope.settings.couponid,
        captchaSession: $scope.settings.captchaId
      };
      $log.debug(params);
      $http.post('http://517coupon-01.womai.test.cocos2d-js.cn/submit', params)
        .then(function (response) {
          $log.debug('success: ', response);
        }, function (response) {
          $log.debug('error: ', response);
        })
    };

  });
