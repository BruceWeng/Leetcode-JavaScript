/**
Say you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete at most two transactions.

Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

Example 1:

Input: [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
             Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
Example 2:

Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
             engaging multiple transactions at the same time. You must sell before buying again.
Example 3:

Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
 */
/**
 * Note:
 *  1. Divide and Conquer: when visit prices[i],
 *     find max profit in [0...i] and [i+1...length-1], O(N^2)
 *     (2 * Half side Kadane O(n) * Cut n-1 intervals O(n)) = O(n^2)
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

/**
 * Leetcode Fundamental: 2/1/2019 Update
 * Algorithm: Finite State Machine DP
 * Stages:
 * Hold1
 * Sold1
 * Hold2
 * Sold2
 * 
 * Actions:
 * buy
 * sell
 * 
 * Finite State Machine:
 * 
 *  buy -> Hold1 -> sell -> Sold1 -> buy -> Hold2 -> sell -> Sold2
 *  -prices[i]      +prices[i]       -prices[i]      +prices[i]
 *               
 * 1. Each stage store max profit of the ith day
 * 2. Transder function:
 *    hold1[i] = max(hold1[i-1], -prices[i])
 *    sold1[i] = max()
 */