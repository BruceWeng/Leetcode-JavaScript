/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
var fractionToDecimal = function (numerator, denominator) {
  if (numerator === 0) return '0';
  let result = '';
  // '+' or '-'
  if ((numerator > 0) ^ (denominator > 0)) result += '-';
  // integer part
  let num = Math.abs(numerator);
  let den = Math.abs(denominator);
  result += Math.floor(num / den);
  num %= den;
  if (num === 0) return result;
  // fraction part
  result += '.';
  // Set map(num, index)
  let map = new Map();
  map.set(num, result.length);
  while (num !== 0) {
    num *= 10;
    result += Math.floor(num / den);
    num %= den;
    if (map.has(num)) {
      let index = map.get(num);
      result = result.substring(0, index) + '(' + result.substring(index) + ')';
      break;
    } else {
      map.set(num, result.length);
    }
  }
  return result;
};