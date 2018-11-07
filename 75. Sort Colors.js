/**
Given an array with n objects colored red, white or blue, sort them in-place so
that objects of the same color are adjacent, with the colors in the order red, white and blue.

Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

Note: You are not suppose to use the library's sort function for this problem.

Example:

Input: [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Follow up:

A rather straight forward solution is a two-pass algorithm using counting sort.
First, iterate the array counting number of 0's, 1's, and 2's, then overwrite array
with total number of 0's, then 1's and followed by 2's.
T: O(n)
S: O(n)

Could you come up with a one-pass algorithm using only constant space?
"""
"""
Algorithm: Swap
1. Declare zero = 0 points to first index, second = len(nums) - 1 points last index
2. Iterate the nums when i <= second:
    2.a whenever find nums[i] == 2 and i < second, swap(nums[i], nums[second]), second -= 1
    2.b whenever find nums[i] == 0 and i > zero, swap(nums[i], nums[zero]), zero += 1

T: O(n)
S: O(1)

Algorithm2: 3 Ways Quick Select Partition
1. pointer: zero = -1, two = n ([zero...two])
2. nums[0...zero] = 0
   nums[zero+1...i-1] = 1
   nums[two...n-1] = 2
3. for (i = 0; i < two; ):
    if num == 1: 
      i += 1
    if num == 2: 
      swap(num, nums[two-1])
      two -= 1
    if num == 0:
      swap(num, nums[zero+1])
      zero += 1
 */
/**
 * Leetcode Fundamental: 11/6 Update
 * Failure:
 * Fail to think of finding non-one element and move to its final position
 */
const sortColors = (nums) => {
  let zero = 0; // inclusive
  let two = nums.length - 1; // inclusive
  let i = 0;
  while (i <= two) { // i has to <= two since two and i are possible be equal and we miss one swap
    // Find first non-one position
    if (nums[i] === 1) i += 1;
    // if nums[i] === 2, move it to last two position
    else if (nums[i] === 2) {
      swap(nums, i, two);
      two -= 1;
    } 
    // if nums[i] === 0, move it to first zero position
    else {
      swap(nums, i, zero);
      zero += 1
      i += 1 // Increment i to find next one
    }
  }

  return nums;
}

const swap = (nums, i, j) => {
  [nums[i], nums[j]] = [nums[j], nums[i]];
}

const test = [2,0,2,1,1,0];
console.log(sortColors(test)); // [0,0,1,1,2,2]