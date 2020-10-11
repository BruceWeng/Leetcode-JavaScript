/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  let index = 0, sign = 1, total = 0;
  let MAX_VALUE = Math.pow(2, 31) - 1, MIN_VALUE = -Math.pow(2, 31);
  // 1. Empty sting
  if (s.length === 0) return 0;

  // 2. Remove Spaces
  while (s[index] === ' ' && index < s.length) index++;

  // 3. Handle signs
  if (s[index] === '+' || s[index] === '-') {
    sign = s[index] === '+' ? 1 : -1;
    index++;
  }

  // 4. Convet number and avoid overflow
  while (index < s.length) {
    let digit = s[index].charCodeAt(0) - '0'.charCodeAt(0);
    if (digit < 0 || digit > 9) break;

    // check if total will be overflow after 10 times and add digit
    if (Math.floor(MAX_VALUE / 10) < total || (Math.floor(MAX_VALUE / 10) === total && MAX_VALUE % 10 < digit)) return sign === 1 ? MAX_VALUE : MIN_VALUE;

    total = 10 * total + digit;
    index++;
  }
  return total * sign;
};