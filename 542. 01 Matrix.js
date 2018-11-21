/**
Given a matrix consists of 0 and 1, find the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.
Example 1: 
Input:

0 0 0
0 1 0
0 0 0
Output:
0 0 0
0 1 0
0 0 0
Example 2: 
Input:

0 0 0
0 1 0
1 1 1
Output:
0 0 0
0 1 0
1 2 1
Note:
The number of elements of the given matrix will not exceed 10,000.
There are at least one 0 in the given matrix.
The cells are adjacent in only four directions: up, down, left and right.
 */
/**
 * Leetcode Fundamental: 11/21 Update
 * Failure:
 * 1. Mask cell that val = 1 to Max_Number
 * 2. Recursive update each neighbor cell once 0 cell found, pass the dist + 1 to next update dfs
 * 
 * DFS solution TLE, only BFS works
 * Nearest Question: Prefer BFS
 * Reference: 286. Walls and Gates
 */
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var updateMatrix = function(matrix) {
  let m = matrix.length;
  let n = matrix[0].length;
  if (matrix === undefined || m === 0 || n === 0) return [];

  // Mask all 1 Cell
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (matrix[i][j] === 1) matrix[i][j] = Number.MAX_SAFE_INTEGER;
    }
  }

  // Update neighbor cell to dist+1 once 0 Cell found
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (matrix[i][j] === 0) updateDist(matrix, i, j, 0);
    }
  }

  return matrix;
};

/**
 * 
 * @param {num[]} matrix 
 * @param {num} i 
 * @param {num} j 
 * @param {num} dist 
 * @return {Void}
 */
const updateDist = (matrix, i, j, dist) => {
  // Handle not in area case && smaller val already found case
  if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[0].length || matrix[i][j] < dist) return;

  matrix[i][j] = dist;

  updateDist(matrix, i-1, j, dist+1); // up
  updateDist(matrix, i, j+1, dist+1); //right
  updateDist(matrix, i+1, j, dist+1); //down
  updateDist(matrix, i, j-1, dist+1); // left
};

/**
 * BFS Solution
 * Runtime: 216 ms
 * 
 * The approach enqueue multiple position in the queue at first round is called:
 * Mutli-End BFS
 * 
 * If we call BFS function every time we find matrix[i][j] === 0 (single start point):
 * Naive BFS -> TLE
 */
const updateMatrix = (matrix) => {
  let m = matrix.length;
  let n = matrix[0].length;
  if (matrix === undefined || m === 0 || n === 0) return [];

  let queue = [];

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (matrix[i][j] === 0) queue.push([i, j]);
      else matrix[i][j] = Number.MAX_SAFE_INTEGER;
    }
  }

  let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]; //up right down left
  while (queue.length !== 0) {
    let [i, j] = queue.shift();
    for (let d of dirs) {
      let nextI = i + d[0];
      let nextJ = j + d[0];

      // If next position in area or cell value is larger than current cell value + 1
      // update the neighbor cell
      if (nextI > 0 && nextI < m && nextJ > 0 && nextJ < n && matrix[nextI][nextJ] > matrix[i][j] + 1) {
        matrix[nextI][nextJ] = matrix[i][j] + 1;
        queue.push([nextI, nextJ]);
      }
    }
  }

  return matrix;
};