/**
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.


The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. Thanks Marcos for contributing this image!

Example:

Input: [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
 */
/**
 * Data Structure: Decreasing Stack
 * Algorithm: Reverse 84. Largest Rectangle in Histogram
 * 
 * T: O(n)
 * S: O(n)
 * Runtime: 84 ms
 */
/**
 * @param {number[]} height
 * @return {number}
 */
// Decreasing Stack
var trap = function(height) {
  if (height === undefined || height.length < 2) return 0;
  
  let stack = [];
  let waterArea = 0;
  let i = 0;
  
  while (i < height.length) {
    if (stack.length === 0 || height[i] <= height[stack[stack.length - 1]]) {
      // push condition
      stack.push(i);
      i += 1;
    }
    else {
      let lastIdx = stack.pop();
      if (stack.length !== 0) {
        // find the smaller height between the two sides
        let minHeight = Math.min(height[stack[stack.length - 1]], height[i]);
        // calculate the area
        waterArea += (minHeight - height[lastIdx]) * (i - stack[stack.length - 1] - 1);
      }
    }
  }

  return waterArea;
};