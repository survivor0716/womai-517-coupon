'use strict';

describe('Directive: closeHint', function () {

  // load the directive's module
  beforeEach(module('womai517CouponApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<close-hint></close-hint>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the closeHint directive');
  }));
});
