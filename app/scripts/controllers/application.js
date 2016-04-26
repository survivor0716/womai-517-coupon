'use strict';

/**
 * @ngdoc function
 * @name womai517CouponApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the womai517CouponApp
 */
angular.module('womai517CouponApp')
  .controller('ApplicationCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings = {};
    $scope.settings.isRegister = false;
    $scope.settings.captchaId = null;
    $scope.settings.couponid = null;

    $scope.share = function () {
      $bridge(function (bridge) {
        $("#btnShare").on('click', function () {
          var shareData = {
            "data": {
              "title"         : "我买网双十一送钱到家！砸金蛋拿豪礼爽购狂欢等你来！",
              "commonImageUrl": "http://html5-web.cocos2d-js.cn/sharelogo/womai_1111_sharelogo.png",
              "webUrl"        : "http://game.cocos2d-js.cn/Womai11/Index/index",
              "commonText"    : "狂欢双十一我买网砸金蛋抢豪礼，一年爽一次，这次不能错过啊！快帮我爽一下！",
              "weiboContent"  : "狂欢双十一我买网砸金蛋抢豪礼，一年爽一次，这次不能错过啊！快帮我爽一下！",
              "copyContent"   : "狂欢双十一我买网砸金蛋抢豪礼，一年爽一次，这次不能错过啊！快帮我爽一下！"
            }
          };
          bridge.callHandler('shareToApp', shareData, function (json) {
            alert(json);
          });

        });
      });
    }
  });
