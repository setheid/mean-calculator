'use strict';

const express = require('express');
const app = express();
var PORT = process.env.PORT || 3000;

var operators = ['Add', 'Subtract', 'Multiply', 'Divide'];

function calculate(operator, value1, value2) {
  if ( operator == 'Divide' && value2 == 0) return 'Undefined';

  if ( operator == 'Add' )      return value1 + value2;
  if ( operator == 'Subtract' ) return value1 - value2;
  if ( operator == 'Multiply' ) return value1 * value2;
  if ( operator == 'Divide' )   return value1 / value2;
}

app.use(express.static(__dirname + '/build'));
app.use(require('body-parser').json());

app.listen(PORT, () => {
  console.log('server started on port', PORT);
});

app.route('/calculator')

  .get((req, res) => {
    res.json({
      operators
    });
  })

  .post((req, res) => {
    var operator  = req.body.operator;
    var value1    = req.body.value1;
    var value2    = req.body.value2;

    var result = calculate(operator, value1, value2);

    res.json({
      result
    })
  });
