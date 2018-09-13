/**
Given n nodes labeled from 0 to n-1 and a list of undirected edges 
(each edge is a pair of nodes), write a function to check whether these 
edges make up a valid tree.

Example 1:

Input: n = 5, and edges = [[0,1], [0,2], [0,3], [1,4]]
Output: true
Example 2:

Input: n = 5, and edges = [[0,1], [1,2], [2,3], [1,3], [1,4]]
Output: false
Note: you can assume that no duplicate edges will appear in edges. 
Since all edges are undirected, [0,1] is the same as [1,0] and thus 
will not appear together in edges.
 */
class UnionFindSet {
  constructor(n) {
    this._parents = new Array(n);
    this._ranks = new Array(n);
    for (let i = 0; i < this._parents.length; i += 1) {
      this._parents[i] = i;
      this._ranks[i] = i;
    }
  }

  /**
   * Find u and set u's parent to root of the set
   * 
   * @param {number} u 
   */
  find(u) {
    while (this._parents[u] !== u) {
      this._parents[u] = this._parents[this._parents[u]];
      u = this._parents[u];
    }

    return u;
  }

  /**
   * If u and v are connected, return true, else return false 
   * 
   * @param {number} u 
   * @param {number} v 
   * @return {boolean}
   */
  union(u, v) {
    let parent_u = this.find(u);
    let parent_v = this.find(v);

    if (parent_u === parent_v) return true;

    if (this._ranks[parent_v] > this._ranks[parent_u])
      this._parents[parent_u] = parent_v;
    else if (this._ranks[parent_u] > this._ranks[parent_v])
      this._parents[parent_v] = parent_u;
    else {
      this._parents[parent_v] = parent_u;
      this._ranks[parent_u] += 1;
    }

    return false;
  }
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
const validTree = function(n, edges) {
  let ufs = new UnionFindSet(n);
  for (let edge of edges) {
    if (ufs.union(edge[0], edge[1])) // find cycle
      return false;
  }

  return edges.length === n-1; 
  // Even cycle not found, needs at least n-1 edges to connect all the nodes
  // n = 6, [0, 2], [4, 5] -> false
};

let n1 = 5;
let edge1 = [[0,1], [0,2], [0,3], [1,4]];
console.log(validTree(n1, edge1)); // true

let n2 = 5;
let edge2 = [[0,1], [1,2], [2,3], [1,3], [1,4]];
console.log(validTree(n2, edge2)); // false

