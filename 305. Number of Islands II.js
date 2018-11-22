/**
A 2d grid map of m rows and n columns is initially filled with water. We may perform an 
addLand operation which turns the water at position (row, col) into a land. Given a list 
of positions to operate, count the number of islands after each addLand operation. An 
island is surrounded by water and is formed by connecting adjacent lands horizontally 
or vertically. You may assume all four edges of the grid are all surrounded by water.

Follow up:

Can you do it in time complexity O(k log mn), where k is the length of the positions?
 */
/**
 * Algorithm: Union find
 */
/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} positions
 * @return {number[]}
 */
const numIslands = function(m, n, positions) {
  let result = [];
  if (m <= 0 || n <= 0) return result;

  let count = 0;
  let roots = new Array(m * n).fill(-1);   // 1D array of roots
  let rank  = new Array(m * n).fill(0);    // 1D array of rank of each tree
  let directions = [ [-1, 0], [1, 0], [0, -1], [0, 1] ];

  for (let p of positions) {
    let island = p[0] * n + p[1];
    roots[island] = island;     // Set it to be the root of itself.
    rank[island] += 1;
    count += 1;

    // Check four directions
    for (let dir of directions) {
      let x = p[0] + dir[0];
      let y = p[1] + dir[1];
      let neighbor = x * n + y;

      // Skip when x or y is invalid, or neighbor is water.
      if (x < 0 || x >= m || y < 0 || y >= n || roots[neighbor] === -1) continue;

      let neighborRoot = find(neighbor, roots);
      let islandRoot   = find(island, roots);

      if (islandRoot !== neighborRoot) {
        // Union by rank
        if (rank[islandRoot] >= rank[neighborRoot]) {
          rank[islandRoot] += rank[neighborRoot];
          roots[neighborRoot] = islandRoot;
        } else {
          rank[neighborRoot] += rank[islandRoot];
          roots[islandRoot] = neighborRoot;
        }
        count -= 1;
      }
    }

    result.push(count);
  }

  return result;
}

/**
 * 
 * @param {number} id 
 * @param {number[]} roots 
 * @return {number} parent id
 */
const find = function(id, roots) {
  if (roots[id] === id) return id;
  else {
    roots[id] = find(roots[id], roots); // path compression
    return roots[id];
  }
}

let m = 3;
let n = 3;
let positions = [[0,0], [0,1], [1,2], [2,1]];

/**
 * Leetcode Fundamental: 11/21 Update
 * Union Find T: Nearly O(1)
 * T: O(k) or O(klogmn)
 * Runtime: 136 ms
 * Optimization: Union by rank
 */
function Island(m, n) {
  var groups = new Array(m*n).fill(-1);
  var ranks = new Array(m*n).fill(0);
  var count = 0;

  const getCount = () => {
    return count;
  };
  
  const getGroups = (i, j, col) => {
    let index = i * col + j
    return groups[index];
  };

  const add = (i, j, col) => {
    let index = i * col + j;
    groups[index] = index;
    ranks[index] = 1;
    count += 1;
  };
  
  const find = (index) => {
    // Isolated
    if (groups[index] === index) return index;
  
    // Group
    return find(groups[index]);
  };
  
  const union = (i1, j1, i2, j2, col) => {
    let index1 = i1 * col + j1;
    let index2 = i2 * col + j2;
    let root1 = find(index1);
    let root2 = find(index2);
  
    // Already unioned
    if (root1 === root2) return;
  
    // Union by Rank:
    // groups[smallRoot] = largeRoot
    // ranks[largeRoot] += ranks[smallRoot]
    // rank1 > rank2: swap roots
    if (ranks[root1] > ranks[root2]) [[root1, root2] = [root2, root1]];

    // Union by Rank
    groups[root1] = root2;
    ranks[root2] += ranks[root1];

    count -= 1;
  };
  
  return {
    add,
    find,
    union,
    getCount,
    getGroups
  }  
}
/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} positions
 * @return {number[]}
 */
const numIslands2 = function(m, n, positions) {
  if (m === undefined || n === undefined || positions === undefined ||
      m === 0 || n === 0 || positions.length === 0 || positions[0].length < 2)
      return [];

  let result = [];

  let island = Island(m, n);
  let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // up right down left
  for (let p of positions) {
    let i = p[0];
    let j = p[1];
    // Add island
    island.add(i, j, n);

    // Union neighbor
    for (let d of dirs) {
      let nextI = i + d[0];
      let nextJ = j + d[1];
      if (nextI >= 0 && nextI < m && nextJ >= 0 && nextJ < n && island.getGroups(nextI, nextJ, n) !== -1) island.union(i, j, nextI, nextJ, n);
    }

    // Update count
    result.push(island.getCount());
  }
  return result;
};

console.log(numIslands2(m, n, positions)); // [1,1,2,3]