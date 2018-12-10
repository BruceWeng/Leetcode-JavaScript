/**
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

Example 1:

Input: [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.
Example 2:

Input: [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
             Total amount you can rob = 2 + 9 + 1 = 12.
 */
/**
 * Leetcode Fundamental: 12/10 Update
 * Lesson:
 * If stages[i] needs prev 3 stages,
 * Try to add a placeholder at the beginning of stages
 * where stages = new Array(n+1) where stages[0] = 0.
 * 
 * stages[i+1] now can determined by only prev 2 stages
 * stages[i] and stages[i-1]
 */
/**
 * First Try
 * Use prev 3 stages
 * T: O(n)
 * S: O(n)
 * Runtime: 72ms
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums === undefined || nums.length === 0) return 0;
  let n = nums.length;
  if (n === 1) return nums[0];
  if (n === 2) return Math.max(nums[0], nums[1]);
  if (n === 3) return Math.max(nums[0] + nums[2], nums[1]);
  
  let stages = new Array(n).fill(0);
  stages[0] = nums[0];
  stages[1] = nums[1];
  stages[2] = Math.max(nums[1], nums[0] + nums[2]);
  for (let i = 3; i < n; i += 1) {
    stages[i] = Math.max(stages[i-1], stages[i-2] + nums[i], stages[i-3] + nums[i]);
  }
  
  return Math.max(stages[n-2], stages[n-1]);
};

/**
 * We should update stages[i+1] rather than stages[i]
 * stages[i+1] should be max(stages[i], stages[i-1] + nums[i])
 * 
 * Use Prev 2 Stages
 * T: O(n)
 * S: O(n)
 * Runtime: 52 ms
 */
var rob = function(nums) {
  if (nums === undefined || nums.length === 0) return 0;
  let n = nums.length;
  let stages = new Array(n+1).fill(0); // Extra placeholder 0 at stages[0]
  
  stages[0] = 0
  stages[1] = nums[0];
  
  for (let i = 1; i < n; i += 1) {
    stages[i+1] = Math.max(stages[i], stages[i-1] + nums[i]);
  }
  
  return stages[n];
};

/**
 * Space Improvement for Solution 2
 * Rolling Array
 * Always remember to % n last!!!! (do addition or substraction first)
 * 
 * Use Prev 2 Stages
 * T: O(n)
 * S: O(1)
 * Runtime: 52 ms
 */
var rob = function(nums) {
  if (nums === undefined || nums.length === 0) return 0;
  let n = nums.length;
  let stages = new Array(4).fill(0); // Extra placeholder 0 at stages[0]
  
  stages[0] = 0
  stages[1] = nums[0];

  for (let i = 1; i < n; i += 1) {
    stages[(i + 1) % 3] = Math.max(stages[i % 3], stages[(i - 1) % 3] + nums[i]);
  }
  
  return stages[n % 3];
};