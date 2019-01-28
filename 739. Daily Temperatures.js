/**
Given a list of daily temperatures T, return a list such that, for each day in the input, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put 0 instead.

For example, given the list of temperatures T = [73, 74, 75, 71, 69, 72, 76, 73], your output should be [1, 1, 4, 2, 1, 1, 0, 0].

Note: The length of temperatures will be in the range [1, 30000]. Each temperature will be an integer in the range [30, 100].
 */
/**
 * Leetcode Fundamental: 1/28 Update
 * Data Structure: Decreasing Stack (only push element if element > stack.peek())
 * 
 * Each element gonna be at most push() O(1) and peek() O(1)
 * T: O(n)
 * S: O(n)
 */
/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
  // 1. Declare a decreasing stack only stores the indecies which element less than stack[-1]
  // 2. Pop stack element until find the nearest element that > current element:
  //  2.1 update result[i] = i - stack.pop
  // 3. for each temperature do 2. and push current temperature
  // 4. return result
  
  let stack = [];
  let result = new Array(T.length).fill(0);
  for (let i = 0; i < T.length; i += 1) {
    while (stack.length !== 0 && T[i] > T[stack[stack.length - 1]]) {
      let index = stack.pop();
      result[index] = i - index;
    }
    
    stack.push(i);
  }
  
  return result;
};