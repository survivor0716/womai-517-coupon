'use strict';

/**
 * @ngdoc directive
 * @name womai517CouponApp.directive:confirmAlert
 * @description
 * # confirmAlert
 */
angular.module('womai517CouponApp')
  .directive('confirmAlert', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the confirmAlert directive');
      }
    };
  });
