/**
You are climbing a stair case. It takes n steps to reach to the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Note: Given n will be a positive integer.

Example 1:

Input: 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
 */
/**
 * Algorithm: DP, Iteration
 * 1. 
 */
/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = function(n) {
  // 1. Initiate stages array
  let stages = new Array(n + 1).fill(0);
  stages[0] = 0;
  stages[1] = 1;
  stages[2] = 2;
  if (n <= 2) return stages[n];
    
  // 2. Update state in each stages
  for (let i = 3; i <= n; i += 1) {
    stages[i] = stages[i - 1] + stages[i - 2];
  }
  
  // 3. Return stage in last stage
  return stages[n];
};

/**
 * Rolling Array
 */
/**
 * Leetcode Fundamental: 12/8 Review
 */
const climbStairs = function(n) {
  
  // 1. Initiate stages array
  let stages = [0, 1, 2];

  if (n <= 2) return stages[n];
    
  // 2. Update state in each stages
  for (let i = 3; i <= n; i += 1) {
    stages[i % 3] = stages[(i - 1) % 3] + stages[(i - 2) % 3];
  }
  
  // 3. Return stage in last stage
  return stages[n % 3];
};