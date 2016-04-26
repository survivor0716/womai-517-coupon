'use strict';

describe('Controller: RuleCtrl', function () {

  // load the controller's module
  beforeEach(module('womai517CouponApp'));

  var RuleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RuleCtrl = $controller('RuleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RuleCtrl.awesomeThings.length).toBe(3);
  });
});
