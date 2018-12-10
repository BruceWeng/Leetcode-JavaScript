/**
You are a professional robber planning to rob houses along a street. Each house has a certain 
amount of money stashed. All houses at this place are arranged in a circle. That means the 
first house is the neighbor of the last one. Meanwhile, adjacent houses have security system 
connected and it will automatically contact the police if two adjacent houses were broken into 
on the same night.

Given a list of non-negative integers representing the amount of money of each house, determine 
the maximum amount of money you can rob tonight without alerting the police.

Example 1:

Input: [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2),
             because they are adjacent houses.
Example 2:

Input: [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.
 */
/**
 * Algorithm: DP
 * 1. Rob [0...n-2] and rob [1...n-1] and return the larger result, since the two interval are not adjacent houses.
 * 2. Declare a helper function(nums, start, end) to return the maximum result of the interval
 * 3. Return max(helper(nums, 0, n-2), helper(nums, 1, n-1))
 * 
 * T: O(N)
 * S: O(N)
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
const rob = function(nums) {
    let n = nums.length;

    // Termination condition
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    if (n === 2) return Math.max(nums[0], nums[1]);
    if (n === 3) return Math.max(Math.max(nums[0], nums[1]), nums[2]);

    return Math.max(helper(nums, 0, n-2), helper(nums, 1, n-1));
}

/**
 * Helper function that returns the maximum result in interval [start...end]
 * @param {number[]} nums 
 * @param {number} start 
 * @param {number} end 
 */
const helper = function(nums, start, end) {
    let dp = new Array(end-start+2).fill(0);
    dp[end-start] = nums[end];
    dp[end-1-start] = Math.max(nums[end-1], nums[end]);
    for (let i = end-2; i >= start; i -= 1) {
        dp[i-start] = Math.max(nums[i] + dp[i+2-start], nums[i+1] + dp[i+3-start]);
    }
    return dp[0];
}

/**
 * Leetcode Fundamental: 12/10 Update
 * Failure:
 * Fail to think of return max(rob 2 sub array)
 * 
 * ex: n = 5
 * maxValue([1, 2, 3, 4, 5]) = max( maxValue([1, 2, 3, 4,]), maxValue([2, 3, 4, 5]) )
 * 
 * maxValue = max(rob(nums[0:n-1]), rob(nums[1:n])) (exclude end)
 * 
 * T: O(n)
 * S: O(n)
 * Runtime: 52 ms
 */
const rob = (nums) => {
  if (nums === undefined || nums.length === 0) return 0;
  let n = nums.length;

  if (n === 0) return 0;
  if (n === 1) return nums[0];
  if (n === 2) return Math.max(nums[0], nums[1]);
  if (n === 3) return Math.max(nums[0], nums[1], nums[2]);

  return Math.max(robHelper(nums, 0, n-1), robHelper(nums, 1, n));
};

var robHelper = function(nums, start, end) {
    let _nums = nums.slice(start, end);
    let n = _nums.length;
    let stages = new Array(4).fill(0); // Extra placeholder 0 at stages[0]
    
    stages[0] = 0
    stages[1] = _nums[0];
  
    for (let i = 1; i < n; i += 1) {
      stages[(i + 1) % 3] = Math.max(stages[i % 3], stages[(i - 1) % 3] + _nums[i]);
    }
    
    return stages[n % 3];
  };