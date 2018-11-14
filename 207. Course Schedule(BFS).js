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
 * 
 * Runtime: 84ms
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

 /**
  * Leetcode Fundamental: 11/14 Update
  * 1. Declare indegree array: index: node, value: count of indegree
  * 2. Declare leaveQueue to store next node to visit(indegree = 0)
  * 3. Construct indegree array
  * 4. Construct leaveQueue (Option: build adjList as graph for better traversal)
  * 5. Declare count of leaves = 0
  * 6. Recursive find next leave while(leaveQueue.length !== 0)
  *    dequeue first element in leaveQueue
  *    leavesCount += 1
  *    if and parent in adjList is node, child indegree -= 1(since leaves are removed)
  *      find next leaf (indegree[child] === 0) -> push next leaf to queue
  * 7. if leavesCount === numCourses: no cycle, return true
  *    else has cycle, return false
  * 
  * T: O(n), S: indegree: O(n), leaveQueue: O(n), adjList(Option): O(Edge)
  * Runtime: 328 ms
  * Traverse prerequisites is faster, traverse adjList cost more time
  */
 var canFinish = function(numCourses, prerequisites) {
  // Handle edge cases
  if (numCourses === undefined || prerequisites === undefined) return false;

  if (numCourses === 0) return true;

  // No dependency
  if (prerequisites.length === 0 || prerequisites[0].length === 0) return true;

  // Construct AdjList
  let adjList = {};
  let indegree = new Array(numCourses).fill(0);
  for (let edge of prerequisites) {
    let parent = edge[1];
    let child = edge[0];
    if (parent in adjList) adjList[parent].push(child);
    else adjList[parent] = [child];
    
    // Construct indegree array
    // Can not get from adjList because parent only know number of children but child has no info of number of parents
    indegree[child] += 1;
  }
  
  // Construct leavesQueue
  let queue = [];
  for (let node = 0; node < indegree.length; node += 1)
    if (indegree[node] === 0) queue.push(node);
  
  // Declare leavesCount
  let count = 0;

  // Topological Sort
  while (queue.length !== 0) { // queue contains Number
    let currNode = queue.shift(); // currNode is Number
    count += 1;
    for (node in adjList) { // node is String
      if (String(currNode) === node) { // Apply explicit type conversion
        for (let child of adjList[node]) { // iterate children
          indegree[child] -= 1;
          if (indegree[child] === 0) queue.push(child);
        }
      }
    }
  }

  return count === numCourses;
};