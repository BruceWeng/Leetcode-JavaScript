/**
 * Adjacency List:
{
a: { b, c, d }, <- Set (O(1) delete)
b: { c, f },
d: { e },
e: { a, f },
f: { a, c, d, e }
^    ^
v    e
}
 */
class Graph {
  adjList = new Map();

  addVertex(v) {
    this.adjList.set(v, new Set());
  }

  addEdge(v, e) {
    this.adjList.get(v).add(e);
    // undirected graph
    this.adjList.get(e).add(v);
  }
}

/**
 * Adjacency List:
{
a: { b: 1, c: 2, d: 3 },
b: { c: 4, f: 1 },
d: { e: 2 },
e: { a: 5, f: 1 },
f: { a: 2, c: 1, d: 4, e: 2 }
^    ^  ^
v    e  w
}
 */
class WeightGraph {
  adjList = new Map();

  addVertex(v) {
    this.adjList.set(v, new Map);
  }

  addEdge(v, e, w) {
    this.adjList.get(v).set(e, w);
    // Undirected Weight Graph
    this.adjList.get(e).set(v, w);
  }
}