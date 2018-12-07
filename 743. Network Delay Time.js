/**
There are N network nodes, labelled 1 to N.

Given times, a list of travel times as directed edges times[i] = (u, v, w), where u is the source node, v is the target node, and w is the time it takes for a signal to travel from source to target.

Now, we send a signal from a certain node K. How long will it take for all nodes to receive the signal? If it is impossible, return -1.

Note:
N will be in the range [1, 100].
K will be in the range [1, N].
The length of times will be in the range [1, 6000].
All edges times[i] = (u, v, w) will have 1 <= u, v <= N and 1 <= w <= 100.
 */
/**
 * Leetcode Fundamental: 12/6 Update
 * Dijkstra Solution:
 * T: O(NlogN + E)
 * S: O(N + E)
 * 
 * Runtime: 160 ms
 */
const Heap = require("./Heap");
/**
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
var networkDelayTime = function(times, N, K) {
  let Inf = Number.MAX_SAFE_INTEGER;
  let dists = new Array(N+1).fill(Inf); // leave index 0 blank
  
  let graph = [];
  for (let i = 0; i < N+1; i += 1) graph.push([]);
  for (let [node, next, weight] of times) {
    graph[node].push([next, weight]); 
  }
  
  let visited = new Array(N+1).fill(false); // leave index 0 blank
  let minHeap = Heap((a, b) => a[1] - b[1]);
  
  minHeap.push([K, 0]); // Push i rather than i-1
  
  while (minHeap.size() !== 0) {
    let [node, dist] = minHeap.pop();
    if (visited[node]) continue;
    
    dists[node] = dist;
    visited[node] = true;
    
    for (let [next, weight] of graph[node]) {
      if (!visited[next] && dist + weight < dists[next]) {
        minHeap.push([next, dist + weight]);
      }
    }
  }
  
  let result = 0;
  for (let i = 1; i < dists.length; i += 1) { // skip index 0
    if (dists[i] === Inf) return -1;
    else result = Math.max(result, dists[i]);
  }
  
  return result;
};

/**
 * Bellman-Ford Solution (Support Negative Weight)
 * Strategy: DP
 * T: O(N*E)
 * S: O(N)
 * 
 * Runtime: 244 ms
 */
/**
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
var networkDelayTime = function(times, N, K) {
  let Inf = Number.MAX_SAFE_INTEGER;
  let dists = new Array(N+1).fill(Inf); // Stages in DP
  dists[K] = 0; // Initialization
  
  for (let i = 1; i < N+1; i += 1) {
    for (let [node, next, weight] of times) {
      dists[next] = Math.min(dists[next], dists[node] + weight);
    }
  }

  let result = 0;
  for (let i = 1; i < dists.length; i += 1) {
    if (dists[i] === Inf) return -1;
    else result = Math.max(result, dists[i]);
  }

  return result;
};

/**
 * Floyd-Warshall Solution (All Source All Destination Shortest Path)
 * T: O(N^3)
 * S: O(N^2)
 * 
 * Runtime: 108 ms
 * 
 * Note: DP technique related to 546. Remove Boxes
 */
/**
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
var networkDelayTime = function(times, N, K) {
  let Inf = Number.MAX_SAFE_INTEGER;
  let dists = []; // N to N dists
  for (let i = 0; i < N+1; i += 1) {
    dists.push(new Array(N+1).fill(Inf));
  }

  // Initialization
  for (let [node, next, weight] of times) 
    dists[node][next] = weight; // row as node, col as next, and cell value as weight

  for (let i = 1; i < N+1; i += 1) 
    dists[i][i] = 0; // no weight to itself

  // DP pattern: loop k-i-j
  for (let k = 1; k < N+1; k += 1)
    for (let i = 1; i < N+1; i += 1)
      for (let j = 1; j < N+1; j += 1)
        dists[i][j] = Math.min(dists[i][j], dists[i][k] + dists[k][j]);

  let result = 0;
  for (let col = 1; col < N+1; col += 1) {
    // The answer at row: K
    if (dists[K][col] === Inf) return -1;
    else result = Math.max(result, dists[K][col]);
  }

  return result;
};