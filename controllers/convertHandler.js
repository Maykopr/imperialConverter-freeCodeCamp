function ConvertHandler() {

  function splitString(input) {
    const arrInput = input.match(/(^[\d\-\+\*\/,\.=\s]*)(\w*)/);
    const num = arrInput[1] || 1;
    const str = arrInput[2];
    return [num, str]
  }

  function divideNum(num) {
    //case num 456789
    if (/^(\d+|\d+\.\d+)$/.test(num)) return num

    // case num = 465/456
    if (/^(\d+\.\d+|^\d+)(\/)(\d+\.\d+|\d+)$/.test(num)) {
      const arrNums = num.match(/(^\d+\.\d+|^\d+)(\/)?(\d+\.\d+|\d+)?/);
      const num1 = arrNums[1];
      const num2 = arrNums[3];
      return num1 / num2;
    }
    //else
    return undefined;
  }


  this.getNum = function (input) {
    const num = splitString(input)[0];
    const result = divideNum(num);
    return result;
  };

  this.getUnit = function (input) {
    const unit = splitString(input)
    switch (unit[1].toLowerCase()) {
      case "mi":
        return "mi";
      case "km":
        return "km"
      case "kg":
        return "kg"
      case "lbs":
        return "lbs"
      case "l":
        return "L"
      case "gal":
        return "gal"
      default:
        return undefined;
    }
  };

  this.getReturnUnit = function (initUnit) {
    const unitsTableRelated = {
      km: "mi",
      mi: "km",
      lbs: "kg",
      kg: "lbs",
      gal: "L",
      L: "gal"
    }
    let result = unitsTableRelated[initUnit] ?? 'invalid unit';
    return result;
  };

  this.spellOutUnit = function (unit) {
    const unitsTableSpelled = {
      km: "kilometers",
      mi: "miles",
      lbs: "pounds",
      kg: "kilograms",
      gal: "gallons",
      L: "liters"
    }
    let result = unitsTableSpelled[unit] ?? 'invalid unit';
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "km": result = initNum / miToKm;
        break
      case "mi": result = initNum * miToKm;
        break
      case "lbs": result = initNum * lbsToKg;
        break
      case "kg": result = initNum / lbsToKg;
        break
      case "gal": result = initNum * galToL;
        break
      case "L": result = initNum / galToL;
        break
      default: result = undefined;
        break
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const string = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return string;
  };

}

module.exports = ConvertHandler;
