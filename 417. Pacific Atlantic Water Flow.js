/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var pacificAtlantic = function (matrix) {
  if (matrix === undefined || matrix[0] === undefined) return [];
  const m = matrix.length;
  const n = matrix[0].length;
  if (m === 0 || n === 0) return [];

  const result = [];
  const PacificCache = [];
  const AtlanticCache = [];
  for (let i = 0; i < m; i += 1) {
    PacificCache.push(new Array(n).fill(false));
    AtlanticCache.push(new Array(n).fill(false));
  }

  for (let j = 0; j < n; j += 1) {
    // Top: Pacific flow
    dfsWithCache(matrix, PacificCache, 0, j, -1);
    // Bottom: Atlantic flow
    dfsWithCache(matrix, AtlanticCache, m - 1, j, -1);
  }

  for (let i = 0; i < m; i += 1) {
    // Left: Pacific flow
    dfsWithCache(matrix, PacificCache, i, 0, -1);
    // Right: Atlantic flow
    dfsWithCache(matrix, AtlanticCache, i, n - 1, -1);

  }
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (PacificCache[i][j] && AtlanticCache[i][j]) result.push([i, j]);
    }
  }
  return result;
};

function notInArea(matrix, i, j) {
  return !(i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length);
}

function dfsWithCache(matrix, cache, i, j, preVal) {
  if (notInArea(matrix, i, j) || preVal > matrix[i][j] || cache[i][j]) return;

  cache[i][j] = true;
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  for (let d of dirs) {
    const nextI = i + d[0];
    const nextJ = j + d[1];
    dfsWithCache(matrix, cache, nextI, nextJ, matrix[i][j]);
  }
}

// 0. Init result[]
// 0. Init PacificCache[m][n] = false and AtlanticCache[m][n] = false
// 1. Traverse from top and left border and find next increasing path by dfsWithCache(matrix, PacificCache, i, j, -1)
// 2. Traverse from right and bottom border and find next increasing path by dfsWithCache(matrix, AtlanticCache, i, j, -1)
// 3. Traverse all the grids and if PacificCache[i][j] && AtlanticCache[i][j]: result.push([i, j])
// 4. return result

// dfsWithCache(matrix, cache, i, j, preVal) base conditions:
//   1. if (notInArea(i, j) || preVal > matrix[i][j] || cache[i][j]) return;
//   2. cache[i][j] = true
//   3. dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
//   4. for d of dirs: dfsWithCache(matrix, cache, nextI, nextJ, matrix[i][j])