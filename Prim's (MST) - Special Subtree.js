/**
Given a graph which consists of several edges connecting its nodes, find a subgraph of the given graph with the following properties:

The subgraph contains all the nodes present in the original graph.
The subgraph is of minimum overall weight (sum of all edges) among all such subgraphs.
It is also required that there is exactly one, exclusive path between any two nodes of the subgraph.
One specific node S is fixed as the starting point of finding the subgraph using Prim's Algorithm. 
Find the total weight or the sum of all edges in the subgraph.

        w: 2
     2 ----- 3
     |      /
w: 2 |    / w: 3
     |  /
     1

For example, consider a graph with 3 nodes. Possible edges are  1 - 2 weight 2, 
2 - 3 weight 2 and 1 - 3 weight 3. Starting from node 1, we select the lower weight path, 
i.e. 1 - 2, weight 2. From node 2, there is only one path left, 2 - 3 weight 2. 
We have all nodes connected at a cost of 2 + 2 = 4.

T: O(NlogN + ElogN) = O(ElogN)
because E at most C(N, 2) = n!/ (n-2)!2! = n(n-1)/2
S: O(N + E)
 */
let Heap = require("./Heap");
/**
 * @param {number} n
 * @param {[ [node, next, weight] ]} edges
 * @param {number} start
 * @return {number}
 */
function prims(n, edges, start) {
  let result = 0;

  // Construct Graph
  let graph = [];
  for (let i = 0; i <= n; i += 1) graph.push([]); // Cover "1 based" graph

  for (const [node, next, weight] of edges) {
    graph[node].push([next, weight]);
    graph[next].push([node, weight]);
  }

  const connected = new Set([start]); // Use set as Union
  let minHeap = Heap((a, b) => a[1] - b[1]);
  
  // Put all neighbors in Heap first
  for (const [next, weight] of graph[start]) minHeap.push([next, weight]); 

  while (minHeap.size() !== 0) {
    const [node, weight] = minHeap.pop();
    if (!connected.has(node)) {
      result += weight;
      connected.add(node);

      for (const [next, nextWeight] of graph[node]) {
        minHeap.push([next, nextWeight]);
      }
    }
  }

  return result;
}

// Test
let n = 5;
let edges = [ [0, 1, 3], [0, 2, 4], [3, 1, 6], [4, 1, 2], [1, 2, 5], [2, 4, 7] ];
let start = 0;
console.log(prims(n, edges, start)); // 15

let n2 = 4;
let edges2 = [ [0, 1, 1], [2, 1, 150], [3, 2, 99], [0, 3, 100], [2, 0, 200] ];
let start2 = 3;
console.log(prims(n2, edges2, start2)); // 200
/**
 *         w: 100
 *       0 ---------- 3
 *       | \ w: 200   |
 *  w: 1 |      \     | w: 99
 *       |          \ |
 *       1 ---------- 2 
 *         w: 150
 *  
 */