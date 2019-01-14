/**
In a given integer array nums, there is always exactly one largest element.

Find whether the largest element in the array is at least twice as much as every other number in the array.

If it is, return the index of the largest element, otherwise return -1.

Example 1:

Input: nums = [3, 6, 1, 0]
Output: 1
Explanation: 6 is the largest integer, and for every other number in the array x,
6 is more than twice as big as x.  The index of value 6 is 1, so we return 1.
 

Example 2:

Input: nums = [1, 2, 3, 4]
Output: -1
Explanation: 4 isn't at least as big as twice the value of 3, so we return -1.
 

Note:

nums will have a length in the range [1, 50].
Every nums[i] will be an integer in the range [0, 99].
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * T: O(n)
 * S: O(1)
 * Runtime: 72ms
 */
var dominantIndex = function(nums) {
  if (nums === undefined || nums.length === 0) return -1;
  
  let maxVal = Number.MIN_SAFE_INTEGER;
  let secMaxVal = Number.MIN_SAFE_INTEGER;
  let maxValIdx = 0;
  
  // 1. iterate nums:
  // 1.1 if nums[i] > maxVal: maxVal = nums[i], continue
  // 1.2 else if (maxVal > nums[i] > secMaxVal): secMaxVal = nums[i]
  // 2. return maxVal >= secMaxVal * 2;
  
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] > maxVal) {
      secMaxVal = maxVal;
      maxVal = nums[i];
      maxValIdx = i;
    } else if (maxVal > nums[i] && nums[i] > secMaxVal){
      secMaxVal = nums[i];
    }
  }
  
  return maxVal >= secMaxVal * 2 ? maxValIdx : -1;
};