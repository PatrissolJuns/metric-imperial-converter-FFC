/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  const checkDivision = function(data) {
    let numbers = data.split('/');
    // prevent again invalid number
    if (numbers.length > 2 || numbers[1] == 0)  return false;
    return numbers;
  }

  const checkDecimal = function(data) {
    let number = data.split('.');
    // prevent again invalid number
    if (number.length > 2) return false;
    return data;
  }

  this.getNum = function(input) {
    let rawNum = input.match(/[\d\/.]+/) || ['1'];
    let nums = checkDivision(rawNum[0]);
    // test if the number is actually is valid number
    if (!nums[0]) {
      return 'invalid number';
    }
    // now we process to the division if the number is in the a/b form
    let num1 = checkDecimal(nums[0]);
    let num2 =  nums[1] || '1';
    num2 = checkDecimal(num2);
    let result = parseFloat(num1) / parseFloat(num2);
    return result || 'invalid number';
  };
  
  this.getUnit = function(input) {
    let lower = input.toLowerCase();
    // Getting first continous string of alpha characters
    let alpha = lower.match(/[A-Za-z]+/g);
    alpha = alpha ? alpha[0] : 'invalid unit';

    // we check if the unit name is correct
    let unit =  lower.match(/gal|lbs|mi|l|kg|km/);
    unit = unit ? unit[0] : 'invalid unit';

    // we check if there is more after the unit name
    if (lower.split(unit)[1]) {
      return 'invalid unit';
    }

    // Checking if the extracted unit is the extent of all characters
    if (unit !== alpha) {
      return 'invalid unit';
    }
    
    return unit;
  }
  
  this.getReturnUnit = function(initUnit) {
    // return the unit to convert to
    const imperial = ['gal', 'lbs', 'mi'];
    const metric   = ['l',   'kg',  'km'];
    
    let index = imperial.indexOf(initUnit);
    if (index > -1) return metric[index];
    else {
      index = metric.indexOf(initUnit);
      return imperial[index] || 'invalid unit';
    }
  };

  this.spellOutUnit = function(unit) {
    // return the entire spelling of the units
    const fullUnit = {
      gal: 'gallon',
      lbs: 'pound',
      mi : 'mile',
      l  : 'liter',
      kg : 'kilogram',
      km : 'kilometer'      
    }
    return fullUnit[unit] || 'invalid unit';
  };
  
  this.convert = function(initNum, initUnit) {
    // convert the number in a particular unit to antoher one
    // For that we will use data convertion that we gave us at the insructions
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    switch(initUnit) {
      case 'gal':
        return  initNum * galToL
      case 'lbs':
        return  initNum * lbsToKg
      case 'mi':
        return  initNum * miToKm
      case 'l':
        return  initNum / galToL
      case 'kg':
        return  initNum / lbsToKg
      case 'km':
        return  initNum / miToKm
      default:
        return 'invalid unit'
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // return the returnUnit according to the instructions
    let initUnitFull = this.spellOutUnit(initUnit);
    initUnitFull += initNum > 1 ? 's' : '';
    
    let returnUnitFull = this.spellOutUnit(returnUnit);
    returnUnitFull += returnNum > 1 ? 's' : '';
    
    let preciseInitNum = parseFloat(initNum.toPrecision(5));
    let preciseReturnNum = parseFloat(returnNum.toPrecision(5));
    
    return `${preciseInitNum} ${initUnitFull} converts to ${preciseReturnNum} ${returnUnitFull}`;
  };
  
}

module.exports = ConvertHandler;
