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
 *   func UnionFIndSet(n):
 *     parents = [1...n]
 *     ranks = [0...0]
 * 
 *   func Find(x):
 *     if x != parents[x]
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