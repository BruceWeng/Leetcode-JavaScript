'use strict';
function UndirectedGraphNode(label) {
  this.label = label;
  this.neighbors = [];   // Array of UndirectedGraphNode
}

/**
 * @param {UndirectedGraphNode} graph
 * @return {UndirectedGraphNode}
 */
var cloneGraph = function(graph) {
    if (!graph) {
        return null;
    }

    let cloneMap = new Map();
    let dfs = function(node) {
        if (!cloneMap.has(node.label)) {
            cloneMap.set(node.label, new UndirectedGraphNode(node.label));
        }

        node.neighbors.forEach(function(neighborNode) {
            if(!cloneMap.has(neighborNode.label)) {
                dfs(neighborNode);
            }

            cloneMap.get(node.label).neighbors.push(neighborNode.label);
        })

    }

    dfs(graph);
    return cloneMap.get(graph.label);
};

let node0 = new UndirectedGraphNode(0);
let node1 = new UndirectedGraphNode(1);
let node2 = new UndirectedGraphNode(2);

node0.neighbors.push(node1, node2);
node1.neighbors.push(node0, node2);
node2.neighbors.push(node0, node1, node2, node2);
console.log(node0, node1, node2);

console.log(cloneGraph(node0));
