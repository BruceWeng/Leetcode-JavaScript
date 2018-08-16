/**
Given an integer array nums, find the contiguous subarray (containing at least one number) 
which has the largest sum and return its sum.

Example:

Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
Follow up:

If you have figured out the O(n) solution, try coding another solution using the divide and 
conquer approach, which is more subtle.
 */
/**
 * Algorithm: Prefix Sum + DP
 * 0. Initiate prefix sum: sum[number]
 * 1. Initial result = sum[0] as max sum
 * 2. Let sum[number] represents stage: stage[i]
 * 3. If stage[i-1] > 0: stage[i] = nums[i] + stage[i-1]
 * 4. If stage[i] > result: result = stage[i]
 * 5. Return result
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = function(nums) {
  // Initiate prefix sum
  let sum = new Array(nums.length).fill(0);
  sum[0] = nums[0];
  for (let i = 1; i < nums.length; i += 1) {
    sum[i] = sum[i-1] + nums[i];
  }

  let result = sum[0];
    
  // Transfer states
  for (let i = 1; i < nums.length; i += 1) {
    sum[i] = nums[i] + (sum[i-1] > 0 ? sum[i-1] : 0);
    if (sum[i] > result) result = sum[i];
  }
  return result;
};