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
