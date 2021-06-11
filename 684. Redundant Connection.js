/**
In this problem, a tree is an undirected graph that is connected and has no cycles.

The given input is a graph that started as a tree with N nodes (with distinct values 1, 2, ..., N), 
with one additional edge added. The added edge has two different vertices chosen from 1 to N, and 
was not an edge that already existed.

The resulting graph is given as a 2D-array of edges. Each element of edges is a pair [u, v] with 
u < v, that represents an undirected edge connecting nodes u and v.

Return an edge that can be removed so that the resulting graph is a tree of N nodes. If there are 
multiple answers, return the answer that occurs last in the given 2D-array. The answer edge [u, v] 
should be in the same format, with u < v.
 */
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
 var findRedundantConnection = function(edges) {
	let edgesObj = createGraph(edges)
	let states = createStates(edges)

	for(let i=edges.length-1; i>=0; i--) {
    let notTree = false
	  let [srcKey, destKey] = edges[i]
	  removeEdge(edgesObj, srcKey, destKey)
	  // detect valid tree structure
	  for(let start=1; start<=edges.length; start++) {
	    if(hasCycle(start, edgesObj, {...states})) {
        notTree = true
        addEdge(edgesObj, srcKey, destKey)
        break
	    }
	  }
    if(notTree) continue
    return [srcKey, destKey]
	}
};
      
function hasCycle(start, edgesObj, states, parentKey=start) {
  states[start] = 'VISITED'
  for(let destKey of edgesObj[start]) {
    if(states[destKey]==='VISITED' && destKey!==parentKey) return true
    if(states[destKey]==='UNVISITED' && hasCycle(destKey, edgesObj, states, start)) return true
  }
	return false
}
 
function createStates(edges) {
	const states = {}
	for(let i=1; i<=edges.length; i++) {
		states[i] = 'UNVISITED'
	}
	return states
}

function createGraph(edges) {
	const edgesObj = {}
	for(let edge of edges) {
	  let srcKey = edge[0]
	  let destKey = edge[1]
	  if(!(srcKey in edgesObj)) edgesObj[srcKey] = new Set()
	  edgesObj[srcKey].add(destKey)
    if(!(destKey in edgesObj)) edgesObj[destKey] = new Set()
    edgesObj[destKey].add(srcKey)
	}
	return edgesObj
}
      
function removeEdge(edgesObj, srcKey, destKey) {
	edgesObj[srcKey].delete(destKey)
  edgesObj[destKey].delete(srcKey)
}
      
function addEdge(edgesObj, srcKey, destKey) {
	edgesObj[srcKey].add(destKey)
  edgesObj[destKey].add(srcKey)
}

/**
 * Algorithm: Union Find
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
 * @param {number[][]} edges
 * @return {number[]}
 */
const findRedundantConnection = function(edges) {
  let ufs = new UnionFindSet(edges.length);
  for (let edge of edges)
    if (ufs.union(edge[0], edge[1]))
      return edge;
  return [];
};

let input1 = [ [1,2], [1,3], [2,3] ];
console.log(findRedundantConnection(input1)); // [2, 3]

let input2 = [[1,2], [2,3], [3,4], [1,4], [1,5]];
console.log(findRedundantConnection(input2)); // [1, 4]