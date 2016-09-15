/**
 * Note:
 *  1. Divide and Conquer: when visit prices[i],
 *     find max profit in [0...i] and [i+1...length-1], O(N^2)
 *  2. DP:
 *      a. Build preProfit array to record Max(prices[i] - currMin, preProfit[i-1])
 *      b. Build postProfit array to record Max(currMax - prices[i], postProfit[i+1])
 *      c. result = Max(preProfit[i] + postProfit[i], result)
 *      d. Time: O(N), Space: O(N)
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (prices === null || prices.length <= 1) {
    return 0;
  }

  let length = prices.length;
  let currMin = prices[0];
  let currMax = prices[length - 1];
  let preProfit = new Array(length).fill(0);
  let postProfit = new Array(length).fill(0);
  let result = 0;

  for (let i = 1; i < length; i++) {
    currMin = Math.min(currMin, prices[i]);
    preProfit[i] = Math.max(preProfit[i - 1], prices[i] - currMin);
  }

  for (let i = length - 2; i >= 0; i--) {
    currMax = Math.max(currMax, prices[i]);
    postProfit[i] = Math.max(postProfit[i + 1], currMax - prices[i]);
  }

  for (let i = 0; i < length; i++) {
    result = Math.max(result, preProfit[i] + postProfit[i]);
  }

  return result;
};

let test1 = [0, 1, 3, 1, 6, 8, 10, 4, 6, 7, 2];
console.log(maxProfit(test1));//13
