/**
Given an integer matrix, find the length of the longest increasing path.

From each cell, you can either move to four directions: left, right, up or down. You may NOT move diagonally or move outside of the boundary (i.e. wrap-around is not allowed).

Example 1:

Input: nums = 
[
  [9,9,4],
  [6,6,8],
  [2,1,1]
] 
Output: 4 
Explanation: The longest increasing path is [1, 2, 6, 9].
Example 2:

Input: nums = 
[
  [3,4,5],
  [3,2,6],
  [2,2,1]
] 
Output: 4 
Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.
 */
/**
 * Leetcode Fundamental: 11/21 Update
 * 1. DFS search each cell and pass cache to next position
 * 2. Declare cache[m][n]  where cache[i][j] to store max length end at matrix[i][j] + neighbor cell
 * 3. if (i, j) not in are or  matrix[nextI][nextJ] <= matrix[i][j], continue
 *    else update cache
 * 4. In each recursion, if it's first time visit the cell: 
 *    cache[i][j] += 1 to increment the max length
 * 5. return cache[i][j]
 * 6. for i in m:
 *      for j in n:
 *        result = search(matrix, i, j, cache)
 * 7. return result
 * 
 * T: O(mn), S: O(mn)
 * Runtime: 124 ms
 */
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function(matrix) {
  if (matrix === undefined || matrix.length === 0 || matrix[0].length === 0) return 0;

  let m = matrix.length;
  let n = matrix[0].length;

  let cache = [];
  for (let i = 0; i < m; i += 1) {
    cache.push(new Array(n).fill(0));
  }

  let result = 0;
  for (let i = 0; i < m; i += 1) {
    for ( let j = 0; j < n; j += 1) {
      result = Math.max(result, search(matrix, i, j, cache, -1));
    }
  }

  return result;
};

const search = (matrix, i, j, cache, prevVal) => {
  // handle not in area and invalid case
  if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[0].length || 
    matrix[i][j] <= prevVal) return 0;

  // check cache first
  if (cache[i][j] !== 0) return cache[i][j];

  let length = 0;

  let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // up right down left
  for (let d of dirs) {
    let nextI = i + d[0];
    let nextJ = j + d[1]; // <- Frequently typo HERE!
    length = Math.max(length, search(matrix, nextI, nextJ, cache, matrix[i][j]));
  }
  length += 1;
  cache[i][j] = length;
  return length;
};