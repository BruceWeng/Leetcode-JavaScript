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