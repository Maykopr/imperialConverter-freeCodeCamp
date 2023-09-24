'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  const convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {

    const input = req.query.input
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    console.log(input, initNum, initUnit)

    if (initNum === undefined && initUnit === undefined) {
      return res.type('text').send("invalid number and unit")
    } else if (initNum === undefined) {
      return res.type('text').send("invalid number")
    } else if (initUnit === undefined) {
      return res.type('text').send("invalid unit")
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    res.json({ initNum, initUnit, returnNum, returnUnit, string: string })

  })

};

