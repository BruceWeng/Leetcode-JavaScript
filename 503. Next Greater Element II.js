/**
Given a circular array (the next element of the last element is the first element of the array), print the Next Greater Number for every element. The Next Greater Number of a number x is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, output -1 for this number.

Example 1:
Input: [1,2,1]
Output: [2,-1,2]
Explanation: The first 1's next greater number is 2; 
The number 2 can't find next greater number; 
The second 1's next greater number needs to search circularly, which is also 2.
Note: The length of given array won't exceed 10000.
 */
/**
 * Leetcode fundamental: 1/28 Update
 * Data Structure: Decreasing Stack
 * 
 * T: O(n)
 * S: O(n)
 * Runtime: 144 ms
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
  // 1. Store index of decreasing sequence in stack
  // 2. Use map to store index: next greater element pairs
  // 3. Consider nums as circular array, need to traverse the array 2n times
  // 4. if i < n: stack.push(nums[i])
  // 5. Ierate map and result[i] = map.get(i) || -1;
  // 6. return result
  let result = new Array(nums.length).fill(0);
  let stack = [];
  let map = new Map();
  for (let i = 0; i < nums.length * 2; i += 1) {
    let num = nums[i % nums.length];
    while (stack.length !== 0 && num > nums[stack[stack.length - 1]]) {
      map.set(stack.pop(), num); // key: index, value: next greater element
    }
    
    if (i < nums.length) stack.push(i);
  }
  
  for (let i = 0; i < nums.length; i += 1) {
    result[i] = map.has(i) ? map.get(i) : -1;
  }
  
  return result;
};