describe('svgStar', function () {
  var $compile,
      $rootScope;

  beforeEach(module('md5.svg-star'));

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
    expect(svg.eq(0).attr('viewBox')).toBe('0 0 20 20');

    var star = svg.find('polygon');
    expect(star.length).toBe(1);

    var points = star.eq(0).prop('points');
    expect(points).not.toBeNull();
    expect(points.numberOfItems).toBe(10);
  });
});
