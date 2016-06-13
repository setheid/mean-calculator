'use strict';

const express = require('express');
const app = express();
let PORT = process.env.PORT || 3000;

let operators = [{name:'Add', symbol:'+'}, {name:'Subtract', symbol:'-'}, {name:'Multiply', symbol:'*'}, {name:'Divide', symbol:'/'}];

function calculate(operator, value1, value2) {
  if ( operator == 'Divide' && value2 == 0) return 'Undefined';

  if ( operator == 'Add' )      return value1 + value2;
  if ( operator == 'Subtract' ) return value1 - value2;
  if ( operator == 'Multiply' ) return value1 * value2;
  if ( operator == 'Divide' )   return value1 / value2;
}

app.use(express.static(__dirname + '/build'));
app.use(require('body-parser').json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://mean-calculator.herokuapp.com/calculator');
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

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
    let operator  = req.body.operator.name;
    let value1    = req.body.value1;
    let value2    = req.body.value2;

    let result = calculate(operator, value1, value2);

    res.json({
      result: {
        operator: req.body.operator.symbol,
        value1,
        value2,
        result
      }
    });
  });
