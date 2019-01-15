/**
Given a non-negative integer numRows, generate the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it.

Example:

Input: 5
Output:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
 */
/**
 * Leetcode Explore: 1/14/2019 Update
 * T: O(n^2)
 * S: O(n^2)
 */
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  if (numRows <= 0) return [];
  
  // Coordinate Order:
  // [0, 0] = 1
  // [1, 0] = 1, [1, 1] = 1
  // [2, 0] = 1, [2, 1] = 2, [2, 2] = 1
  // [3, 0] = 1, [3, 1] = 3, [3, 2] = 3, [3, 3] = 1
  // [4, 0] = 1, [4, 1] = 4, [4, 2] = 6, [4, 3] = 4, [4, 4] = 1
  
  // Pattern: 
  // if col === 0: result[row, 0] = 1
  // if col === numRow-1: result[row, col] = 1
  // else: result[i][j] = result[i-1][j-1] + result[i-1][j]
  
  // Initilization
  let result = [];
  result.push([1]);
  
  for (let numRow = 1; numRow < numRows; numRow += 1) {
    let newRow = [];
    let lastRow = result[result.length-1];
    for (let j = 0; j < lastRow.length + 1; j += 1) {
      if (j === 0 || j === lastRow.length) newRow.push(1);
      else newRow.push(result[numRow-1][j-1] + result[numRow-1][j]);
    }
    result.push(newRow);
  }
  
  return result;
};