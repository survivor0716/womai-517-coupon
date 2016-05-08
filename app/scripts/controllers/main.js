'use strict';

/**
 * @ngdoc function
 * @name womai517CouponApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the womai517CouponApp
 */
angular.module('womai517CouponApp')
  .controller('MainCtrl', function ($log, $window, $scope, $http, $q, $timeout, $location, couponLeft, wxshare) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.isOldUser = false;
    $scope.isShowRegPanel = false;
    $scope.isShowAlertPanel = false;
    $scope.disableSubmit = false;
    $scope.btnText = '立即领取';

    $scope.settings.bodyClass = '';
    $scope.couponStatus = couponLeft;

    $scope.getCoupon = function (id) {
      if ($scope.couponStatus[id]) {
        $log.debug('Go to register page. coupon id is ', id);
        $scope.settings.couponid = id;
        $scope.openRegPanel();
      }
    };

    $scope.resetRegPanel = function () {
      $scope.inputPhone = null;
      $scope.inputCaptcha = null;
      $scope.refreshCaptcha();
    };

    $scope.openRegPanel = function () {
      $scope.resetRegPanel();
      $log.debug('open reg panel');
      $scope.isShowRegPanel = true;
    };

    $scope.closeRegPanel = function () {
      $log.debug('close reg panel');
      $scope.isShowRegPanel = false;
    };

    $scope.openAlertPanel = function (msg) {
      $log.debug('open alert panel');
      $scope.isShowAlertPanel = true;
      $scope.alertMsg = msg;
    };

    $scope.closeAlertPanel = function () {
      $log.debug('close alert panel');
      $scope.isShowAlertPanel = false;
      $scope.refreshCaptcha();
    };

    $scope.goToRule = function () {
      $location.path('/rule');
    };

    $scope.submitReg = function () {
      $scope.disableSubmit = true;
      $scope.btnText = '领取ing...';
      var params = {
        phone         : $scope.inputPhone,
        code          : $scope.inputCaptcha,
        couponid      : $scope.settings.couponid,
        captchaSession: $scope.settings.captchaId
      };
      $log.debug(params);
      $http.post('http://m.womai.com/517Coupon/submit', params)
        .then(function (response) {
          if (typeof response.data === 'object') {
            var data = response.data;
            $log.debug('regData: ', data);
            if (!data.errCode) {
              $scope.closeRegPanel();
              $scope.openAlertPanel(data.errMsg);
            } else {
              $scope.openAlertPanel(data.errMsg);
            }
          } else {
            $window.alert('网络异常，请重试');
            $scope.refreshCaptcha();
          }
          $scope.disableSubmit = false;
          $scope.btnText = '立即领取';
        }, function (response) {
          $log.debug('error: ', response);
          $window.alert('网络异常，请重试');
          $scope.refreshCaptcha();
          $scope.disableSubmit = false;
          $scope.btnText = '立即领取';
        });
    };

    $scope.settings.mExtend = [];

  });
