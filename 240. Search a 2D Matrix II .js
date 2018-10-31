/**
Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom.
Example:

Consider the following matrix:

[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
Given target = 5, return true.

Given target = 20, return false.
 */
/**
 * There is no O(logm) + O(logn) solution for this question, but there is O(m + n) solution (Two Pointers)
 * Search from top right element in the matrix:
 *  if (matrix[row][col] === target) return true
 *  if (matrix[row][col] < target) row += 1
 *  if (matrix[row][col] > target) col -= 1
 */
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  if (matrix === undefined || target === undefined) return false;
  
  if (matrix.length === 0 || matrix[0].length === 0) return false;
  
  let row = 0;
  let col = matrix[0].length - 1;
  
  while (row < matrix.length && col >= 0) {
    let mid_value = matrix[row][col];
    
    if (mid_value === target) return true;
    
    if (mid_value < target) row += 1;
    
    else col -= 1;
  }
  
  return false;
};