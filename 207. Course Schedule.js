/**
 * Note:
 * 1. Graph:
 *   a. Edge List: space: O(E)
 *   b. Adjacency Matrices: space: O(V^2)
 *   c. Adjacency List: Combine a and b, List Index: node, List Element: edge
 * 2. BFS(Topological Sort):
 *   a. Extra Queue: space O(V), store indegree 0 nodes
 *   b. inDegree array: index: node(prerequisites[i][0]), element: indegree count
 * 3. Details:
 *   a. Remember declare array size and fill 0
 *   b. Need to use () after !
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

     //when node without indegree, push node into the queue, when queue is      empty, return queue.length === numCourses
     let queue = new Array();
     let inDegree = new Array(numCourses).fill(0);
     let length = prerequisites.length;

     for (let i = 0; i < length; i++) {
       inDegree[prerequisites[i][0]]++;
     }

     for (let i = 0; i < numCourses; i++) {
       if (inDegree[i] === 0) {
         queue.push(i);
       }
     }

     let noPreNum = 0;
     while(!(queue.length === 0)) {
       let target = queue.shift();
       noPreNum++;
       for (let i = 0; i < length; i++) {
         if (prerequisites[i][1] === target) {
           inDegree[prerequisites[i][0]]--;
           if (inDegree[prerequisites[i][0]] === 0) {
             queue.push(prerequisites[i][0]);
           }
         }
       }
     }
     return noPreNum === numCourses;
 };

 let test1 = [[0, 1], [1, 2], [2, 3]];
 console.log(canFinish(4, test1));

 let test2 = [[0, 1], [1, 0]];
 console.log(canFinish(2, test2));
