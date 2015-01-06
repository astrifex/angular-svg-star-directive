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
    expect(svg.eq(0).attr('viewBox')).toBe('-11 -11 22 22');

    var star = svg.find('path');
    expect(star.length).toBe(1);

    var path = star.eq(0).prop('pathSegList');
    expect(path).not.toBeNull();
    expect(path.numberOfItems).toBe(11);
  });

  it('should have the right number of segments for its corners', function () {
    var elt = angular.element('<svg-star corners="10"></svg-star>');
    $compile(elt)($rootScope);
    $rootScope.$digest();

    var svg = elt.find('svg');
    expect(svg.length).toBe(1);
    expect(svg.eq(0).attr('viewBox')).toBe('-11 -11 22 22');

    var star = svg.find('path');
    expect(star.length).toBe(1);

    var path = star.eq(0).prop('pathSegList');
    expect(path).not.toBeNull();
    expect(path.numberOfItems).toBe(21);
  });

  it('should change the size when size is given', function () {
    var elt = angular.element('<svg-star size="100"></svg-star>');
    $compile(elt)($rootScope);
    $rootScope.$digest();

    var svg = elt.find('svg');
    expect(svg.length).toBe(1);
    expect(svg.eq(0).attr('viewBox')).toBe('-51 -51 102 102');

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
    var viewBox = svg.eq(0).attr('viewBox').split(' ');
    expect(viewBox.length).toBe(4);
    expect(viewBox[0]).not.toBeGreaterThan(-11);
    expect(viewBox[1]).not.toBeGreaterThan(-11);
    expect(viewBox[2]).not.toBeLessThan(22);
    expect(viewBox[3]).not.toBeLessThan(22);

    var star = svg.find('path');
    expect(star.length).toBe(1);

    var path = star.eq(0).prop('pathSegList');
    expect(path).not.toBeNull();
    expect(path.numberOfItems).toBe(11);
  });

  // TODO: This should actually test that the large positive spoke ratio has
  // the desired effect
  it('should work with a large positive spoke-ratio', function () {
    var elt = angular.element('<svg-star spoke-ratio="10"></svg-star>');
    $compile(elt)($rootScope);
    $rootScope.$digest();

    var svg = elt.find('svg');
    expect(svg.length).toBe(1);
    expect(svg.eq(0).attr('viewBox')).toBe('-11 -11 22 22');

    var star = svg.find('path');
    expect(star.length).toBe(1);

    var path = star.eq(0).prop('pathSegList');
    expect(path).not.toBeNull();
    expect(path.numberOfItems).toBe(11);
  });

  // TODO: This should actually test that the large negative spoke ratio has
  // the desired effect
  it('should work with a large negative spoke-ratio', function () {
    var elt = angular.element('<svg-star spoke-ratio="-10"></svg-star>');
    $compile(elt)($rootScope);
    $rootScope.$digest();

    var svg = elt.find('svg');
    expect(svg.length).toBe(1);
    expect(svg.eq(0).attr('viewBox')).toBe('-11 -11 22 22');

    var star = svg.find('path');
    expect(star.length).toBe(1);

    var path = star.eq(0).prop('pathSegList');
    expect(path).not.toBeNull();
    expect(path.numberOfItems).toBe(11);
  });

  // TODO: This should actually test that skew the desired effect
  it('should work with a skew', function () {
    var elt = angular.element('<svg-star skew="0.5"></svg-star>');
    $compile(elt)($rootScope);
    $rootScope.$digest();

    var svg = elt.find('svg');
    expect(svg.length).toBe(1);
    expect(svg.eq(0).attr('viewBox')).toBe('-11 -11 22 22');

    var star = svg.find('path');
    expect(star.length).toBe(1);

    var path = star.eq(0).prop('pathSegList');
    expect(path).not.toBeNull();
    expect(path.numberOfItems).toBe(11);
  });
});
