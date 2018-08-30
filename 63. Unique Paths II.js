/**
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

Now consider if some obstacles are added to the grids. How many unique paths would there be?



An obstacle and empty space is marked as 1 and 0 respectively in the grid.

Note: m and n will be at most 100.

Example 1:

Input:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
Output: 2
Explanation:
There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
 */
/**
 * Algorithm: DP, rolling stage and state array
 * Reference: 62. Unique Paths
 * 1. for obstacleRow of obstacleGrid:
 *      if obstacleRow[j] == 1:
 *        stages[j] = 0
 *     else if (j > 0):
 *        stages[j] = stages[j] (upper cell) + stages[j-1] (left cell)
 * 2. return stages[n-1]
 */
const uniquePathsWithObstacles = function(obstacleGrid) {
  let n = obstacleGrid[0].length;
  // stages need to be initiated with 0 instead of 1 because once obstacleRow[j] === 1, 
  // all the following stages[j] should be 0 
  let stages = new Array(n).fill(0);
  stages[0] = 1;
  
  for (let obstacleRow of obstacleGrid) {
    for (let j = 0; j < n; j += 1) {
      if (obstacleRow[j] === 1) {
        stages[j] = 0;
      } else if (j > 0) {
        stages[j] = stages[j] + stages[j-1];
      }
    }
  }

  return stages[n-1];
}