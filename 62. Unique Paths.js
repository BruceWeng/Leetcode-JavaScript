/**
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?


Above is a 7 x 3 grid. How many possible unique paths are there?

Note: m and n will be at most 100.

Example 1:

Input: m = 3, n = 2
Output: 3
Explanation:
From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Right -> Down
2. Right -> Down -> Right
3. Down -> Right -> Right
Example 2:

Input: m = 7, n = 3
Output: 28
 */
/**
 * Algorithm: DP
 * 1. stages[i][j] = stages[i][j-1] (left) + stages[i-1][j] (top)
 * 2. Boundary conditions: 
 *    a. leftmost col stages[i][0] = 1
 *    b. uppermost row stages[0][j] = 1
 * 3. for i in range(1, rows):
 *      for j in range(1, cols):
 *        stages[i][j] = stages[i][j-1] (left) + stages[i-1][j] (top)
 * 4. Return the last state in last stage stage[m-1][n-1]
 * 5. T: O(m*n), S: O(m*n)
 */
/**
 * Algorithm: DP, rolling stage array
 * 1. Note that state in current stage[i][j] only updated from previous state on same stage: 
 *    stage[i][j-1] and state from previous stage: stage[i-1][j]
 * 2. Instead of memoizing all the stage, memoizing only current stage and previous stage
 * 3. Initiate preStage[j] = 1, currStage[j] = 1
 * 4. for i in range(1, rows):
 *      for j in range(1, cols):
 *        currStage[j] = preStage[j] + currStage[j-1]
 * 5.   After each row finished: preStage = currStage
 * 6. return last state in last stage currStage[n-1]
 * 7. T: O(m*n), S: O(2*n)
 */
/**
 * Algorithm: DP, rolling state array
 * 1. Note the preStage[j] is the same as currStage[j], no need for preStage array
 * 2. currStage[j] = currStage[j] (prev stage) + currStage[j-1] (prev state)
 * 3. return currStage[n-1]
 * 4. T: O(m*n), S:(n)
 */
const uniquePaths = function(m, n) {
  let stages = new Array(n).fill(1);

  for (let i = 1; i < m; i += 1) {
    for (let j = 1; j < n; j += 1) {
      stages[j] = stages[j] + stages[j-1];
    }
  }

  return stages[n-1];
}
