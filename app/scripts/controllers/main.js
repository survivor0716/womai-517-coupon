'use strict';

/**
 * @ngdoc function
 * @name womai517CouponApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the womai517CouponApp
 */
angular.module('womai517CouponApp')
  .controller('MainCtrl', function ($log, $scope, $location, couponLeft, getShareData) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.settings.bodyClass = '';
    $scope.couponStatus = couponLeft;
    $scope.shareData = getShareData;
    $scope.isOldUser = false;
    $scope.isSoldOut = function () {

    };

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

    if (0) {
      //微信分享
      var _wxConfigArray = getShareData;
      wx.config({
        appId    : _wxConfigArray.appId,
        timestamp: _wxConfigArray.timestamp,
        nonceStr : _wxConfigArray.nonceStr,
        signature: _wxConfigArray.signature,
        jsApiList: [
          // 所有要调用的 API 都要加到这个列表中
          "onMenuShareTimeline",
          "onMenuShareAppMessage"
        ]
      });

      wx.error(function (res) {
        for (var i in res) {
          alert(i + "||" + res[i]);
        }
      });

      var shareData = {
        title : '517卡券title', // 分享标题
        desc  : '517卡券分享描述', // 分享描述
        link  : 'http://m.womai.com/517Coupon/web', // 分享链接
        imgUrl: 'http://wx.willar.net/sharelogo/adb_sharelogo.jpg'  // 分享图标
      };

      wx.ready(function () {
        // 在这里调用 API
        wx.onMenuShareTimeline({
          title  : shareData.title, // 分享标题
          link   : shareData.link, // 分享链接
          imgUrl : shareData.imgUrl, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            // alert("share success");
          },
          cancel : function () {
            // 用户取消分享后执行的回调函数
            // alert("share canceled");
          }
        });

        wx.onMenuShareAppMessage({
          title  : shareData.title, // 分享标题
          link   : shareData.link, // 分享链接
          desc   : shareData.desc, // 分享描述
          imgUrl : shareData.imgUrl, // 分享图标
          type   : '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
            // alert("share success");
          },
          cancel : function () {
            // 用户取消分享后执行的回调函数
            // alert("shareF canceled");
          }
        });
      });
    }
  });
