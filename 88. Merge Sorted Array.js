/**
Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

Note:

The number of elements initialized in nums1 and nums2 are m and n respectively.
You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2.
Example:

Input:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

Output: [1,2,2,3,5,6]
 */
/**
 * Leetcode Fundamentals: 11/1 Update
 * T: O(m+n), S: O(1)
 */
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  // Handle invalid inputs
  if (nums2.length === 0) return;
  
  let insert_pos = nums1.length - 1;
  let i = m - 1;
  let j = n - 1;
  
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[insert_pos] = nums1[i];
      i -= 1;
      insert_pos -= 1;
    }
    else {
      nums1[insert_pos] = nums2[j];
      j -= 1;
      insert_pos -= 1;
    }
  }
  
  while (j >= 0) {
    nums1[insert_pos] = nums2[j];
    j -= 1;
    insert_pos -= 1;
  }
};