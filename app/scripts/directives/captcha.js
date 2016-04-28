'use strict';

/**
 * @ngdoc directive
 * @name womai517CouponApp.directive:captcha
 * @description
 * # captcha
 */
angular.module('womai517CouponApp')
  .directive('captcha', function ($log) {
    return {
      template: '',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        scope.refreshCaptcha = function () {
          $log.debug('refresh captcha');
          scope.settings.captchaId = uuid(8, 16);
          $log.debug('captcha id: ', scope.settings.captchaId);
          var url = 'http://517coupon-01.womai.test.cocos2d-js.cn/captcha?captchaSession=' + scope.settings.captchaId;
          element.css({'background': "url('" + url + "') no-repeat 50% 50%", 'background-size': 'cover'});
        };
        scope.refreshCaptcha();
      }
    };
  });

function uuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random()*16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}
