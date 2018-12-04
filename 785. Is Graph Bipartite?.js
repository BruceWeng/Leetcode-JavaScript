/**
Given an undirected graph, return true if and only if it is bipartite.

Recall that a graph is bipartite if we can split it's set of nodes into two independent subsets A and B such that every edge in the graph has one node in A and another node in B.

The graph is given in the following form: graph[i] is a list of indexes j for which the edge between nodes i and j exists.  Each node is an integer between 0 and graph.length - 1.  There are no self edges or parallel edges: graph[i] does not contain i, and it doesn't contain any element twice.

Example 1:
Input: [[1,3], [0,2], [1,3], [0,2]]
Output: true
Explanation: 
The graph looks like this:
0----1
|    |
|    |
3----2
We can divide the vertices into two groups: {0, 2} and {1, 3}.
Example 2:
Input: [[1,2,3], [0,2], [0,1,3], [0,2]]
Output: false
Explanation: 
The graph looks like this:
0----1
| \  |
|  \ |
3----2
We cannot find a way to divide the set of nodes into two independent subsets.
 

Note:

graph will have length in range [1, 100].
graph[i] will contain integers in range [0, graph.length - 1].
graph[i] will not contain i or duplicate values.
The graph is undirected: if any element j is in graph[i], then i will be in graph[j].
 */
/**
 * Leetcode Fundamental: 12/3 Update
 * Graph Coloring
 * Reference 886. Possible Bipartition
 * T: O(N + E)
 * S: O(N)
 * Runtime: 64 ms
 */
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function(graph) {
  if (graph.length === 0) return false;
  
  let Color = {
    black: 0,
    red: 1,
    blue: 2
  }

  let colors = new Array(graph.length).fill(Color.black);
  for (const node of graph.keys()) // Faster than let i = 0; i < graph.length; i += 1
    if (colors[node] === Color.black && !canBeColor(graph, colors, Color, node, Color.red)) return false;

  return true;
};

const canBeColor = (graph, colors, Color, node, currColor) => {
  colors[node] = currColor;
  for (const next of graph[node]) {
    if (colors[next] === currColor) return false;

    let nextColor = (currColor === Color.red) ? Color.blue : Color.red;

    if (colors[next] === Color.black && !canBeColor(graph, colors, Color, next, nextColor)) return false;
  }

  return true;
};