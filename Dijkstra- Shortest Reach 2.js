/**
Given an undirected graph and a starting node, determine the lengths of the shortest 
paths from the starting node to all other nodes in the graph. If a node is unreachable, 
its distance is -1. Nodes will be numbered consecutively from 1 to n, and edges will 
have varying distances or lengths.

For example, consider the following graph of 5 nodes:
Begin	End	Weight
    1	  2	     5
    2	  3	     6
    3	  4	     2
    1	  3	    15

    5
        w:6     w:2
    2 ----- 3 ----- 4
    |     /
w:5 |   / w:15
    | /
    1 (start)

Starting at node 1, the shortest path to 2 is direct and distance 5. Going from 1 to 3, 
there are two paths: 1->2->3 at a distance of 5+6=11 or 1->3 at a distance of 15. 
Choose the shortest path, 11. From 1 to 4, choose the shortest path through 3 and extend it: 
1->2->3->4 for a distance of 11+2=13. There is no route to node 5, so the distance is -1.

The distances to all nodes in increasing node order, omitting the starting node, are 5 11 13 -1.

Dijkstra Algorithm:
1. Constraint: weight needs to be positive
2. Single source only: 
   Can count for shortest distance from single source to other nodes, but not any nodes.
3. Greedy Algorithm

Steps:
1. Initial all distance (from start to curr node) as Infinite
2. Add start node in Priority Queue
3. Pop node and Update next.dist: 
   next.dist = min(next.dist, weight)
4. Add all next node in Priority Queue
5. Pop min(node.dist) from Priority Queue and repeat 3, 4, 5 <- Greedy
6. Finish when all node visited

T: O(NlogN + E)
S: O(N + E)
 */
/**
 * @param {number} n
 * @param {number[[]]} edges
 * @param {number} s
 * @return {number[]}
 */
const Heap = require("./Heap");
function shortestReach(n, edges, s) {
  let result = new Array(n).fill(Inf); // minDist

  /** 
   * Construct Graph: index: node: value: [[next, weight]...]
   * [
   *   [[1, 24], [3, 20]], (only show one dirction, but there are two direction)
   *   [],
   *   [0, 3],
   *   [2, 12]
   * ]
   */
  let graph = [];
  for (let i = 0; i <= n; i += 1) graph.push([]); // Cover "1 based" graph

  for (const [node, next, weight] of edges) {
    graph[node].push([next, weight]);
    graph[next].push([node, weight]);
  }

  let Inf = Number.MAX_SAFE_INTEGER;
  let minHeap = Heap((a, b) => a[1] - b[1]); // Pop min node.dist ([next, dist])
  let visited = new Array(n).fill(false);

  minHeap.push([s, 0]); // Push only [node, dist]

  while (minHeap.size() !== 0) {
    let [node, dist] = minHeap.pop(); // Quarentee the smallest dist pop up first
    if (visited[node]) continue; // Only update smallest dist for each node
    visited[node] = true;
    result[node] = dist;
    
    for (let [next, weight] of graph[node]) {
      if (!visited[next] && dist + weight < result[next]) {
        minHeap.push([next, dist + weight]);
      }
    }
  }

  for (let i = 0; i < result.length; i += 1) {
    if (result[i] === Inf) result[i] = -1;
  }

  return result;
}

// Test
let n = 4;
let edges = [[0, 1, 24], [0, 3, 20], [2, 0, 3], [3, 2, 12]];
let s = 0;
console.log(shortestReach(n, edges, s)); // [0, 24, 3, 15];
/**
 *        1          2
 *        |  w: 3  / |
 *   w: 24|     /    | w: 12
 *        |  /       |
 * (start)0 -------- 3
 *           w: 20
 */