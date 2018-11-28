/**
In a directed graph, we start at some node and every turn, walk along a directed edge of the graph.  If we reach a node that is terminal (that is, it has no outgoing directed edges), we stop.

Now, say our starting node is eventually safe if and only if we must eventually walk to a terminal node.  More specifically, there exists a natural number K so that for any choice of where to walk, we must have stopped at a terminal node in less than K steps.

Which nodes are eventually safe?  Return them as an array in sorted order.

The directed graph has N nodes with labels 0, 1, ..., N-1, where N is the length of graph.  The graph is given in the following form: graph[i] is a list of labels j such that (i, j) is a directed edge of the graph.

Example:
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
Here is a diagram of the above graph.

Illustration of graph

Note:

graph will have length at most 10000.
The number of edges in the graph will not exceed 32000.
Each graph[i] will be a sorted list of different integers, chosen within the range [0, graph.length - 1].
 */
/**
 * Leetcode Fundamental: 11/28 Update
 * Graph/BFS/DFS/Topological Sort/Coloring
 * 
 * Failure:
 * Fail to understand the definition of "safe node"
 * Safe node: node on the path that has no cycle
 * 
 * 0. Let color array represent as node states:
 *    0: default(unvisited)
 *    1: safe
 *    2: unsafe
 * 1. Iterate each node as start node
 * 2. Declare a helper func isSafe(graph, start, color): boolean
 * 3. If isSafe(graph, i, color): result.push(i)
 * 4. Return result
 * 
 * isSafe(graph, start, color): boolean
 * 1. if color[start] !== 0 (visited): return true if color[start] === 1, else return false
 * 2. color[start] = 2
 * 3. Iterate graph[start]:
 *    for (let node of graph[start]):
 *      if (!isSafe(graph, node, color)): return false
 * 4. Restore color[start] = 1, return true
 * 
 * T: Iterate graph: O(N), Iterate arrays in graph: O(E)
 * T: O(N + E) 
 * S: result + color: O(N), Stack Depth: O(E)
 * S: O(N + E) 
 * Runtime: 140 ms
 * 
 * Note: Graph: index: node(N), value: array of target node(Edge)
 */
/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function(graph) { // graph[i] is allowed to be empty
  if (graph === undefined) return [];

  let result = []; // O(N)
  let color = new Array(graph.length).fill(0); // O(N)

  for (let i = 0; i < graph.length; i += 1) { // O(N)
    if (isSafe(graph, i, color)) result.push(i);
  }

  return result;
};

const isSafe = (graph, start, color) => {
  if (color[start] !== 0) return color[start] === 1;

  color[start] = 2
  for (let node of graph[start]) { // O(E): Stack Depth
    if (!isSafe(graph, node, color)) return false;
  }

  color[start] = 1;
  return true;
};