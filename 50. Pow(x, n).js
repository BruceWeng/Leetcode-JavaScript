/**
 * Note:
 * 1. Recursion: O(N) -> O(logN)
 * 2. Dealing with base case when n is even or odd
 */
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
  if (n === 0) {
      return 1;
  }

  if (n === 1) {
      return x;
  }

  let isNegative = false;
  if (n < 0) {
      n *= -1;
      isNegative = true;
  }

  let sub = myPow(x, Math.floor(n / 2));
  let edge = myPow(x, n % 2);
  if (isNegative) {
      return 1.0 / (sub * sub * edge);
  } else {
        return sub * sub * edge;
  }

};
