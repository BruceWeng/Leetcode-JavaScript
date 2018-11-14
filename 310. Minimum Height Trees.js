/**
For a undirected graph with tree characteristics, we can choose any node as the root. The result graph is then a rooted tree. Among all possible rooted trees, those with minimum height are called minimum height trees (MHTs). Given such a graph, write a function to find all the MHTs and return a list of their root labels.

Format
The graph contains n nodes which are labeled from 0 to n - 1. You will be given the number n and a list of undirected edges (each edge is a pair of labels).

You can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.

Example 1 :

Input: n = 4, edges = [[1, 0], [1, 2], [1, 3]]

        0
        |
        1
       / \
      2   3 

Output: [1]
Example 2 :

Input: n = 6, edges = [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]]

     0  1  2
      \ | /
        3
        |
        4
        |
        5 

Output: [3, 4]
Note:

According to the definition of tree on Wikipedia: “a tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.”
The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.
 */
/**
 * # Solution 1:
 * # 1. The root locates in the longest path from leaves
 * # 2. BFS from leaves, remove any node that indegree is 1, the remaining 1 or 2 nodes are roots
 * # 3. Use set() in adjList for constant time remove
 * 
 * # Solution 2:
 * # DP: current height = min(neighbor heights) + 1
 */
/**
 * Leetcode Fundamental: 11/14 Update
 * 
 * Algorithm:
 * 1. Think of simple edge case - path graph
 * 1.a Use two pointers from start and end and move to neighbor at the same speed
 * 1.b Define degree of node: # of edges incident to the node
 * 1.c Leaves has degree of 1
 * ex: 0 - 1 - 2 - 3 - 4
 *     ^               ^
 *     s               e
 * 
 *     0 - 1 - 2 - 3 - 4
 *         ^       ^
 *         s       e
 * 
 *     0 - 1 - 2 - 3 - 4
 *             ^
 *             s
 *             e
 * ans = [2]
 * 
 * ex: 0 - 1 - 2 - 3
 *     ^           ^
 *     s           e
 * 
 *     0 - 1 - 2 - 3
 *         ^   ^
 *         s   e
 * ans = [1, 2]
 * 
 * 2. Apply the algorithm on general graph
 *    start from node with degree of 1
 * 
 * 3. while (n > 2): Do Topological Sort until there are 1 or 2 nodes left 
 * 
 * Implementation:
 * 1. BFS Topological Sort:
 *    a. Remove the leaves
 *    b. Update the degree of inner nodes
 *    c  Remove new leaves
 *    ...and so on
 * 2. Use [Set(), ...] as edge (adjList) for constant time remove
 *    a. edge index: node
 *    b. set element: edges
 * 3. Declare a leaves array stores node whose degree is 1
 * 4. Declare newLeaves array stores new leaves in while loop
 * 5. Remove leaves, Update degree of inner nodes
 * 6. Add new leaves in newLeaves
 * 7. leaves = newLeaves
 * 
 * 8. return leave
 * T: O(n) 92ms
 */
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function(n, edges) {
  // Edge case
  if (n === 1) return [0];
  
  // Construct adjList(index: node, value: set of adjNodes)
  let adjList = [];
  for (let i = 0; i < n; i += 1) adjList.push(new Set());

  for (let edge of edges) {
    let node = edge[0];
    let adjNode = edge[1];
    adjList[node].add(adjNode);
    adjList[adjNode].add(node);
  }

  // Add node of degree 1 in adjList in leaves
  let leaves = [];
  for (let i = 0; i < n; i += 1) 
    if (adjList[i].size === 1)
      leaves.push(i);

  // Topological Sort
  while (n > 2) {
    n -= leaves.length;
    newLeaves = [];
    for (let leaf of leaves) {
      for (let adjNode of adjList[leaf]) { // Iterate Set here
        // Reverse remove here: 1. Visit adjNode, 2. Remove leaf
        adjList[adjNode].delete(leaf);
        // Find next leaves
        if (adjList[adjNode].size === 1)
          newLeaves.push(adjNode);
      }
    }

    leaves = newLeaves;
  }

  return leaves;
};