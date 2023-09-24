const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test("Whole number input", function () {
    const input = "32L";
    assert.equal(convertHandler.getNum(input), "32")
  })
  test("Decimal input", function () {
    const input = "3.2L";
    assert.equal(convertHandler.getNum(input), "3.2")
  })
  test("Fractional input", function () {
    const input = "6/2L";
    assert.equal(convertHandler.getNum(input), "3")
  })
  test("Fractional w/ decimal input", function () {
    const input = "5/2.5L";
    assert.equal(convertHandler.getNum(input), "2")
  })

  test("error on a double-fraction", function () {
    const input = "3/2/2";
    assert.equal(convertHandler.getNum(input), undefined)
  })
  test("No numerical input", function () {
    const input = "L";
    assert.equal(convertHandler.getNum(input), 1)
  })
  test("for each input assert the output", function () {
    const input = ['km', 'mi', 'kg', 'lbs', 'L', 'gal', 'GAL', 'l', 'LBS']
    const output = ['km', 'mi', 'kg', 'lbs', 'L', 'gal', 'gal', 'L', 'lbs'];

    input.forEach((el, index) => {
      assert.equal(convertHandler.getUnit(el), output[index])
    })
  })
  test("unknown unit input", function () {
    const input = "32kilograms";
    assert.equal(convertHandler.getUnit(input), undefined)
  })


  test("correct return unit for each valid input unit", function () {
    const input = ['km', 'mi', 'kg', 'lbs', 'L', 'gal']
    const output = ['mi', 'km', 'lbs', 'kg', 'gal', 'L'];

    input.forEach((el, index) => {
      assert.equal(convertHandler.getReturnUnit(el), output[index])
    })
  })
  test("return the spelled-out string unit for each valid input", function () {
    const input = ['km', 'mi', 'kg', 'lbs', 'L', 'gal']
    const output = ['kilometers', 'miles', 'kilograms', 'pounds', 'liters', 'gallons'];

    input.forEach((el, index) => {
      assert.equal(convertHandler.spellOutUnit(el), output[index])
    })
  })

  // testando o metodo convert
  test("correctly convert gal to L", function () {
    const num = "5";
    const unit = 'gal'
    assert.equal(convertHandler.convert(num, unit), 18.92705)
  })
  test("correctly convert L to gal", function () {
    const num = "5";
    const unit = 'L'
    assert.equal(convertHandler.convert(num, unit), 1.32086)
  })
  test("correctly convert mi to km", function () {
    const num = "5";
    const unit = 'mi'
    assert.equal(convertHandler.convert(num, unit), 8.04670)
  })
  test("correctly convert km to mi", function () {
    const num = "5";
    const unit = 'km'
    assert.equal(convertHandler.convert(num, unit), 3.10686)
  })
  test("correctly convert lbs to kg", function () {
    const num = "5";
    const unit = 'lbs'
    assert.equal(convertHandler.convert(num, unit), 2.26796)
  })
  test("correctly convert kg to lbs", function () {
    const num = "5";
    const unit = 'kg'
    assert.equal(convertHandler.convert(num, unit), 11.02312)
  })


});
