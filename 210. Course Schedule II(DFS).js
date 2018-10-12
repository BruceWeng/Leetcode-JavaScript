/**
 * Note:
 * 1. Node to use HashMap(child, parent) to build the graph
 * 2. put parent in the result
 */
'use strict';
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
 var findOrder = function(numCourses, prerequisites) {
     let result = new Array();
     if (numCourses === 0) {
       return [0];
     }

     if (prerequisites.length === 0 || prerequisites[0].length === 0) {
       for (let i = 0; i < numCourses; i++) {
           result.unshift(i);
       }

       return result;
     }

     if (prerequisites === null) {
       throw new Error('illegal argument exception!');
     }

     let length = prerequisites.length;
     let graph = new Map();
     let visited = new Array(numCourses).fill(0);
     //Build graph
     for (let edges of prerequisites) {
       if (graph.has(edges[0])) {
         graph.get(edges[0]).push(edges[1]);
       } else {
         let parent = new Array();
         parent.push(edges[1]);
         graph.set(edges[0], parent);
       }
     }

     for (let i = 0; i < numCourses; i++) {
       if (dfs(i)) {
         // console.log('hello');
         return [];
       }
     }
     return result;

     /*
     * @param {number} iteration index
     * @return {boolean} has loop or not
     */
     function dfs(node) {
       if (visited[node] === -1) return false;
       if (visited[node] === 1) return true;

       visited[node] = 1;
       if (graph.has(node)) {
         for (let parent of graph.get(node)) {
           if (dfs(parent)) {
             return true;
           }
         }
       }

       visited[node] = -1;
       result.push(node);
       return false;
    }
 };
