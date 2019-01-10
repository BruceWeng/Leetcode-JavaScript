/**
Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n.

Example 1:

Input: n = 12
Output: 3 
Explanation: 12 = 4 + 4 + 4.
Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.
 */
/**
 * Leetcode Fundamental: 12/13 Update
 * First Try:
 * Break down n to subset number by deduct by squares (1, 4, 9...sqrt(n))
 * BFS Approach:
 * ex: n = 12
 *                                        12
 *                   /                    |             \
 *               11 (12-1)             8 (12-4)        3 (12-9)
 *        /       |        \          /       \          |
 *    10 (11-1) 7 (11-4)  2 (11-9)  7 (8-1)  4 (8-4)   2 (3-1)
 *   /   |   \  /    \      |      /   \    /   \        |
 *                                            0 (4-4)  1 (2-1)
 *                                            (valid)    |
 *                                                     0 (1-1) 
 *                                                     (Valid)
 * 1. Only the leaves with value 0 are answers.
 * 2. Top-Down Approach is hard to calculate Time Complexity.
 * 3. Nodes with same value have the same amount of children. Recalculating -> DP.
 * 
 * Bottom Up DP Thinking:
 * 1. Each node is one state for the stage (single state).
 * 2. Each child is one prev state for the node.
 * 3. Transfer function: The relation between current node(stage) and children(prev stages).
 * 4. Tree Structure -> Single State DP
 * 
 * Induction:
 * let stage[n+1] be indicates perfect square counts
 * stages[0] = 0
 * stages[1] = stages[1-1*1] + 1 = 1
 * stages[2] = stages[2-1*1] + 1 = 2
 * stages[3] = stages[3-1*1] + 1 = 3
 * stages[4] = min(stages[4-1*1], stages[4-2*2]) + 1 = min(stages[3], stages[0]) + 1 = 1
 * stages[5] = min(stages[5-1*1], stages[5-2*2]) + 1 = min(stages[4], stages[1]) + 1 = 2
 * ...
 * stages[13] = min(stages[13-1*1], stages[13-2*2], stages[13-3*3]) + 1
 *            = min(stages[12], stages[9], stages[4]) + 1 = 2
 * 
 * stages[curr] = min(stages[curr-i*i]) + 1, i*i <= curr, i >= 1
 * 
 * T: O(nlogn), S: O(n)
 * Runtime: 224 ms
 */
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  if (n <= 0) return 0;
  let stages = new Array(n+1).fill(0);

  for (let curr = 1; curr < n+1; curr += 1) {
    let minCount = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i*i <= curr; i += 1) {
      minCount = Math.min(minCount, stages[curr-i*i]);
    }
    stages[curr] = minCount + 1;
  }
  
  return stages[n];
};

/**
 * Print all results
 */
var numSquaresResult = function(n) {
  if (n <= 0) return 0;
  // let tuple = {count: 0, result: []};
  let stages = [];
  for (let i = 0; i < n+1; i += 1) stages.push({count: 0, result: []});

  for (let curr = 1; curr < n+1; curr += 1) {
    let minCount = Number.MAX_SAFE_INTEGER;
    let candid = 0;
    for (let i = 1; i*i <= curr; i += 1) {
      if (stages[curr-i*i].count < minCount) {
        minCount = stages[curr-i*i].count;
        candid = i;
      }
    }
    stages[curr].count = minCount + 1;
    stages[curr].result = [...(stages[curr-candid*candid].result), candid*candid];
  }
  
  return stages[n].result;
};

let n1 = 12;
console.log(numSquaresResult(n1)); // Output: 3. Explanation: 12 = 4 + 4 + 4.


let n2 = 13;
console.log(numSquaresResult(n2)); // Output: 2. Explanation: 13 = 4 + 9.