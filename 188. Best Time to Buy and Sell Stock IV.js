/**
Say you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete at most k transactions.

Note:
You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).

Example 1:

Input: [2,4,1], k = 2
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
Example 2:

Input: [3,2,6,5,0,3], k = 2
Output: 7
Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4.
             Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
 */
/**
 * Algorithm: DP (Local optimal and global optimal)
 * Reference: https://wdxtub.com/interview/14520604910834.html
 * Reference: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/discuss/54113/A-Concise-DP-Solution-in-Java
 * 1. Declare stages[i][j] to store transfering states (max profit):
 *      i: ith transaction [0-k]
 *      j: jth day [0-prices.length]
 * 2. First Row: stages[0][j] = 0 because profit of 0th transaction is 0
 *    First Column: stages[i][0] = 0 because profit of 0th day is 0
 *    and future states depends on previous states
 * 3. Iterate in i in [1...k] and j in [i...prices.length-1]
 *      For each time transaction i, initial localMax = -prices[0] (buy stock on first day ( j=1 ))
 * 
 *      Consider about selling stock on jth day:
 *      stages[i][j] = Math.max(stages[i][j-1], prices[j] + localMax)
 *                                  1.^                   2.^
 *      1. If the profit is larger to not sell stock on jth day, use the profit on j-1th day.
 *      2. If the profit is larger to sell stock on jth day, update profit on stages[i][j]
 * 
 *      Consider about buying stock on jth day:
 *      localMax = Math.max(localMax, stages[i-1][j-1] - prices[j])
 *                             1.^                   2.^
 *      1. If the profit is larger on not buying stock on jth day, keep the localMax
 *      2. If the profit is larget on buying stock on jth day, update localMax to 
 *         previous transaction i-1 on previous day j-1th day - current stock price on jth day:
 *         stages[i-1][j-1] - prices[j]
 *         (The i-1 ensures localMax following ith transaction)
 * 
 * 4. Return Profit on stages[k][prices.length - 1]
 * 
 * 5. If k > prices.length === Tansaction as many times as we want:
 *      quickSolve: 
 *      1. At the beginning of the ascending order: buy.
 *      2. At the ending of the ascending order: sell.
 *      result = 0
 *      result += Math.max(0, prices[i] - prices[i-1]);
 *      return result
 */
/**
 * Note: Happen to find that Math.max can receive multiple inputs, Awesome!
 */
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function(k, prices) {
  let len = prices.length;
  if (k >= Math.floor(len / 2)) return quickSolve(prices);

  // Initiate stages matrix storing transfer states
  let stages = [];
  for (let i = 0; i <= k; i += 1) {
    stages.push(new Array(len).fill(0));
  }

  // Iterate i transactions
  for (let i = 1; i <= k; i += 1) {
    // Setup initil localMax as buying stock on first day
    let localMax = -prices[0];
    // Iterate on jth day
    for (let j = 1; j < len; j += 1) {
      // not sell stock on jth day or sell stock on jth day
      stages[i][j] = Math.max(stages[i][j-1], prices[j] + localMax);
      // not buy stock on jth day or buy stock on jth day
      localMax = Math.max(localMax, stages[i-1][j-1] - prices[j]);
    }
  }

  return stages[k][len - 1];
};

const quickSolve = function(prices) {
  let len = prices.length;
  let result = 0

  for (let i = 1; i < len; i += 1) {
    if (prices[i] > prices[i-1]) {
      result += prices[i] - prices[i-1];
    }
  }

  return result;
};