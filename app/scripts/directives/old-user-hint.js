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
      '<i class="icon"><img src="images/icon/icon_close.png" alt="" ng-click="closeAlertPanel()"></i>' +
      '<ul class="input-group">' +
      '<li>' +
      '<img src="images/cayman.gif" alt="">' +
      '<div>' +
      '<p>{{alertMsg}}</p>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '</div>',
      restrict: 'EA',
      link    : function postLink(scope, element, attrs) {

      }
    };
  });
