'use strict';

/**
 * @ngdoc directive
 * @name womai517CouponApp.directive:successAlert
 * @description
 * # successAlert
 */
angular.module('womai517CouponApp')
  .directive('successAlert', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the successAlert directive');
      }
    };
  });
