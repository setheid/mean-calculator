const angular = require('angular');
require('./../../build/app.js');
require('angular-mocks');
let apiRoute = 'http://localhost:3000/calculator';

describe('MEAN Calculator App', () => {
  let appCtrl;

  beforeEach(angular.mock.module('App'));
  beforeEach(angular.mock.inject(function($controller) {
    appCtrl = $controller('AppController');
  }));
  it('should construct a controller', function() {
    expect(typeof appCtrl).toBe('object');
  });
  describe('function to get operations ajax request', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create an array of operations', () => {
      $httpBackend.expectGET(apiRoute)
        .respond(200, {operators: [
          {name:'Add', symbol:'+'},
          {name:'Subtract', symbol:'-'},
          {name:'Multiply', symbol:'*'},
          {name:'Divide', symbol:'/'}
        ]});
      appCtrl.getOperators();
      $httpBackend.flush();
      expect(appCtrl.operators.length).toBe(4);
      expect(appCtrl.operators[0].name).toBe('Add');
    });
  });
});
