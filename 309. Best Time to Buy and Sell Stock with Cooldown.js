/**
Say you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete as many transactions as you like 
(ie, buy one and sell one share of the stock multiple times) with the following restrictions:

You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).
After you sell your stock, you cannot buy stock on next day. (ie, cooldown 1 day)
Example:

Input: [1,2,3,0,2]
Output: 3 
Explanation: transactions = [buy, sell, cooldown, buy, sell]
 */
/**
 * Algorithm: 
 * 1. Brute Force: 
 *      Each day has 3 states: buy, sell, rest
 *      Calculate all states for each days O(3^n) and find the combination that follow the restriction and max profit
 * 
 * 2. Finite State machine DP
 * Stages:              Actions:
 * hold (after buy)     buy
 * sold (after sell)    sell
 * rest (cooldown)      rest
 *
 * Finite State machine:
 *                    rest
 *                   /   ^
 *                  v   /
 *                  rest
 *            buy /     ^ rest
 *               v       \
 *    rest <- hold ----> sold
 *         ->      sell
 * 
 * a. Each stage holds max profit for the day
 * b. transfer functions:
 *   b.1 hold[i] = max(rest action from hold, buy action from rest)
 *               = max(hold[i-1], rest[i-1] - prices[i])
 *   b.2 sold[i] = sell action from hold
 *               hold[i-1] + prices[i]
 *   b.3 rest[i] = max(rest action from rest, rest action from sold)
 *               = max(rest[i-1], sold[i-1])
 * c. Day 0 initialization for each stage:
 *    hold[0] = -prices[0] (paid prices[0])
 *    sold[0] = 0 (sell nothing)
 *    rest[0] = 0
 * d. Answer: max(rest[n], sold[n])
 * 
 * T: O(n), S: O(n) (can be reduce to O(1))
 * Runtime: 84 ms
 */          
/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = (prices) => {
  let n = prices.length;
  let hold = new Array(n + 1).fill(0);
  hold[0] = -prices[0];
  let sold = new Array(n + 1).fill(0);
  let rest = new Array(n + 1).fill(0);

  for (let i = 0; i < n; i += 1) { // i is the index of prices[i], map to states[i+1]
     hold[i+1] = Math.max(hold[i], rest[i] - prices[i]);
     sold[i+1] = hold[i] + prices[i];
     rest[i+1] = Math.max(rest[i], sold[i]);
  }

  return Math.max(rest[n], sold[n]);
};