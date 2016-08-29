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
       result.push(target);
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
     if (noPreNum !== numCourses) {
        return [];
     } else {
        return result;
     }
};
