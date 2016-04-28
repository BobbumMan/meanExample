describe('PhoneCat controllers', function() {

  beforeEach(module('phonecatApp'));
  beforeEach(module('phonecatServices'));

  beforeEach(function() {
    jasmine.addMatchers({
      toEqualData: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            var result = {};
            result.pass = angular.equals(actual, expected);
            return result
          }
        }
      }
    });
  });

  describe('PhoneListCtrl', function() {

    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend
        .expectGET('phones/phones.json')
        .respond([{name: 'Nexus S'}, {name: "Motorola DROID"}]);

      scope = $rootScope.$new();
      ctrl = $controller('PhoneListCtrl', {$scope:scope});
    }));

    it('should create "phones" model with 2 phones fetched from xhr', function() {
      expect(scope.phones).toEqualData([]);
      $httpBackend.flush();
      expect(scope.phones).toEqualData([{name: 'Nexus S'}, {name: "Motorola DROID"}]);
    })

    it('should set default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });

  });

  describe('PhoneDetailCtrl', function() {

    var scope, ctrl, $httpBackend;
    var xyzPhoneData = function() {
      return {
        name: 'phone xyz',
        images: ['image/url1.png', 'image/url2.png']
      }
    };

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());
      $routeParams.phoneId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
    }));

    it('should fetch phone detail', function() {
      expect(scope.phone).toEqualData([]);
      $httpBackend.flush();
      expect(scope.phone).toEqualData(xyzPhoneData());
    })

  });

});
