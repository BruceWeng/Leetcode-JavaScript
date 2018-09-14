/**
 * Disjoint-set/Union-find Forest
 * 
 * Find(x): find the root/cluster-id of x
 * Union(x, y): merget two clusters
 * 
 * Check whether two elements are in the same set or not in O(1)
 * 
 * Find: O(a(n)) = O(1)
 * Union: O(a(n)) = O(1)
 * Space: O(n)
 * 
 * Without optimization: Find: O(n)
 * Two key optimizations:
 * 1. Path compression: make tree flat
 * 2. Union by rank: merge low rank tree to high rank one
 * 
 * Path compression: Find(node)
 *   set node parent to the root of the cluster
 * Union by rank: Union(node1, node2)
 *   Rank: tree depth
 *   merge low rank tree into high rank one (set parent of root of low rank to high rank root)
 */
/**
 * Pseudo code:
 * class UnionFindSet:
 *   func UnionFindSet(n):
 *     parents = [1...n]
 *     ranks = [0...0]
 * 
 *   func Find(x):
 *     if x != parents[x]:
 *       parents[x] = Find(parents[x])
 *     return parents[x]
 * 
 *   func Union(x, y):
 *     rootX = Find(x)
 *     rootY = Find(y)
 *     if ranks[rootX] > ranks[rootY]: parents[rootY] = rootX
 *     if ranks[rootX] < ranks[rootY]: parents[rootX] = rootY
 *     if ranks[rootX] == ranks[rootY]:
 *       parents[rootY] = rootX
 *       ranks[rootX] += 1
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

    // if (this._parents[u] === u) return u;
    // this._parents[u] = find(u); // path compression
    // return this._parents[id];
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