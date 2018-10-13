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