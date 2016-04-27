'use strict';

/**
 * @ngdoc function
 * @name womai517CouponApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the womai517CouponApp
 */
angular.module('womai517CouponApp')
  .controller('MainCtrl', function ($log, $scope, $location, couponLeft, wxshare) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.settings.bodyClass = '';
    $scope.couponStatus = couponLeft;

    $scope.getCoupon = function (id) {
      if ($scope.couponStatus[id]) {
        $log.debug('Go to register page. coupon id is ', id);
        $scope.settings.couponid = id;
        $location.path('/reg');
      }
    };

    $scope.goToRule = function () {
      $location.path('/rule');
    };

    //wxshare.getShareData()
    //  .then(function (data) {
    //    $log.debug(data);
    //    if (1) {
    //      wxshare.invokeWXShare(data);
    //    }
    //  });
  });
