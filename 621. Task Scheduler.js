/**
Given a char array representing tasks CPU need to do. It contains capital letters 
A to Z where different letters represent different tasks.Tasks could be done 
without original order. Each task could be done in one interval. For each interval, 
CPU could finish one task or just be idle.

However, there is a non-negative cooling interval n that means between two same tasks, 
there must be at least n intervals that CPU are doing different tasks or just be idle.

You need to return the least number of intervals the CPU will take to finish all the 
given tasks.

Example 1:
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: A -> B -> idle -> A -> B -> idle -> A -> B.
Note:
The number of tasks is in the range [1, 10000].
The integer n is in the range [0, 100].
 */
/**
 * Algorithm: 
 * KEY WORD: return the least number
 * Greedy (choose optimal state of each stage) or DP
 * 1. To get minimal intervals -> minimize idle numbers -> evenly distributed tasks
 * 2. To guarentee there each same task is seperated between n intervals:
 *    a. Need 26 space to store count of each character
 *    b. Sort count by in ascendent order
 *    c. Let highest frequent count = k, totally need 
 *       (k - 1) group * (n + 1) slot size + other tasks number (not frequency) that frequency less than k (25 - i)
 *       i: number of tasks that frequency == k
 * 3. Special case: answer ((k-1)*(n+1)+other low frequency tasks) < tasks, choose max(answer, task)
 * 
 * T: O(nlogn), S: O(26)
 */
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
const leastInterval = function(tasks, n) {
  let count = new Array(26).fill(0);
  for (let task of tasks) {
    count[task.charCodeAt(0) - 65] += 1;
  }

  count.sort((a, b) => a - b); // Must fill comparator otherwise the answer will be wrong!

  let i = 25;
  while (i >= 0 && count[i] === count[count.length-1]) i -= 1;

  return Math.max(tasks.length, (count[count.length-1] - 1) * (n + 1) + 25 - i);
};