/**
Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example 1:

Input: [3,2,1,5,6,4] and k = 2
Output: 5
Example 2:

Input: [3,2,3,1,2,4,5,5,6] and k = 4
Output: 4
Note: 
You may assume k is always valid, 1 ≤ k ≤ array's length.
 */
/**
 * Leetcode Fundamentals: 11/1 Update
 * Failure:
 * 1. Fail to let kth = nums.length - k (kth position)
 * 2. Failt to think of using partition func to find the actual value at kth position
 * 3. Fail to think of comparing k and partitionIndex in binary search
 * 
 * Without shuffle nums: T: O(n^2), S: O(1)
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  let kth = nums.length - k;
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    let pivot = right;
    let partitionIndex = partition(nums, pivot, left, right);
    if (partitionIndex < kth) left = partitionIndex + 1;
    else if (partitionIndex > kth) right = partitionIndex - 1
    else break;
  }
  
  return nums[kth];
};

const partition = (nums, pivot, left, right) => {
  let pivotValue = nums[pivot];
  let partitionIndex = left;
  
  for (let i = left; i < right; i += 1) {
    if (nums[i] < pivotValue) {
      swap(nums, i, partitionIndex);
      partitionIndex += 1;
    }
  }
  
  swap(nums, pivot, partitionIndex);
  return partitionIndex;
};

const swap = (nums, a, b) => {
  [ nums[a], nums[b] ] = [ nums[b], nums[a]];
};