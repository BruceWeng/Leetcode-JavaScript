/**
Given an array of n positive integers and a positive integer s, 
find the minimal length of a contiguous subarray of which the sum ≥ s. 
If there isn't one, return 0 instead.
 */
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
const minSubArrayLen = function(s, nums) {
  if (nums === undefined || nums.length === 0) return 0;

  let len = nums.length;
  let start = 0;
  let end = -1;
  let sum = 0;
  let result = len + 1;
  while (end < len) {
    end += 1;
    sum += nums[end];

    while (sum >= s) {
      result = Math.min(result, end - start + 1);
      sum -= nums[start];
      start += 1;
    }
  }

  return (result === len + 1) ? 0 : result;
};

let s = 7;
let nums = [2,3,1,2,4,3];
console.log(minSubArrayLen(s, nums)); // 2
// Explanation: the subarray [4,3] has the minimal length under the problem constraint.

/**
 * Leetcode Fundamental: 11/7 Update
 * Failure:
 * 1. Fail to declare a result(default = len+1) to update minimum sum
 * 2. Fail to think of inner while loop true condition sum >= s
 * (Jump into inner while loop to update result)
 * 3. Fail to update result = Math.min(result, end - start + 1)
 */
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
  // Handle edge case
  if (nums === undefined || nums.length === 0 || s === undefined) return 0;
  // let start be first index of substring and end be the last index of substring (inclusive)
  let start = 0;
  let end = -1; // gonna move and count sum
  let sum = 0;
  let result = nums.length + 1;
  while (end < nums.length) {
    end += 1;
    sum += nums[end];
    
    while (sum >= s) {
      result = Math.min(result, end - start + 1);
      sum -= nums[start];
      start += 1;
    }
  }
  
  // Handle no match case
  if (result === nums.length + 1) return 0;
  return result;
};