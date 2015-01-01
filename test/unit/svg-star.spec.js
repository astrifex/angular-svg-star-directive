describe('svgStar', function () {
  var $compile,
      $rootScope;

  beforeEach(module('astrifex.svg-star'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should work as an element', function () {
    var elt = angular.element('<svg-star></svg-star>');
    $compile(elt)($rootScope);
    $rootScope.$digest();

    var svg = elt.find('svg');
    expect(svg.length).toBe(1);
    expect(svg.eq(0).attr('viewBox')).toBe('-10 -10 20 20');

    var star = svg.find('path');
    expect(star.length).toBe(1);

    var path = star.eq(0).prop('pathSegList');
    expect(path).not.toBeNull();
    expect(path.numberOfItems).toBe(11);
  });

  it('should do something random with randomness set', function () {
    var elt = angular.element('<svg-star randomness="0.5"></svg-star>');
    $compile(elt)($rootScope);
    $rootScope.$digest();

    var svg = elt.find('svg');
    expect(svg.length).toBe(1);
    expect(svg.eq(0).attr('viewBox')).toBe('-10 -10 20 20');

    var star = svg.find('path');
    expect(star.length).toBe(1);

    var path = star.eq(0).prop('pathSegList');
    expect(path).not.toBeNull();
    expect(path.numberOfItems).toBe(11);
  });
});
