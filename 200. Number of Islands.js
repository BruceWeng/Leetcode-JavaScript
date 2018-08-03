/**
Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:

Input:
11110
11010
11000
00000

Output: 1
Example 2:

Input:
11000
11000
00100
00011

Output: 3
 */
/**
 * Algorithm: DFS on Matrix
 */
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  if (grid.length === 0 || grid[0].length === 0 || grid === null) {
    return 0;
  }

  let m = grid.length;
  let n = grid[0].length;
  let result = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] !== '1') {
        continue;
      }

      result++;
      traverse(i, j);
    }
  }

  function traverse(y, x) {
    if (y < 0 || y >= m || x < 0 || x >= n) {
      return;
    }

    if (grid[y][x] === '1') {
      grid[y][x] = '2';

      traverse(y + 1, x);
      traverse(y - 1, x);
      traverse(y, x + 1);
      traverse(y, x - 1);
    }
  }

  return result;
};
