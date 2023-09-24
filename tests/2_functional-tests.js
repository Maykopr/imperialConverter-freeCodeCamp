const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

  test("Convert 10L (valid input)", function (done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, '10');
        assert.equal(res.body.initUnit, 'L');
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, 'gal');
        assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
        done();
      })
  })

  test("Convert 32g (invalid input)", function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid unit');
        done();
      })
  })
  test("Convert 3/7.2/4kg (invalid input)", function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number');
        done();
      })
  })
  test("Convert 3/7.2/4kilomegagram (invalid input)", function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number and unit');
        done();
      })
  })
  test("Convert km (valid input)", function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'km' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, '1');
        assert.equal(res.body.initUnit, 'km');
        assert.equal(res.body.returnNum, 0.62137);
        assert.equal(res.body.returnUnit, 'mi');
        assert.equal(res.body.string, '1 kilometers converts to 0.62137 miles');
        done();
      })
  })

})
