var app = angular.module('App', []);

app.controller('AppController', ['$http', function($http) {
  // var apiRoute = 'http://localhost:3000/calculator';
  var apiRoute = 'https://mean-calculator.herokuapp.com/calculator';
  var _this = this;

  _this.results = [];
  _this.operators = [];

  $http.get(apiRoute)
  .then(function(res) {
    _this.operators = res.data.operators;
  }, function(res) {
    console.log(res);
  });

  _this.calculate = function(operator, value1, value2) {
    _this.error = validate(operator, value1, value2);

    if (!_this.error) {
      $http.post(apiRoute, {operator, value1, value2})
        .then(function(res) {
          _this.results.push(res.data.result);
        }, function(res) {
          console.log(res);
        });
    }
  }
}]);

function validate(operator, value1, value2) {
  if (!operator) return 'Please select an operator.';
  if ((!value1 && value1 != 0) || (!value1 && value1 != 0)) return 'Please enter two numbers.';
  return null;
}
