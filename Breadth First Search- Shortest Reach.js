/**
Consider an undirected graph where each edge is the same weight. Each of the nodes is labeled consecutively.

You will be given a number of queries. For each query, you will be given a list of edges describing an undirected 
graph. After you create a representation of the graph, you must determine and report the shortest distance to each 
of the other nodes from a given starting position using the breadth-first search algorithm (BFS). Distances are to 
be reported in node number order, ascending. If a node is unreachable, print -1 for that node. Each of the edges 
weighs 6 units of distance.

For example, given a graph with 5 nodes and 3 edges, [1, 2], [1, 3], [3, 4], a visual representation is:

image

The start node for the example is node 1. Outputs are calculated for distances to nodes 2 through 5: [6, 6, 12, -1]. 
Each edge is 6 units, and the unreachable node 5 has the required return distance of -1.

Function Description

Complete the bfs function in the editor below. It must return an array of integers representing distances from the 
start node to each other node in node ascending order. If a node is unreachable, its distance is -1.

bfs has the following parameter(s):

n: the integer number of nodes
m: the integer number of edges
edges: a 2D array of start and end nodes for edges
s: the node to start traversals from
 */
/**
 * Graph Fundamental: 12/4 Update
 */
function bfs(n, m, edges, s) {
  let weight = 6;
  // build graph
  let graph = [];
  for (let i = 0; i < n; i += 1) graph.push([]);

  for (const[node, next] of edges) {
    graph[node-1].push(next-1);
    graph[next-1].push(node-1);
  }

  let queue = [s-1];
  let level = 0;
  let result = new Array(n).fill(-1);
  result[s-1] = 0;
  while (queue.length !== 0) {
    let size = queue.length;
    for (let i = 0 ; i < size; i += 1) {
      let node = queue.shift();
      level += 1;
      for (next of graph[node]) {
        if (result[next] === -1) result[next] = 0;
        result[next] += weight * level;
      }
    }
  }

  return result;
}

// Test1
let n = 4;
let m = 2;
let edges = [[1, 2], [1, 3]];
let s = 1;
console.log(bfs(n, m, edges, s)); // [0, 6, 6, -1]

// Test2
let n2 = 3;
let m2 = 1;
let edges2 = [[2, 3]];
let s2 = 2;
console.log(bfs(n2, m2, edges2, s2)); // [-1, 0, 6]