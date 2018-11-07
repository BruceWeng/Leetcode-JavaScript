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
    sum[i] = Math.max(nums[i], sum[i-1] + nums[i]);
    result = Math.max(result, sum[i]);
  }
  return result;
};

const test = [-2,1,-3,4,-1,2,1,-5,4];
console.log(maxSubArray(test));
/**
 * Leetcode Fundamental: 11/7 Update
 * Failure:
 * 1. Fail to think of two stage DP
 * 2. Here is another solution without prefix sum
 * 
 * stage1: nums    [-2, 1,-3,4,-1,2,1,-5,4]
 * stage2: max sum [-2, 0, 0,0, 0,0,0, 0,0] (Sum up sum[i-1] only if sum[i-1] > 0)
 * update stage2: 
 * if sum[i-1] > 0: sum[i] = sum[i-1] + nums[i]
 * else sum[i] = nums[i]
 * 
 * result = max(result, stage2[i])
 * 
 * T: O(n), S: O(n) (can be reduced to O(1) since we only need previous sum[i-1] to update sum[i])
 * Optimize with circular array by 
 * FIND THE TARGET INDEX then % array.length
 */
const maxSubArray = (nums) => {
  if (nums === undefined || nums.length === 0) return 0;
  // nums is stage1
  let stage2 = Array(2).fill(0);
  stage2[0] = nums[0];
  let result = stage2[0];
  for (let i = 1; i < nums.length; i += 1) {
    if (stage2[(i - 1) % 2] < 0) stage2[i % 2] = nums[i];
    else stage2[i % 2] = stage2[(i - 1) % 2] + nums[i];

    result = Math.max(result, stage2[(i % 2)]);
  }

  return result;
};