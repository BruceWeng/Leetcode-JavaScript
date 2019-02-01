/**
Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

Example:

Input:
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
Output: 6
 */
/**
 * Data Structure: Stack
 * Algorithm: 84. Largest Rectangle in Histogram
 * T: O(n*m), S: O(m)
 * Runtime: 104 ms
 */
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
  if (matrix === undefined || matrix.length === 0 || matrix[0].length === 0) return 0;
  // 1. Map the matrix to histogram of an array - T: O(n*m), S: O(m)
  //   1.a increament height[i] if row[i] === 1, else reset height[i] to 0, because rows not connected
  // 2. Use algorithm in 84. Largest Rectangle in Histogram - T: O(m), S: O(m)
  //   2.a update maxArea every row because the answer might only includes rows in matrix, but not last row
  // 3. Total: T: O(n*m), S: O(m)
  
  // 1.
  let maxArea = 0;
  let heights = new Array(matrix[0].length + 1).fill(0); // fill one more 0 to add right boundary
  for (let row of matrix) {
    for (let i = 0; i < row.length; i += 1) {
      if (row[i] === '1') heights[i] += parseInt(row[i]);
      else heights[i] = 0;
    }
    
    // 2.a
    maxArea = calMaxArea(maxArea, heights);
  }
  
  return maxArea;
};

// 2.
const calMaxArea = (maxArea, heights) => {
  // Handle the case need to calculate area after pop the last index in stack, prevent undefined cause NaN
  let stack = [-1]; 
  
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
  
  return maxArea;
};