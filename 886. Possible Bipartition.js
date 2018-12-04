/**
Given a set of N people (numbered 1, 2, ..., N), we would like to split everyone into two groups of any size.

Each person may dislike some other people, and they should not go into the same group. 

Formally, if dislikes[i] = [a, b], it means it is not allowed to put the people numbered a and b into the same group.

Return true if and only if it is possible to split everyone into two groups in this way.

 

Example 1:

Input: N = 4, dislikes = [[1,2],[1,3],[2,4]]
Output: true
Explanation: group1 [1,4], group2 [2,3]
Example 2:

Input: N = 3, dislikes = [[1,2],[1,3],[2,3]]
Output: false
Example 3:

Input: N = 5, dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]
Output: false
 

Note:

1 <= N <= 2000 <- N
0 <= dislikes.length <= 10000 <- E (Sparse Graph)
1 <= dislikes[i][j] <= N
dislikes[i][0] < dislikes[i][1]
There does not exist i != j for which dislikes[i] == dislikes[j].
 */
/**
 * Leetcode Fundamental: 12/3 Update
 * Brute Force: O(n*2^n)
 * 
 * If it is a Dense Graph, Edge should be 2000 * 1000 = 2000,000
 * 
 * Solution: Graph Coloring
 * Markd node as red and neighbor as blue recursively.
 * If we can finish all the nodes, the graph is possible bipartited. Return true.
 * Lead: N <= 2000, E <= 10000: 
 * Each node be visited once. 
 * Each edge be visited once.
 * T: O(N + E)
 * S: O(N + E) Graph
 */
/**
 * DFS Solution
 * Runtime: 120 ms
 */
/**
 * @param {number} N
 * @param {number[][]} dislikes
 * @return {boolean}
 */
var possibleBipartition = function(N, dislikes) {
  // Handle edge case
  if (N <= 0) return false;

  // Construct Graph: index: node, value: [neighbors]
  let graph = []; // S: O(V + E)
  for (let i = 0; i < N; i += 1) {
    graph.push([]);
  }
    
  for (d of dislikes) { // undirectional
    graph[d[0]-1].push(d[1]-1);
    graph[d[1]-1].push(d[0]-1);
  }

  let Color = {
    black: 0, // Unvisited
    red: 1,
    blue: 2
  };

  let colors = new Array(N).fill(Color.black);
  for (let i = 0; i < N; i += 1)
    if (colors[i] === Color.black && !canBeColor(graph, colors, Color, i, Color.red)) return false;
  
  return true;
};

const canBeColor = (graph, colors, Color, node, currColor) => {
  colors[node] = currColor;
  for (let next of graph[node]) {
    if (colors[next] === currColor) return false;
    // Toggle Color
    let nextColor = (currColor === Color.red) ? Color.blue: Color.red;
    
    if (colors[next] === Color.black && !canBeColor(graph, colors, Color, next, nextColor)) return false;
  }

  return true;
};

/**
 * BFS Solution
 * Runtime: 120 ms
 */
/**
 * @param {number} N
 * @param {number[][]} dislikes
 * @return {boolean}
 */
var possibleBipartition = function(N, dislikes) {
  if (N <= 0) return false;

  // Construct Graph: index: node, value: [neighbors]
  let graph = []; // S: O(V + E)
  for (let i = 0; i < N; i += 1) {
    graph.push([]);
  }
    
  for (d of dislikes) { // undirectional
    graph[d[0]-1].push(d[1]-1);
    graph[d[1]-1].push(d[0]-1);
  }

  let Color = {
    black: 0, // Unvisited
    red: 1,
    blue: 2
  };
  
  let colors = new Array(N).fill(Color.black);
  // The same above as DFS

  let queue = [];
  // Mark Black nodes
  for (let i = 0; i < N; i += 1) {
    if (colors[i] !== Color.black) continue;
    colors[i] = Color.red;
    queue.push(i);
    while (queue.length !== 0) {
      let node = queue.shift();
      for (let next of graph[node]) {
        if (colors[next] === colors[node]) return false;
        if (colors[next] !== Color.black) continue;
        let nextColor = (colors[node] === Color.red) ? Color.blue : Color.red;
        colors[next] = nextColor;
        queue.push(next);
      }
    }
  }

  return true;
};