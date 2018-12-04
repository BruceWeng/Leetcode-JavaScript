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
 */
/**
 * @param {number} n
 * @param {number[[]]} edges
 * @param {number} s
 * @return {number[]}
 */
function shortestReach(n, edges, s) {

}

// Test
let n = 4;
let edges = [[1, 2, 24], [1, 4, 20], [3, 1, 3], [4, 3, 12]];
let s = 1;
console.log(shortestReach(n, edges, s)); // [0, 24, 3, 15];