'use strict';

/**
 * @ngdoc function
 * @name womai517CouponApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the womai517CouponApp
 */
angular.module('womai517CouponApp')
  .controller('ApplicationCtrl', function ($log, $scope, $window, $location, $http, wxshare, api) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings = {};
    $scope.settings.bodyClass = '';
    $scope.settings.captchaId = null;
    $scope.settings.couponid = null;
    $scope.settings.isShare = false;
    $scope.settings.mExtend = [];
    $scope.settings.sourceId = $location.search().p || '';

    var isTesting = false;
    if ($location.search().lat && $location.search().lng) {
      var testLocation = {
        lat: $location.search().lat,
        lng: $location.search().lng
      };
      isTesting = true;
    }
    $bridge(function (bridge) {
      $scope.share = function () {
        if (wxshare.isWxBrowser()) {
          $scope.settings.isShare = true;
          return;
        }

        var shareData = {
          data: {
            title         : "吃货召集令",
            commonImageUrl: "http://womai2016.cdn.cocos2d-js.cn/Icon/icon_womai_517Coupon.png",
            webUrl        : "http://m.womai.com/517Coupon/web",
            commonText    : "全球美食狂欢节，吃在我买网 ！百万优惠券免费领，是吃货你就来！",
            weiboContent  : "全球美食狂欢节，吃在我买网 ！百万优惠券免费领，是吃货你就来！",
            copyContent   : "全球美食狂欢节，吃在我买网 ！百万优惠券免费领，是吃货你就来！"
          }
        };
        bridge.callHandler('shareToApp', shareData, function (json) {
          $window.alert(json);
        });
      };
    });

    $scope.closeShare = function () {
      $scope.settings.isShare = false;
    };

    $scope._wxConfigArray = {};
    var postUrl = 'http://m.womai.com/517Coupon/getShare';
    var url = encodeURIComponent($window.location.href);
    var params = {url: url};
    $http.post(postUrl, params)
      .then(function (rs) {
        var res = rs.data;
        if (!res.errCode) {
          $scope._wxConfigArray = res.data;

          //wxshare.invokeWXShare($scope._wxConfigArray);

          //微信分享
          wx.config({
            appId    : $scope._wxConfigArray.appId,
            timestamp: parseInt($scope._wxConfigArray.timestamp),
            nonceStr : $scope._wxConfigArray.nonceStr,
            signature: $scope._wxConfigArray.signature,
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
                var location = {};
                location.lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                location.lng = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                location.speed = res.speed; // 速度，以米/每秒计
                location.accuracy = res.accuracy; // 位置精度
                //$window.alert('微信定位成功，位置信息: ' + JSON.stringify(location));
                api.getMExtend(isTesting ? testLocation : location)
                  .then(function (data) {
                    $scope.settings.mExtend = data;
                  }, function (errMsg) {

                  });
              },
              cancel : function (res) {
                $window.alert('用户拒绝授权获取地理位置');
                api.getMExtend()
                  .then(function (data) {
                    $scope.settings.mExtend = data;
                  }, function (errMsg) {

                  });
              }
            });
          });
        } else {
          alert(res.errMsg);
        }
      });

    var locateModule = {
      syncLocate     : function () {
        if ($window.navigator.geolocation) {
          $window.navigator.geolocation.getCurrentPosition(locateModule.locationSuccess, locateModule.locationError, {
            // 指示浏览器获取高精度的位置，默认为false
            enableHighAccuracy: true,
            // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
            timeout           : 5000,
            // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
            maximumAge        : 3000
          });
        } else {
          $window.alert('定位失败, 浏览器不支持获取地理位置');
        }
      },
      locationSuccess: function (position) {
        //$window.alert('locationSuccess: ' + JSON.stringify(position));
        $log.debug('locationSuccess: ', position);
        if (position.coords.longitude == null || position.coords.longitude == undefined || position.coords.longitude == "" ||
          position.coords.latitude == null || position.coords.latitude == undefined || position.coords.latitude == "") {
          //定位失败
          //$window.alert('locationSuccess: 但是无数据' + JSON.stringify(position));
          api.getMExtend()
            .then(function (data) {
              $scope.settings.mExtend = data;
            }, function (errMsg) {

            });
        } else {
          //定位成功
          var location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          //$window.alert('定位成功，位置信息: ' + JSON.stringify(location));
          api.getMExtend(location)
            .then(function (data) {
              $scope.settings.mExtend = data;
            }, function (errMsg) {

            });
        }
      },
      locationError  : function (error) {
        //$window.alert('locationError' + JSON.stringify(error));
        $log.debug('locationError', error);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            //locateModule.dialogfun("定位失败，您拒绝了访问您当前位置的请求，请检查设置打开定位权限或手动选择地址重试");
            break;
          case error.POSITION_UNAVAILABLE:
            //locateModule.dialogfun("定位失败，手动选择地址更精确哦~");
            break;
          case error.TIMEOUT:
            //locateModule.dialogfun("定位失败，手动选择地址更精确哦~");
            break;
          case error.UNKNOWN_ERROR:
            //locateModule.dialogfun("定位失败，手动选择地址更精确哦~");
            break;
        }
        api.getMExtend()
          .then(function (data) {
            $scope.settings.mExtend = data;
          }, function (errMsg) {

          });
      }
    };

    if (!wxshare.isWxBrowser()) {
      if (isTesting) {
        api.getMExtend(testLocation)
          .then(function (data) {
            $scope.settings.mExtend = data;
          }, function (errMsg) {

          });
      } else {
        locateModule.syncLocate();
      }
    }

    $scope.isInApp = function () {
      return false;
    };

    $scope.goToWomai = function () {
      $window.location.href = 'http://m.womai.com/0s4005.shtml?sourceId=' + $scope.settings.sourceId;
    };
  });
