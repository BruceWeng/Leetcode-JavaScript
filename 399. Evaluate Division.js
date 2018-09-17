/**
Equations are given in the format A / B = k, where A and B are variables 
represented as strings, and k is a real number (floating point number). 
Given some queries, return the answers. If the answer does not exist, 
return -1.0.

Example:
Given a / b = 2.0, b / c = 3.0. 
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ? . 
return [6.0, 0.5, -1.0, 1.0, -1.0 ].

The input is: vector<pair<string, string>> equations, vector<double>& 
values, vector<pair<string, string>> queries , where equations.size() 
== values.size(), and the values are positive. This represents the 
equations. Return vector<double>.

According to the example above:

equations = [ ["a", "b"], ["b", "c"] ],
values = [2.0, 3.0],
queries = [ ["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"] ]. 
The input is always valid. You may assume that evaluating the queries 
will result in no division by zero and there is no contradiction.
 */
/**
 * Algorithm:
 * 1. Directed graph:
 * a. Construct graph with weight on edges:
 *    Ex: a / b = 2.0 -> g[a][b] = 2.0, g[b][a] = 1 / 2.0
 *        b / c = 3.0 -> g[b][c] = 3.0, g[c][b] = 1 / 3.0
 * b. Find a / c by g[a][c] = g[a][b] * g[b][c] = 6.0
 * 
 * T: O(edge + query * edge), worst case: query derived from a long chain of edges
 * S: O(edge)
 * 
 * 2. Union find:
 * a. Construct a patent hash table stores 
 *      key: current value: string
 *      value: Node(parent value: string, ratio: number)
 * b. Iterate equations[i] and values[i] to build union graph with 
 *      ufs.union(equations[i][0], equations[i][1], values[i])
 * c. Declare result number array: result
 * d. Iterate queries: (ex: x / y)
 *      find node_x by ufs.find(queries[i][0])
 *      find node_y by ufs.find(queries[i][1])
 *      if node_x not in ufs or node_y not in ufs or node_x.parent !== node_y.parent:
 *        result[i] = -1.0
 *      else:
 *        result[i] = node_x.ratio * node_y.ratio
 * e. Return result
 *    
 * T: O(edge + query), by path compression,  amortized edge count is O(1)
 * S: O(edge)
 */
class Node {
  constructor(parent, ratio) {
    this.parent = parent;
    this.ratio = ratio;
  }
}

class UnionFindSet {
  constructor() {
    this.parents = new Map();
  }

  find(u) {
    if (!this.parents.has(u)) return null;

    let u_parent = this.parents.get(u);
    // set u's parent to root's parent
    if (u_parent.parent !== u) {
      let root = this.find(u_parent.parent);
        u_parent.parent = root.parent;
        u_parent.ratio *= root.ratio;
    }

    return u_parent;
  }

  union(u, v, ratio) {
    let hasU = this.parents.has(u);
    let hasV = this.parents.has(v);

    if (!hasU && !hasV) {
      this.parents.set(u, new Node(v, ratio));
      this.parents.set(v, new Node(v, 1));
    } else if (!hasV) {
      this.parents.set(v, new Node(u, 1 / ratio));
    } else if (!hasU) {
      this.parents.set(u, new Node(v, ratio));
    } else {
      let u_root = this.find(u);
      let v_root = this.find(v);
      u_root.parent = v_root.parent;
      u_root.ratio = ratio / u_root.ratio * v_root.ratio;
    }
  }
}

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
const calcEquation = function(equations, values, queries) {
  let ufs = new UnionFindSet();

  for (let i = 0; i < equations.length; i += 1)
    ufs.union(equations[i][0], equations[i][1], values[i]);

  let result = new Array(queries.length);

  for (let i = 0; i < queries.length; i += 1) {
    let node_x = ufs.find(queries[i][0]);
    let node_y = ufs.find(queries[i][1]);

    if (!node_x || !node_y || node_x.parent !== node_y.parent)
      result[i] = -1;
    else
      result[i] = node_x.ratio / node_y.ratio;
  }

  return result;
};

let equations = [ ["a", "b"], ["b", "c"] ];
let values = [2.0, 3.0];
let queries = [ ["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"] ];
console.log(calcEquation(equations, values, queries)); // [6.0, 0.5, -1.0, 1.0, -1.0 ]