/**
 * Leetcode Fundamental: 10/22 Update
 */
/**
Given a sorted (in ascending order) integer array nums of n elements and a target value, write a function to search target in nums. If target exists, then return its index, otherwise return -1.


Example 1:

Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4

Example 2:

Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
 

Note:

You may assume that all elements in nums are unique.
n will be in the range [1, 10000].
The value of each element in nums will be in the range [-9999, 9999].
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  // set start and end as boundary of range of binary search (included), 
  let start = 0;
  let end = nums.length - 1;
  // when start === end, there is still one element in nums to search, need to continue while loop, 
  // the true condition is start <= end (Take care condition!)
  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);
    // handle target found case: return index
    if (nums[mid] === target) return mid;
    // handle nums[mid] > target case: target in [start...mid-1] (exclude nums[mid])
    else if (nums[mid] > target) end = mid - 1;
    //handle nums[mid] < target case: target in [mid+1...end] (exclude nums[mid])
    else start = mid + 1;
  }
  // handle the case target not found: return -1
  return -1;
};