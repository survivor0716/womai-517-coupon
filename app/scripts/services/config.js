'use strict';

/**
 * @ngdoc service
 * @name womai517CouponApp.config
 * @description
 * # config
 * Constant in the womai517CouponApp.
 */

var LBS_URL = 'http://m.womai.com/517Coupon';
var TEST_URL = 'http://517coupon-02.womai.test.paymew.com';
angular.module('womai517CouponApp')
  .constant('config', {
    getMExtend: LBS_URL + '/getMExtend',
    getCoupon: LBS_URL + '/submit'
  });
