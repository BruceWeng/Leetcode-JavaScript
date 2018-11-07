/**
Given two arrays, write a function to compute their intersection.

Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Note:

Each element in the result should appear as many times as it shows in both arrays.
The result can be in any order.
Follow up:

What if the given array is already sorted? How would you optimize your algorithm?
What if nums1's size is small compared to nums2's size? Which algorithm is better?
What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?
 */
/**
 * Leetcode Fundamental: 11/7 Update
 * Follow up:
 * If only nums2 cannot fit in memory, put all elements of nums1 into a HashMap, read chunks of array that fit into the memory, and record the intersections.
 * If both nums1 and nums2 are so huge that neither fit into the memory, sort them individually (external sort), then read 2 elements from each array at a time in memory, record intersections.
 * 
 * 1. sort array 1, uses no extra memory and takes O(n * log n) time
 * 2. create new hash to record intersection
 * 3. read chunks from disk, binary search 1st array, if found, include in intersection hash
 * 4. once done, convert intersection to array, return
 * Note: If you have no more memory to have an intersection hash, you can create a hash on disk and buffer up values and put into there.
 * 
 * I think the goal of this question is to test whether the interview understands some of the data engineering techniques. From a data engineer's perspective, basically there are three ideas to solve the question:
 * 
 * 1. Store the two strings in distributed system(whether self designed or not), then using MapReduce technique to solve the problem;
 * 
 * 2. Processing the Strings by chunk, which fits the memory, then deal with each chunk of data at a time;
 * 
 * 3. Processing the Strings by streaming, then check.
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  // handle edge case
  if (nums1 === undefined || nums2 === undefined || nums1.length === 0 || nums2.length === 0) return [];
  
  let result = [];
  // construct map for nums1: key: num, value: freq
  let map = {};
  for (let num of nums1) {
    if (num in map) map[num] += 1;
    else map[num] = 1;
  }
  
  for (let num of nums2) {
    if (num in map && map[num] > 0) {
      result.push(num);
      map[num] -= 1;
    }
  }
  
  return result;
};