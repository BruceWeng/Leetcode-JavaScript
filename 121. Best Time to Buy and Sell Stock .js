/**
Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction 
(i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

Note that you cannot sell a stock before you buy one.

Example 1:

Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
             Not 7-1 = 6, as selling price needs to be larger than buying price.
Example 2:

Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
 */
/**
 * Algorithm: Max SubArray Sum + DP
 * 1. Initiate number array gain that gain[i] stores profit on each day(buy on i-1 day and sell on i day) = nums[i] - nums[i-1]
 * 2. The question now becomes max subarray sum between prices and gain: 
 *      prices[i] = Math.max(gain[i], gain[i] + prices[i-1])
 *      result = Math.max(result, prices[i-1])
 * 3. return result
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function(prices) {
  if (prices.length === 0) return 0;
  
  // Initiate profit on each day
  let gains = new Array(prices.length).fill(0);
  for (let i = 1; i < prices.length; i += 1) {
    gains[i] = prices[i] - prices[i-1];
  }

  let profit = new Array(gains.length).fill(0);
  let result = profit[0] = gains[0];
  // Find max subarray sum on profit and gains
  for (let i = 1; i < gains.length; i += 1) {
    profit[i] = Math.max(gains[i], gains[i] + profit[i-1]);
    result = Math.max(result, profit[i]);
  }

  return result;
};

/**
 * Leetcode Fundamental: 2/2/2019
 * 1. Convert prices[] to gains[] by gains[i] = prices[i] - prices[i-1]
 * Algorithm: Kadane
 * 0. Initial max = new Array(n).fill(0), result = new Array(n).fill(0)
 * 1. max[i] = max(max[i-1] + gains[i], gains[i])
 * 2. result[i] = max(result[i-1], max[i])
 * 3. return result[n-1]
 * 
 * T: O(n), S: O(n)
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function(prices) {
  if (prices === undefined || prices.length === 0) return 0;
  let n = prices.length;
  let gains = new Array(n).fill(0);
  for (let i = 1; i < n; i += 1) gains[i] = prices[i] - prices[i-1];

  let max = new Array(n + 1).fill(0);
  let result = new Array(n + 1).fill(0);

  for (let i = 1; i < n; i += 1) { // i is index of prices, states[i+1]
    max[i] = Math.max(max[i-1] + gains[i], gains[i]);
    result[i] = Math.max(result[i-1], max[i]);
  }

  return result[n-1];
};