'use strict';

let chai = require('chai');
let chaiHTTP = require('chai-http'); chai.use(chaiHTTP);
let request = chai.request;
let expect = chai.expect;

require('./../../server.js');

// Run test with 'gulp'
describe('Node.js Server', () => {
  it('should send an operators array on GET requests', (done) => {
    request('localhost:3000')
    .get('/calculator')
    .end((err, res) => {
      // expect(true).eql(false);
      expect(res.body).to.eql({operators: [
        {name:'Add', symbol:'+'},
        {name:'Subtract', symbol:'-'},
        {name:'Multiply', symbol:'*'},
        {name:'Divide', symbol:'/'}
      ]});
      done();
    });
  });

  it('should send a calculated result along with the selected operator and numbers', (done) => {
    var operation = {operator:{name:'Add',symbol:'+'}, value1:7, value2:3};
    request('localhost:3000')
    .post('/calculator')
    .send(operation)
    .end((err, res) => {
      // expect(true).eql(false);
      expect(res.body).to.eql({result: {
        operator: '+',
        value1: 7,
        value2: 3,
        result: 10 }
      });
      done();
    });
  });
});
