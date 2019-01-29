/**
Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.

Above is a histogram where width of each bar is 1, given height = [2,1,5,6,2,3].

The largest rectangle is shown in the shaded area, which has area = 10 unit.

Example:

Input: [2,1,5,6,2,3]
Output: 10
 */
/**
 * Reference: https://leetcode.com/problems/largest-rectangle-in-histogram/discuss/28917/AC-Python-clean-solution-using-stack-76ms
 */
 /**
  * Data Structure: Increasing Stack
  * Algorithm:
  * 1. The stack maintain the indexes of buildings with ascending height. 
  * 2. Before adding a new building pop the building who is taller than the new one. 
  * 3. The building popped out represent the height of a rectangle with the new building as the right boundary and the current stack top as the left boundary. 
  * 4. Calculate its area and update ans of maximum area. Boundary is handled using dummy buildings.
  * 
  * T: O(n)
  * S: O(n)
  */
 /**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  // 1. Declare an increasing stack stores increasing sequence indecies
  // 2. heights.push(0) as right boundary prevent missing calculate the case that lowest height as area height
  // 3. for h, i of heights:
  //    a. while current num < stack.peek():
  //      height = height[stack.pop()]
  //      width = current index - stack.peek() - 1;
  //      maxArea = max(maxArea, height * width)
  //    b. stack.push(i)
  // 4. restore heights by heights.pop()
  // return maxArea
  
  // Handle the case need to calculate area after pop the last index in stack, prevent undefined cause NaN
  let stack = [-1]; 
  let maxArea = 0;
  
  // Add right boundary
  heights.push(0);
  
  for (let i = 0 ; i < heights.length; i += 1) {
    while (stack.length !== 0 && heights[i] < heights[stack[stack.length - 1]]) { 
      // stack will never be empty because all the heights are positive
      let lastIdx = stack.pop();
      let height = heights[lastIdx];
      let width = i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    
    stack.push(i);
  }
  
  // Restore heights
  heights.pop();
  
  return maxArea;
};