'use strict';

/**
 * @ngdoc directive
 * @name womai517CouponApp.directive:backTop
 * @description
 * # backTop
 */
angular.module('womai517CouponApp')
  .directive('backTop', function ($log) {
    return {
      //template: '<div></div>',
      restrict: 'EA',
      link    : function postLink(scope, element, attrs) {
        $(element).on("click", function () {
          $("body").animate({
            scrollTop: 0
          }, 300);
        });
      }
    };
  });
