/**
Given a matrix of M x N elements (M rows, N columns), return all elements of the matrix in diagonal order as shown in the below image.

 

Example:

Input:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]

Output:  [1,2,4,7,5,3,6,8,9]

Explanation:

 

Note:

The total number of elements of the given matrix will not exceed 10,000.
 */
/**
 * Leetcode Fundamental: 1/14 Update
 * Matrix to array
 * T: O(m*n)
 * S: O(m*n)
 * Runtime: 132 ms
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var findDiagonalOrder = function(matrix) {
  if (matrix === undefined || matrix.length === 0 || matrix[0].length === 0) return [];
  
  // Coordinate order:
  // [0, 0] -> 
  // [0, 1] -> [1, 0] -> 
  // [2, 0] -> [1, 1] -> [0, 2] -> 
  // [1, 2] -> [2, 1] -> 
  // [2, 2]
  // Pattern: i in [0...M*N-1], result = new Array(m*n).fill(0);
  // row in [0...M-1]
  // col in [M*N-1 - row...0]
  // if (row + col) % 2 == 0: moving up cell
  //   row -= 1
  //   col += 1
  // boundary row === 0: col += 1
  // boundary col === N-1: row += 1
  // if (row+col) % 2 === 1: moving down cell
  //   row += 1
  //   col -= 1
  // boundary col === 0: row += 1
  // or row === M-1: col += 1
  let m = matrix.length;
  let n = matrix[0].length;
  let result = new Array(m * n).fill(0);
  
  let row = 0;
  let col = 0;
  for (let i = 0; i < result.length; i += 1) {
    result[i] = matrix[row][col];
    if ((row + col) % 2 === 0) {
      // moving cell up
      // Boundary Condition
      if (col === n - 1) row += 1; // check col before row to handle corner case matrix[0][n-1]: row += 1
      else if (row === 0) col += 1;
      else {
        row -= 1;
        col += 1;
      }
    } else {
      // moving cell down
      // Boundary Condition
      if (row === m - 1) col += 1; // check row before col to handle corner case matrix[m-1][0]: col += 1
      else if (col === 0) row += 1;
      else {
        row += 1;
        col -= 1;
      }
    }
  }
  
  return result;
};