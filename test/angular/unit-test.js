const angular = require('angular');
require('./../../build/app.js');
require('angular-mocks');

// Run test with 'karma start'
describe('AppController', () => {
  let $httpBackend, createController;
  let apiRoute = 'https://mean-calculator.herokuapp.com/calculator';

  beforeEach(angular.mock.module('App'));

  beforeEach(angular.mock.inject(function($controller, _$httpBackend_) {
    createController = function() {
      return $controller('AppController');
    }
    $httpBackend = _$httpBackend_;

    $httpBackend.expectGET(apiRoute)
      .respond(200, {operators: [
        {name:'Add', symbol:'+'},
        {name:'Subtract', symbol:'-'},
        {name:'Multiply', symbol:'*'},
        {name:'Divide', symbol:'/'}
      ]});
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('functions for calculating operations', () => {

    it('should get an operators array and save as appCtrl.operators', () => {
      let appCtrl = createController();
      $httpBackend.flush();
      expect(appCtrl.operators.length).toBe(4);
      expect(appCtrl.operators[0].name).toBe('Add');
    });

    it('should send operator and numbers and return the calculated result', () => {
      let appCtrl = createController();
      $httpBackend.flush();

      $httpBackend.expectPOST(apiRoute)
        .respond(200, {
          result: {
            operator: '+',
            value1: 7,
            value2: 3,
            result: 10
          }
        });

      appCtrl.calculate({name:'Add',symbol:'+'}, 7, 3);

      $httpBackend.flush();

      expect(appCtrl.results[0].result).toBe(10);
      expect(appCtrl.results[0].operator).toBe('+');
    });
  });
});
