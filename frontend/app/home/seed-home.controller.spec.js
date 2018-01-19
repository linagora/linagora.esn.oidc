'use strict';

/* global chai: false */

var expect = chai.expect;

describe('the seedHomeController', function() {

  var $rootScope, $scope, $controller;

  beforeEach(function() {

    angular.mock.module('linagora.esn.seed');

    angular.mock.inject(function(_$rootScope_, _$controller_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $controller = _$controller_;
    });
  });

  function initController() {
    var bindings = {},
      controller = $controller('seedHomeController',
        {
          $scope: $scope
        },
        bindings);

    $scope.$digest();

    return controller;
  }

  describe('the initialization', function() {
    it('should set $scope.message on init', function() {
      var ctrl = initController();

      expect(ctrl.message).to.equal('Seed home!');
    });
  });
});
