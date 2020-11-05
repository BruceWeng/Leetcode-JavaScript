/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
  if (n < 0 || n === undefined) return 0;
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result *= 2;
    result += n & 1;
    n = n >> 1;
  }
  return result;
};