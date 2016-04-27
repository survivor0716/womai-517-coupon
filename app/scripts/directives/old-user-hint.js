'use strict';

/**
 * @ngdoc directive
 * @name womai517CouponApp.directive:oldUserHint
 * @description
 * # oldUserHint
 */
angular.module('womai517CouponApp')
  .directive('oldUserHint', function () {
    return {
      template: '<div class="box">' +
      '<i class="icon"><img src="images/icon/icon_close.png" alt="" ng-click="closeHint()"></i>' +
      '<ul class="input-group">' +
      '<li>' +
      '<img src="images/cayman.gif" alt="">' +
      '<div>' +
      '<p>很抱歉您不是新用户</p>' +
      '<p>您可以领取老用户专享券哦</p>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '</div>',
      restrict: 'EA',
      link    : function postLink(scope, element, attrs) {
        scope.closeHint = function () {
          element.hide();
        };
      }
    };
  });
