'use strict';

/**
 * @ngdoc function
 * @name womai517CouponApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the womai517CouponApp
 */
angular.module('womai517CouponApp')
  .controller('MainCtrl', function ($log, $scope, $location, couponLeft) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $log.debug(couponLeft);
    $scope.settings.isRegister = false;
    $scope.isOldUser = false;
    $scope.isSoldOut = function () {

    };

    $scope.getCoupon = function (id) {
      $log.debug('Go to register page. coupon id is ', id);
      $scope.settings.couponid = id;
      $location.path('/reg');
    };

    $scope.goToRule = function () {
      $location.path('/rule');
    }
  });
