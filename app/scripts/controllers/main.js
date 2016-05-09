'use strict';

/**
 * @ngdoc function
 * @name womai517CouponApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the womai517CouponApp
 */
angular.module('womai517CouponApp')
  .controller('MainCtrl', function ($log, $window, $scope, $timeout, $location, couponLeft, wxshare, api) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.isOldUser = false;
    $scope.showReg = false;
    $scope.showSuccess = false;
    $scope.showFailure = false;
    $scope.showConfirm = false;
    $scope.disableSubmit = false;
    $scope.btnText = '立即领取';

    $scope.settings.bodyClass = '';
    $scope.couponStatus = couponLeft;

    $scope.getCouponId = function (id) {
      if ($scope.couponStatus[id]) {
        $log.debug('Go to register page. coupon id is ', id);
        $scope.settings.couponid = id;
        if ($window.localStorage.coupon517) {
          $scope.openConfirm();
        } else {
          $scope.openRegPanel();
        }
      }
    };

    $scope.resetRegPanel = function () {
      $scope.inputPhone = null;
      $scope.inputCaptcha = null;
      $scope.refreshCaptcha();
    };

    $scope.openRegPanel = function () {
      $scope.closeAll();
      $scope.resetRegPanel();
      $log.debug('open reg panel');
      $scope.showReg = true;
    };

    $scope.closeRegPanel = function () {
      $log.debug('close reg panel');
      $scope.showReg = false;
    };

    $scope.isTwolineAlert = function () {
      return $scope.settings.errCode == 400041 || $scope.settings.errCode == 400042 || $scope.settings.errCode == 400043 || $scope.settings.errCode == 400044;
    };

    $scope.openRegFailure = function (data) {
      $scope.closeAll();
      $log.debug('open failure alert panel');
      $scope.showFailure = true;
      $scope.settings.errCode = data.errCode;
      switch ($scope.settings.errCode) {
        case 400041:
          $scope.alertMsg = '很抱歉未注册用户';
          $scope.alertMsg2 = '限领1张哦';
          break;
        case 400042:
          $scope.alertMsg = '很抱歉普通会员&铜牌会员用户';
          $scope.alertMsg2 = '限领3张哦';
          break;
        case 400043:
          $scope.alertMsg = '很抱歉白银VIP&黄金VIP用户';
          $scope.alertMsg2 = '限领4张哦';
          break;
        case 400044:
          $scope.alertMsg = '很抱歉白金VIP&钻石VIP用户';
          $scope.alertMsg2 = '限领6张哦';
          break;
        default :
          $scope.alertMsg = data.errMsg;
          $scope.alertMsg2 = null;
      }
      $timeout(function () {
        $scope.closeRegFailure();
      }, 2500);
    };

    $scope.closeRegFailure = function () {
      $log.debug('close failure alert panel');
      $scope.showFailure = false;
      $scope.refreshCaptcha();
    };

    $scope.openRegSuccess = function () {
      $scope.closeAll();
      $log.debug('open success alert panel');
      $scope.showSuccess = true;
    };

    $scope.closeRegSuccess = function () {
      $log.debug('close success alert panel');
      $scope.showSuccess = false;
    };

    $scope.openConfirm = function () {
      $scope.closeAll();
      $log.debug('open confirm alert panel');
      $scope.showConfirm = true;
    };

    $scope.closeConfirm = function () {
      $log.debug('close confirm alert panel');
      $scope.showConfirm = false;
    };

    $scope.closeAll = function () {
      $scope.showReg = false;
      $scope.showSuccess = false;
      $scope.showFailure = false;
      $scope.showConfirm = false;
    };

    $scope.goChecking = function () {
      $window.location.href = 'http://m.womai.com/sso/mobileRegister.action?sourceId=' + $scope.settings.sourceId;
    };

    $scope.goShopping = function () {
      $window.location.href = 'http://m.womai.com?sourceId=' + $scope.settings.sourceId;
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
        captchaSession: $scope.settings.captchaId,
        sourceId      : $scope.settings.sourceId
      };
      $log.debug(params);
      api.getCoupon(params)
        .then(function (response) {
          if (typeof response.data === 'object') {
            var data = response.data;
            $log.debug('regData: ', data);
            if (!data.errCode) {
              $scope.openRegSuccess(params.phone);
              $scope.user.phone = params.phone;
              $scope.user.token = data.data;
              $window.localStorage.coupon517 = JSON.stringify($scope.user);
            } else {
              $scope.openRegFailure(data);
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

    $scope.getCoupon = function () {
      $scope.disableConfirmYesBtn = true;
      if ($window.localStorage.coupon517) {
        $scope.user = JSON.parse($window.localStorage.coupon517);
      }
      var params = {
        phone   : $scope.user.phone,
        couponid: $scope.settings.couponid,
        token   : $scope.user.token,
        sourceId: $scope.settings.sourceId
      };
      $log.debug('confirm submit: ', params);
      api.getCoupon(params)
        .then(function (response) {
          if (typeof response.data === 'object') {
            var data = response.data;
            $log.debug('regData: ', data);
            if (!data.errCode) {
              $scope.openRegSuccess();
            } else {
              $scope.openRegFailure(data);
            }
          } else {
            $window.alert('网络异常，请重试');
            $scope.refreshCaptcha();

          }
          $scope.disableConfirmYesBtn = false;
        }, function (response) {
          $log.debug('error: ', response);
          $window.alert('网络异常，请重试');
          $scope.refreshCaptcha();
          $scope.disableConfirmYesBtn = false;
        });
    };

    $scope.backTop = function () {
      $location.path('/main#aaa');
    };

    $scope.settings.mExtend = [];

  });
