'use strict';

/**
 * @ngdoc directive
 * @name womai517CouponApp.directive:closeHint
 * @description
 * # closeHint
 */
angular.module('womai517CouponApp')
  .directive('closeHint', function () {
    return {
      template: '<i class="icon"><img src="images/icon/icon_close.png" alt="" ng-click="closeRegPanel()"></i>',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
