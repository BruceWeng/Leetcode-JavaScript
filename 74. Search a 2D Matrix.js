/**
Write an efficient algorithm that searches for a value in an m x n matrix.
This matrix has the following properties:

Integers in each row are sorted from left to right.
The first integer of each row is greater than the last integer of the previous row.
For example,

Consider the following matrix:

[
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
Given target = 3, return true.
 */
/**
 * Leetcode Fundamental: 10/30 Update
 * 
 * Failure: 
 * Fail to think of to treat the matrix as a sorted array
 * mid = start + (end - start) // 2
 * The mid_value = matrix[mid // col_len][mid % col_len]
 * 
 * Note: this method actually slower lol
 * T: O(log(m*n))
 */
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

const searchMatrix = (matrix, target) => {
  if (matrix === undefined || target === undefined) return false;

  if (matrix.length === 0 || matrix[0].length === 0) return false;

  const row_len = matrix.length;
  const col_len = matrix[0].length;
  let start = 0;
  let end = row_len * col_len - 1;

  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);
    let mid_value = matrix[Math.floor(mid / col_len)][mid % col_len];

    if (mid_value === target) return true;

    if (mid_value < target) start = mid + 1;

    else end = mid - 1;
  }

  return false;
};

/**
 * T: O(logn + logm)
 */
var searchMatrix = function(matrix, target) {
  // Binary search the first element of each row, if rows[row_mid][0] === target: return true
  // if rows[row_mid][0] < target: binary search rows[row_mid][col_mid], 
  //                             if rows[row_mid][col_mid] === target: return true
  //                             if rows[row_mid][col_mid] < target: col_start = col_mid + 1
  //                             if rows[row_mid][col_mid] > target: col_end = col_mid - 1
  // if rows[row_mid][0] > target: row_end = row_mid - 1
  // exit while: return false
  // row while loop true condition: row_start <= row_end (edge case: row_start === row_end, still need to search)
  // outside of inner while loop: no target find in this row: row_start = row_mid + 1
  // col while loop true condition: col_start <= col_end (same as above)
  // T: O(logn) + O(logm)
  
  // Handle edge case: matrix is undefined or target is undefined
  if (matrix === undefined || target === undefined) return false;
  
  // Handle edge case: there is no row in matrix or no element in the row
  if (matrix.length === 0 || matrix[0].length === 0) return false;
  
  const n = matrix.length;
  const m = matrix[0].length;
  let row_start = 0;
  let row_end = n - 1;
  
  while (row_start <= row_end) {
    let row_mid = row_start + Math.floor((row_end - row_start) / 2);
    if (matrix[row_mid][0] === target) return true;
    
    if (matrix[row_mid][0] < target) {
      let col_start = 0;
      let col_end = m - 1;
      
      while (col_start <= col_end) {
        let col_mid = col_start + Math.floor((col_end - col_start) / 2);
        if (matrix[row_mid][col_mid] === target) return true;
        
        if (matrix[row_mid][col_mid] < target) col_start = col_mid + 1;
        else col_end = col_mid - 1;
      }
      
      row_start = row_mid + 1;
    }
    
    else row_end = row_mid - 1;
  }
  
  return false;
};