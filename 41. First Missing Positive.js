/**
Given an unsorted integer array, find the smallest missing positive integer.

Example 1:

Input: [1,2,0]
Output: 3
Example 2:

Input: [3,4,-1,1]
Output: 2
Example 3:

Input: [7,8,9,11,12]
Output: 1
Note:

Your algorithm should run in O(n) time and uses constant extra space.
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
  if (nums === undefined || nums.length === 0) return 1;
  
  for (let i = 0; i < nums.length; i += 1) {
    let curr = nums[i];
    // swap curr and nums[curr - 1]
    while (curr > 0 && curr <= nums.length && curr !== nums[curr - 1]) {
      // Assign order matter! num[curr - 1] needs to be the first param
      [ nums[curr - 1], curr ] = [ curr, nums[curr - 1] ];
      // let temp = nums[curr - 1];
      // nums[curr - 1] = curr;
      // curr = temp;
    }
  }
  
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] !== i + 1) return i + 1;
  }
  
  return nums.length + 1;
};