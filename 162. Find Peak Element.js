/**
A peak element is an element that is greater than its neighbors.

Given an input array nums, where nums[i] ≠ nums[i+1], find a peak element and return its index.

The array may contain multiple peaks, in that case return the index to any one of the peaks is fine.

You may imagine that nums[-1] = nums[n] = -∞.

Example 1:

Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.
Example 2:

Input: nums = [1,2,1,3,5,6,4]
Output: 1 or 5 
Explanation: Your function can return either index number 1 where the peak element is 2, 
             or index number 5 where the peak element is 6.
 */
/**
 * Algorithm:
 * 1. Binary Search: Iteration
 * 2. Binary Search: Recursion
 */

// * 1. Binary Search: Iteration
const findPeakElementIteration = function(nums) {
    let start = 0;
    let end = nums.length - 1;

    while (start + 1 < end) {
        let mid  = start + Math.floor((end - start) / 2);
        let mid2 = mid + 1;

        if (nums[mid] < nums[mid2]) {
            start = mid2;
        } else {
            end = mid;
        }
    }

    return (start === nums.length - 1 || nums[start] > nums[end]) ? start : end;
}

//  * 2. Binary Search: Recursion
const findPeakElementRecursion = function(nums) {
    return helper(nums, 0, nums.length-1);
}

/**
 * Binary Search Helper Function
 * 
 * @param {number[]} nums 
 * @param {number} start 
 * @param {number} end 
 * @return {number} index
 */
const helper = function(nums, start, end) {
    // Base case
    if (start === end) {
        return start;
    }
    
    // Recursive case
    let mid = start + Math.floor((end - start) / 2);
    let mid2 = mid + 1;

    if (nums[mid] > nums[mid2]) {
        return helper(nums, start, mid);
    } else {
        return helper(nums, mid2, end);
    }
}

let test1 = [1,2,3,1];
console.log(findPeakElementIteration(test1)); // 2

let test2 = [1,2,1,3,5,6,4];
console.log(findPeakElementIteration(test2)); // 1 or 5

/**
 * Leetcode Fundamental: 10/22 Update
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    // use start and end as the range boundary for binary search [start...end] (included)
    // while true case: if ther are two elements return the larger one, thus true candition can not be start <= end 
    // since we will miss the larger element by get next mid = start + (end - start) // 2 (ex: 1 + (2-1) // 2 = 1 and nums[2] is the larger one)
    // true condition: while start + 1 < end, we gonna handle the range of two out of the while loop
    let start = 0;
    let end = nums.length - 1;
    while (start + 1 < end) { // there is always at least two elements and the mid will be the later one
      let mid = start + Math.floor((end - start) / 2);
      // handle true case: nums[mid] > nums[mid-1] && nums[mid] > nums[mid+1]
      if (nums[mid] > nums[mid-1] && nums[mid] > nums[mid+1]) return mid;
      // handle the false case where nums[mid] < nums[mid+1]: mid would not be candidate, start = mid+1
      else if (nums[mid] < nums[mid+1]) start = mid + 1;
      // handle the false case where nums[mid] < nums[mid-1]: mid would not be candidate, end = mid-1
      else end = mid - 1;
    }
    
    // handle the case that the range contains only two elements: return the larger one
    if (nums[end] > nums[start]) return end;
    else return start;
  };
