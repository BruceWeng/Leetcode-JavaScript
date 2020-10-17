/** 
  The key observation is that the quotient of a division is just the number of times that we can subtract the divisor from the dividend without making it negative.

  Suppose dividend = 15 and divisor = 3, 15 - 3 > 0. We now try to subtract more by shifting 3 to the left by 1 bit (6). Since 15 - 6 > 0, shift 6 again to 12. Now 15 - 12 > 0, shift 12 again to 24, which is larger than 15. So we can at most subtract 12 from 15. Since 12 is obtained by shifting 3 to left twice, it is 1 << 2 = 4 times of 3. We add 4 to an answer variable (initialized to be 0). The above process is like 15 = 3 * 4 + 3. We now get part of the quotient (4), with a remaining dividend 3.

  Then we repeat the above process by subtracting divisor = 3 from the remaining dividend = 3 and obtain 0. We are done. In this case, no shift happens. We simply add 1 << 0 = 1 to the answer variable.

  the trick is: JavaScript bitwise op is for signed 32-bit, so

  while (dividend >= (temp << 1)) {
  doesn't work. Because "temp" overflows.

  while ((dividend >> 1) >= temp) {
  works.
  
  T: O(log(divisor))
 */
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
  let max_value = Math.pow(2, 31) - 1, min_value = -Math.pow(2, 31);
  if (divisor === 0 && dividend > 0) return max_value;
  if (divisor === 0 && dividend < 0) return min_value;
  let result = 0;
  let sign = (dividend > 0) ^ (divisor > 0) ? -1 : 1;
  let dvd = Math.abs(dividend), dvs = Math.abs(divisor);
  if (dvd >= max_value && dvs === 1) return (sign > 0) ? max_value : min_value;

  while (dvd >= dvs) {
    let temp = dvs, mul = 1;
    while (dvd >> 1 >= temp) { // Used to be dvd >= temp << 1
      temp <<= 1;
      mul <<= 1;
    }
    dvd -= temp;
    result += mul;
  }
  return result * sign;
};