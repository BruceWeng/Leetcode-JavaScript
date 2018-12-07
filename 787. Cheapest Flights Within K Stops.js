/**
There are n cities connected by m flights. Each fight starts from city u and arrives at v with a price w.

Now given all the cities and flights, together with starting city src and the destination dst, your task is to find the cheapest price from src to dst with up to k stops. If there is no such route, output -1.

Example 1:
Input: 
n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 1
Output: 200
Explanation: 
The graph looks like this:


The cheapest price from city 0 to city 2 with at most 1 stop costs 200, as marked red in the picture.
Example 2:
Input: 
n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 0
Output: 500
Explanation: 
The graph looks like this:


The cheapest price from city 0 to city 2 with at most 0 stop costs 500, as marked blue in the picture.
Note:

The number of nodes n will be in range [1, 100], with nodes labeled from 0 to n - 1.
The size of flights will be in range [0, n * (n - 1) / 2].
The format of each flight will be (src, dst, price).
The price of each flight will be in the range [1, 10000].
k is in the range of [0, n - 1].
There will not be any duplicated flights or self cycles.
 */
/**
 * Leetcode Fundamental: 12/6 Update
 * 
 * Single Source Single Destination Shortest Path
 * Reduced Dijkstra Solution:
 * T: O(K)
 * S: O(N + E)
 * Runtime: 124 ms
 */
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} K
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, K) {
  // 0 based single source single destination shortest path
  // No need for dist.fill(Inf) and visited.fill(false)
  
  let graph = [];
  for (let i = 0; i < n; i += 1) graph.push([]);
  for (let [node, next, weight] of flights) {
    graph[node].push([next, weight]);
  }
  
  let minHeap = Heap((a, b) => a[1] - b[1]); 
  minHeap.push([src, 0, K+1]); // [node, dist, available edges]
  
  while (minHeap.size() !== 0) {
    let [node, dist, k] = minHeap.pop();
    
    if (node === dst) return dist;
    
    if (k > 0) {
      for (let [next, weight] of graph[node]) {
        minHeap.push([next, dist + weight, k-1]);
      }
    }
  }
  
  return -1; // dst is not been visited
};

/**
 * Single Source Single Destination Shortest Path
 * Bellman-Ford Solution: DP
 * T: O(K)
 * S: O(N + E)
 * Runtime: 72 ms
 */
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} K
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, K) {
  let Inf = Number.MAX_SAFE_INTEGER;
  let dists = new Array(n).fill(Inf);
  dists[src] = 0;

  for (let i = 0; i < K+1; i += 1) {
    // Need a copy here, because dist of each node should not be affected by previous result
    let _dists = [...dists]; 
    for (let [node, next, weight] of flights) {
      _dists[next] = Math.min(_dists[next], dists[node] + weight);
    }
    dists = _dists;
  }
  
  return dists[dst] === Inf ? -1 : dists[dst];
};

/**
 * Note: If there is no copy of dists, in the case:
 * n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]]
 * src = 0, dst = 2, k = 0
 * The answer should be 500.
 * 
 * We will update dists[2] = 200 first and 500 will not be recorded.
 * The K constraint will be bypassed, and give back 200 as the answer.
 */