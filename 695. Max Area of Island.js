/**
Given a non-empty 2D array grid of 0's and 1's, an island is a group of 1's (representing land) 
connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid 
are surrounded by water.

Find the maximum area of an island in the given 2D array. (If there is no island, the maximum 
area is 0.)

Note: The length of each dimension in the given grid does not exceed 50.
 */
/**
 * Algorithm: DFS
 * 1. Use bool[][] with same size of grid to label if the cell is visited
 * 2. Declare result to store max area size
 * 3. iterate the grid by
 *      for i in range(0, row):
 *        for j in range(0, col):
 *          if (grid is not visited and grid[i][j] === 1):
 *            result = max(result, helper(grid, i, j, row, col));
 * 4. helper(grid, i, j, row, col):
 *      // return 0 case:
 *      a. check if i or j is out of grid boundary
 *      b. check if visited[i][j] === true
 *      visited[i][j] = true
 *      c. check grid[i][j] === 0
 *     // return find next cell case:
 *     return helper (up + down + left + right) + 1 (current)
 * 5. return result
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
let row;
let col;
let g;

const maxAreaOfIsland = (grid) => {
  g = grid;
  row = g.length;
  col = g[0].length;
  let result = 0;

  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < col; j += 1) {
      if (g[i][j] === 1) {
        result = Math.max(result, helper(i, j));
      }
    }
  }
  
  return result;
};

const helper = (i, j) => {
  if (i < 0 || i >= row || j < 0 || j >= col || g[i][j] === 0) return 0;

  g[i][j] = 0;

  return helper(i-1, j) + helper(i+1, j) + 
         helper(i, j-1) + helper(i, j+1) + 1;
};

let test1 = [
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
];
console.log(maxAreaOfIsland(test1)); // 6

let test2 = [
  [0,0,0,0,0,0,0,0]
];

console.log(maxAreaOfIsland(test2)); // 0

/**
 * Leetcode Fundamental: 11/27 Update
 * Review
 * 
 * Runtime: 76 ms
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */

const maxAreaOfIsland = (grid) => {
  let result = 0;

  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[0].length; j += 1) {
      if (grid[i][j] === 1) {
        result = Math.max(result, helper(grid, i, j));
      }
    }
  }
  
  return result;
};

const helper = (grid, i, j) => {
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === 0) return 0;

  grid[i][j] = 0;

  return helper(grid, i-1, j) + helper(grid, i+1, j) + 
         helper(grid, i, j-1) + helper(grid, i, j+1) + 1;
};