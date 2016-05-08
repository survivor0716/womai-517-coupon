'use strict';

describe('Service: sourceId', function () {

  // load the service's module
  beforeEach(module('womai517CouponApp'));

  // instantiate service
  var sourceId;
  beforeEach(inject(function (_sourceId_) {
    sourceId = _sourceId_;
  }));

  it('should do something', function () {
    expect(!!sourceId).toBe(true);
  });

});
