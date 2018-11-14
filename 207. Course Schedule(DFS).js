/**
 * Note:
 * 1. Adjacency List: HashMap(parent node(number), children nodes(array)), key, value can reverse
 * 2. Visited Array: index: node, value: 1-> has loop, -1-> not has loop
 * 3. DFS:
 *  a. input(Adjacency HashMap, Visited Array, iteration index i) NOT NECESSARY
        pass data structure because DFS out of canFind block scope
 *  b. if visited[i] === -1, return false, if visited[i] === 1, return true
 *  c. set visited[i] === 1, check if any all children visited[node] === 1, set visited[i] === 1
 *  d. return false
 * 4. if DFS is true, return false, else return true
 * 5. Remember to return true outside of the numCourses loop
 */

 'use strict';
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
 var canFinish = function(numCourses, prerequisites) {
     if (numCourses === 0) {
       return true;
     }

     if (prerequisites.length === 0 || prerequisites[0].length === 0) {
       return true;
     }

     if (prerequisites === null) {
       throw new Error('illegal argument exception!');
     }

     let length = prerequisites.length;
     let graph = new Map();
     let visited = new Array(numCourses).fill(0);
     //Build graph
     for (let edges of prerequisites) {
       if (graph.has(edges[1])) {
         graph.get(edges[1]).push(edges[0]);
       } else {
         let children = new Array();
         children.push(edges[0]);
         graph.set(edges[1], children);
       }
     }

     for (let i = 0; i < numCourses; i++) {
       if (dfs(i)) {
         return false;
       }
     }
     return true;

     /*
     * @param {number} iteration index
     * @return {boolean} has loop or not
     */
     function dfs(node) {
       if (visited[node] === -1) return false;
       if (visited[node] === 1) return true;

       visited[node] = 1;
       if (graph.has(node)) {
         for (let child of graph.get(node)) { // iterate children
           if (dfs(child)) {
             return true;
           }
         }
       }

       visited[node] = -1;
       return false;
    }
 };

 let test1 = [[0, 1], [1, 2], [2, 3]];
 console.log(canFinish(4, test1));

 let test2 = [[0, 1], [1, 0]];
 console.log(canFinish(2, test2));

 /**
  * Leetcode Fundamental: 11/14 Update
  * 0. Directed Graph
  * 1. Adjacency List: HashMap(parent node(number), children nodes(array))
  * 2. Node States Array: index: node, value: 0-> unvisited(default), 1-> has cycle, -1-> not has cycle
  * 3. Construct AdjList from prerequisites
  * 4. Declare hasCycle helper func(node, adjList, state)
  * 5. Iterate all nodes, if any of it has cycle, return false, else return true
  * 
  * T: O(n), S: AdjList: O(Edge), State: O(n), O(Edge + n)
  * 72 ms
  */
 /**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  // Handle edge cases
  if (numCourses === undefined || prerequisites === undefined) return false;
  
  if (numCourses === 0) return true;

  // No dependency
  if (prerequisites.length === 0 || prerequisites[0].length === 0) return true;

  // Construct AdjList(build graph)
  let adjList = {};
  for (let edge of prerequisites) {
    let parent = edge[1];
    let child = edge[0];
    if (parent in adjList) adjList[parent].push(child);
    else adjList[parent] = [child];
  }

  // Initiate node states
  let state = new Array(numCourses).fill(0);

  // Iterate each node and check cycle
  for (let i = 0; i < numCourses; i += 1) {
    if (hasCycle(i, adjList, state)) return false;
  }

  return true;
};

const hasCycle = (node, adjList, state) => {
  // Check node cycle state
  if (state[node] === -1) return false;
  if (state[node] === 1) return true;

  // Update node cycle state
  // Label to has cycle first(state[node] = 1), if recursively find any children have cycle -> return true
  // else: reset state to has no cycle(state[node] = -1)
  // return false;
  state[node] = 1;
  if (node in adjList) {
    for (let child of adjList[node]) {
      if (hasCycle(child, adjList, state)) return true;
    }
  }

  state[node] = -1;
  return false;
};