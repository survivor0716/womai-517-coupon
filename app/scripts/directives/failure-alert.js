'use strict';

/**
 * @ngdoc directive
 * @name womai517CouponApp.directive:failureAlert
 * @description
 * # failureAlert
 */
angular.module('womai517CouponApp')
  .directive('failureAlert', function () {
    return {
      template: '<div class="box">' +
      '<div class="icon" ng-click="closeRegFailure()"><img src="images/icon/icon_close.png" alt=""></div>' +
      '<ul class="input-group">' +
      '<li>' +
      '<img src="images/cayman.gif" alt="">' +
      '<div>' +
      '<p>{{alertMsg}}</p>' +
      '<p ng-show="isTwolineAlert()">{{alertMsg2}}</p>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '</div>',
      restrict: 'EA',
      link    : function postLink(scope, element, attrs) {

      }
    };
  });
