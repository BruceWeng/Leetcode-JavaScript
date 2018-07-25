/**
Given a 2D matrix matrix, find the sum of the elements inside the rectangle defined by its upper 
left corner (row1, col1) and lower right corner (row2, col2).

Range Sum Query 2D
The above rectangle (with the red border) is defined by (row1, col1) = (2, 1) and (row2, col2) = 
(4, 3), which contains sum = 8. (0 based index)

Example:
Given matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]

sumRegion(2, 1, 4, 3) -> 8
sumRegion(1, 1, 2, 2) -> 11
sumRegion(1, 2, 2, 4) -> 12
Note:
You may assume that the matrix does not change.
There are many calls to sumRegion function.
You may assume that row1 ≤ row2 and col1 ≤ col2.
 */
/**
 * Algorithm: DP, 221 Maximum Square
 * 0. Brute force takes O(mn)
 * Having a function to compute sume(0:x, 0:y) in O(1)
 * We can compute sum(x1:x2, y1:y2) in O(1)
 * 1. sum(x1:x2, y1:y2) = sum(0:x2, 0:y2) - sum(0:x1-1, 0:y2) - sum(0:x2, 0:y1-1) + sum(0:x1-1, 0:y1-1)
 * 2. We can compute sum(0:x, 0:y) in O(m*n) using DP
 * 3. dp[y][x] := sum(0:x, 0:y)
 *    dp[y][x] = dp[y][x-1] + dp[y-1][x] - dp[y-1][x-1] + matrix[y][x]
 * https://www.youtube.com/watch?v=MSNSqU3BnXk
 * 4. sumRegion(): O(1)
 *      iMin = min(row1, row2) iMax = max(row1, row2)
 *      jMin = min(col1, col2) jMax = max(col1, col2)
 *      return dp[iMax+1][jMax+1] - dp[iMax+1][jMin] - dp[iMin][jMax+1] + dp[iMin][jMin]
 */
/**
 * @param {number[][]} matrix
 */
class NumMatrix {
    constructor(matrix) {
        if (matrix === null || matrix.length === 0 || matrix[0].length === 0) return;

        let m = matrix.length;
        let n = matrix[0].length;

        this.dp = new Array();
        for (let i = 0; i < m+1; i += 1) {
            this.dp.push(new Array(n+1).fill(0));
        }
        for (let i = 1; i < m+1; i += 1) {
            for (let j = 1; j < n+1; j += 1) {
                this.dp[i][j] = this.dp[i-1][j] + this.dp[i][j-1] - this.dp[i-1][j-1] + matrix[i-1][j-1];
            }
        }
    }

    /** 
     * @param {number} row1 
     * @param {number} col1 
     * @param {number} row2 
     * @param {number} col2
     * @return {number}
     */
    sumRegion(row1, col1, row2, col2) {
        let iMin = Math.min(row1, row2);
        let iMax = Math.max(row1, row2);
        let jMin = Math.min(col1, col2);
        let jMax = Math.max(col1, col2);
        return this.dp[iMax+1][jMax+1] - this.dp[iMax+1][jMin] - this.dp[iMin][jMax+1] + this.dp[iMin][jMin];
    }
}