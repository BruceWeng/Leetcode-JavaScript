/**
You are given two arrays (without duplicates) nums1 and nums2 where nums1’s elements are subset of nums2. Find all the next greater numbers for nums1's elements in the corresponding places of nums2.

The Next Greater Number of a number x in nums1 is the first greater number to its right in nums2. If it does not exist, output -1 for this number.

Example 1:
Input: nums1 = [4,1,2], nums2 = [1,3,4,2].
Output: [-1,3,-1]
Explanation:
    For number 4 in the first array, you cannot find the next greater number for it in the second array, so output -1.
    For number 1 in the first array, the next greater number for it in the second array is 3.
    For number 2 in the first array, there is no next greater number for it in the second array, so output -1.
Example 2:
Input: nums1 = [2,4], nums2 = [1,2,3,4].
Output: [3,-1]
Explanation:
    For number 2 in the first array, the next greater number for it in the second array is 3.
    For number 4 in the first array, there is no next greater number for it in the second array, so output -1.
Note:
All elements in nums1 and nums2 are unique.
The length of both nums1 and nums2 would not exceed 1000.
 */
/**
 * Leetcode Fundamental: 1/28 Update
 * Data Structure Decreasing Stack
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
  // 1. Declare result with same length as nums1 to store next greater elements
  // 2. Declare stack to store num that nums2[i] <= stack.peek()
  // 3. if stack is not empty and nums2[i] > stack.peek():
  //    3.1 num = stack.pop(), map.set(num, nums1[i]): key: num, next greater num
  // 4. stack.push(num) anyway for each iteration
  // 5. Iterate nums1 and fill mapped value to result
  let result = new Array(nums1.length).fill(0);
  let stack = [];
  let map = new Map();
  for (let num of nums2) {
    while (stack.length !== 0 && num > stack[stack.length - 1]) {
      // Set num: next greater num pairs in map
      map.set(stack.pop(), num);
    }
    stack.push(num);
  }
  
  for (let i = 0; i < nums1.length; i += 1) {
    result[i] = map.get(nums1[i]) || -1;
  }
  
  return result;
};