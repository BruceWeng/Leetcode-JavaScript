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
 * 
 * Update 11/8:
 * Prefix sum is the sliding window for "subarray sum kind" problem
 * sum[start...end] can be derived prefix[end] - prefix[start-1] 
 * 
 * T: O(n)
 * S: O(n)
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

/**
 * Leetcode Fundamental: 12/12 Revisit from DP Session
 * Kadane Algorithm aka reduced Prefix Sum Solution
 * 
 * T: O(n)
 * S: O(1), 4 spaces
 * Runtime: 60 ms
 */
const maxSubArray = (nums) => {
  if (nums === undefined || nums.length === 0) return 0;
  
  let n = nums.length;
  let maxStages = Array(2).fill(0);
  let globalStages = Array(2).fill(0);
  maxStages[0] = nums[0];
  globalStages[0] = nums[0];
  for (let i = 1; i < nums.length; i += 1) {
    maxStages[i % 2] = Math.max(maxStages[(i-1) % 2] + nums[i], nums[i]);
    globalStages[i % 2] = Math.max(globalStages[(i-1) % 2], maxStages[i % 2]);
  }

  return globalStages[(n-1) % 2];
};

/**
 * Variable Reuse Improvement
 * 
 * T: O(n)
 * S: O(1), 3 spaces
 *  * Runtime: 56 ms
 */
const maxSubArray = (nums) => {
  if (nums === undefined || nums.length === 0) return 0;
  
  let maxStage = nums[0];
  let globalStage = nums[0];
  for (let i = 1; i < nums.length; i += 1) {
    let prevMaxStage = maxStage;
    maxStage = Math.max(prevMaxStage + nums[i], nums[i]);
    globalStage = Math.max(globalStage, maxStage);
  }

  return globalStage;
};

/**
 * Brute Force Solution
 * Iterate from 0 to n-1 to find sum of subarray and update maxResult 
 * 
 * T: O(n^3)
 * S: O(1)
 * Runtime: TLE
 */
const maxSubArray = (nums) => {
  if (nums === undefined || nums.length === 0) return 0;
  let max = nums[0];
  let n = nums.length;
  for (let i = 0; i < n; i += 1) { // start index of subarray
    for (let j = i + 1; j <= n; j += 1) { // end index of subarray (exclude!!!)
      let sum = 0;
      for (let k = i; k < j; k += 1) {
        sum += nums[k];
      }
      max = Math.max(max, sum);
    }
  }

  return max;
};

/**
 * Reduced Brute Force
 * 
 * T: O(n^2)
 * S: O(1)
 * Runtime: 208ms
 */
const maxSubArray = (nums) => {
  if (nums === undefined || nums.length === 0) return 0;
  let max = nums[0];
  let n = nums.length;
  for (let i = 0; i < n; i += 1) { // start index of subarray
    let sum = 0;
    for (let j = i; j < n; j += 1) { // end index of subarray (include!!!)
      sum += nums[j];
      max = Math.max(max, sum);
    }
  }

  return max;
};

const test = [-2,1,-3,4,-1,2,1,-5,4];
console.log(maxSubArray(test)); // 6