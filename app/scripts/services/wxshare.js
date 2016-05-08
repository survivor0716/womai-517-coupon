'use strict';

/**
 * @ngdoc service
 * @name womai517CouponApp.wxshare
 * @description
 * # wxshare
 * Factory in the womai517CouponApp.
 */
angular.module('womai517CouponApp')
  .factory('wxshare', function ($log, $window, $http, $q, $location, api) {
    // Service logic
    var location = {};

    // Public API here
    return {
      getLocation  : function () {
        return location;
      },
      isWxBrowser  : function () {
        var ua = $window.navigator.userAgent.toLowerCase();
        $log.debug(ua.match(/MicroMessenger/i) == "micromessenger");
        return (ua.match(/MicroMessenger/i) == "micromessenger");
      },
      getShareData : function () {
        $window.alert($location.url());
        return $http.post('http://m.womai.com/517Coupon/getShare', {url: $location.url()})
          .then(function (response) {
            if (typeof response.data === 'object') {
              var data = response.data;
              $log.debug('shareData: ', data);
              return data.errCode == 0 ? $q.resolve(data.data) : $q.reject(data.errMsg);
              //return data.data;
            } else {
              return $q.reject(JSON.stringify(response.data));
            }
          }, function (response) {
            return $q.reject(response.data.errMsg);
          });
      },
      invokeWXShare: function (_wxConfigArray) {
        //微信分享
        wx.config({
          appId    : _wxConfigArray.appId,
          timestamp: parseInt(_wxConfigArray.timestamp),
          nonceStr : _wxConfigArray.nonceStr,
          signature: _wxConfigArray.signature,
          jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "getLocation"
          ]
        });

        wx.error(function (res) {
          for (var i in res) {
            alert(i + "||" + res[i]);
          }
        });

        var shareData = {
          title : '吃货召集令', // 分享标题
          desc  : '全球美食狂欢节，吃在我买网 ！百万优惠券免费领，是吃货你就来！', // 分享描述
          link  : 'http://m.womai.com/517Coupon/web', // 分享链接
          imgUrl: 'http://womai2016.cdn.cocos2d-js.cn/Icon/icon_womai_517Coupon.png'  // 分享图标
        };

        wx.ready(function () {
          $log.debug('wx.ready');
          // 在这里调用 API
          wx.onMenuShareTimeline({
            title  : shareData.desc, // 分享标题
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

          wx.getLocation({
            type   : 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              location.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              location.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              location.speed = res.speed; // 速度，以米/每秒计
              location.accuracy = res.accuracy; // 位置精度
              api.getMExtend(location)
                .then(function (data) {

                }, function (errMsg) {

                });
            }
          });
        });
      }
    };
  });
