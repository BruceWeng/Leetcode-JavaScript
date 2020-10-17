// Since 0 can only be formed by 2 * 5 and 2 always comes before 5.
// We are counting how many 5 in the factorial.
// n / 5 missed  5 * 5 and 2 * 5 * 5...so count n / 25
// n / 25 missed 5 * 5 * 5 and 2 * 5 * 5 * 5...so count n / 125 and so on until n === 0
// T: O(logN)
/**
 * @param {number} n
 * @return {number}
 */
function trailingZeroes(n) {
  if (n === 0) return 0;
  return Math.floor(n / 5) + trailingZeroes(Math.floor(n / 5));
};