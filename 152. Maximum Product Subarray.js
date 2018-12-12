/**
Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.

Example 1:

Input: [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
 */
/**
 * Leetcode Fundamental: 12/11 Update
 * Kadane's Algorithm variant: Min-Max Algorithm
 * Reference: 
 * https://www.youtube.com/watch?v=86CQq3pKSUw&t=293s
 * 
 * T: O(n)
 * S: O(n)
 * Runtime: 84 ms
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  if (nums === undefined || nums.length === 0) return 0;

  let n = nums.length;
  let minStages = new Array(n).fill(0);
  let maxStages = new Array(n).fill(0);
  let globalStages = new Array(n).fill(0);
  minStages[0] = nums[0];
  maxStages[0] = nums[0];
  globalStages[0] = nums[0];
  
  for (let i = 1; i < n; i += 1) {
    minStages[i] = Math.min(minStages[i-1] * nums[i], maxStages[i-1] * nums[i], nums[i]);
    maxStages[i] = Math.max(minStages[i-1] * nums[i], maxStages[i-1] * nums[i], nums[i]);
    globalStages[i] = Math.max(globalStages[i-1], maxStages[i]);
  }

  return globalStages[n-1];
};

/**
 * Rolling Array Improvement
 * 
 * T: O(n)
 * S: O(1), 6 spaces
 * Runtime: 60 ms
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  if (nums === undefined || nums.length === 0) return 0;

  let n = nums.length;
  let minStages = new Array(2).fill(0);
  let maxStages = new Array(2).fill(0);
  let globalStages = new Array(2).fill(0);
  minStages[0] = nums[0];
  maxStages[0] = nums[0];
  globalStages[0] = nums[0];
  
  for (let i = 1; i < n; i += 1) {
    minStages[i % 2] = Math.min(minStages[(i-1) % 2] * nums[i], maxStages[(i-1) % 2] * nums[i], nums[i]);
    maxStages[i % 2] = Math.max(minStages[(i-1) % 2] * nums[i], maxStages[(i-1) % 2] * nums[i], nums[i]);
    globalStages[i % 2] = Math.max(globalStages[(i-1) % 2], maxStages[i % 2]);
  }

  return globalStages[(n-1) % 2];
};

/**
 * Reduced to variables by assign currStage to prevStage
 * 
 * T: O(n)
 * S: O(1), 5 spaces
 * Runtime: 56 ms
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  if (nums === undefined || nums.length === 0) return 0;

  let n = nums.length;

  let minStage = nums[0];
  let maxStage = nums[0];
  let globalStage = nums[0];
  
  for (let i = 1; i < n; i += 1) {
    prevMinStage = minStage; // minStage assigned to prevMinStage because the variable minStage needs to be reused in this loop
    prevMaxStage = maxStage; // maxStage assigned to prevMaxStage because the variable maxStage needs to be reused in this loop
    minStage = Math.min(prevMinStage * nums[i], prevMaxStage * nums[i], nums[i]);
    maxStage = Math.max(prevMinStage * nums[i], prevMaxStage * nums[i], nums[i]);
    globalStage = Math.max(globalStage, maxStage); // globalStage not assigned to prevGlobalStage because the variable globalStage not need to be reused in this loop
  }

  return globalStage;
};
