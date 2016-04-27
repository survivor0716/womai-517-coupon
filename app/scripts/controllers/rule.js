'use strict';

/**
 * @ngdoc function
 * @name womai517CouponApp.controller:RuleCtrl
 * @description
 * # RuleCtrl
 * Controller of the womai517CouponApp
 */
angular.module('womai517CouponApp')
  .controller('RuleCtrl', function ($log, $scope, wxshare) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.settings.bodyClass = 'rule';

    //wxshare.getShareData()
    //  .then(function (data) {
    //    $log.debug(data);
    //    if (1) {
    //      wxshare.invokeWXShare(data);
    //    }
    //  });
  });
