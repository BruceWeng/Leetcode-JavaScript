/**

You are given a m x n 2D grid initialized with these three possible values.

-1 - A wall or an obstacle.
0 - A gate.
INF - Infinity means an empty room. We use the value 231 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

Example: 

Given the 2D grid:

INF  -1  0  INF
INF INF INF  -1
INF  -1 INF  -1
  0  -1 INF INF
After running your function, the 2D grid should be:

  3  -1   0   1
  2   2   1  -1
  1  -1   2  -1
  0  -1   3   4
 */
/**
 * Leetcode Fundamental: 11/21 Update
 * 1. DFS solution will TLE intercollected rooms -> O(n^4)
 * 2. Multi-End BFS is stable while n grow -> O(n^2)
 * 
 * Runtime: 128 ms
 */
/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
var wallsAndGates = function(rooms) {
  if (rooms === undefined || rooms.length === 0 || rooms[0].length === 0) return;
  let m = rooms.length;
  let n = rooms[0].length;

  let queue = [];
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (rooms[i][j] === 0) queue.push([i, j]);
    }
  }

  let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // up right down left
  while (queue.length !== 0) {
    let [i, j] = queue.shift();
    for (d of dirs) {
      let nextI = i + d[0];
      let nextJ = j + d[1];

      // Check next position is in area and is empty room
      if (nextI >= 0 && nextI < m && nextJ >= 0 && nextJ < n && rooms[nextI][nextJ] === Math.pow(2, 31) - 1) {
        rooms[nextI][nextJ] = rooms[i][j] + 1;
        queue.push([nextI, nextJ]);
      }
    }
  }

  return rooms;
};