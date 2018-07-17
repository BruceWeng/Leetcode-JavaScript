/**
Given a 2D binary matrix filled with 0's and 1's, 
find the largest square containing only 1's and return its area.

Example:

Input: 

1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0

Output: 4
 */
/**
 * Algorithm: DP
 * 1. Declare a dp[m][n] to store the largest size in dp[i][j]
 * 2. Initiate topmost row: dp[0][j] = matrix[0][j]
 * 3. Initiate leftmost col: dp[i][0] = matrix[i][0]
 * 4. ex: [
 *          [0, 1],
 *          [1, ?]
 *        ]         dp[i][j] only be updated from the smallest value among 
 *                  dp[i-1][j-1], dp[i-1][j],and dp[i][j-1]
 *                  aka: dp[i][j] = min(leftup, up, left) + 1
 * 5. maxsize = max(maxsize, dp[i][j])
 * 6. return maxsize * maxsize
 * 
 * T: O(M*N)
 * S: O(M*N)
 * 
 * Can optimized space to O(max(M, N))
 * Reference: 64. Minimum Path Sum
 */
/**
 * @param {char[][]} matrix
 * @return {number}
 */
const minimalSquare = function(matrix) {
    if (matrix.length === 0) return 0;

    let m = matrix.length;
    let n = matrix[0].length;

    let maxsize = 0;
    let dp = [];
    for (let i = 0; i < m+1; i += 1) {
        dp.push(new Array(n+1).fill(0));
    }

    for (let i = 1; i < m+1; i += 1) {
        for (let j = 1; j < n+1; j += 1) {
            if (matrix[i-1][j-1] === "1") {
                dp[i][j] = Math.min(Math.min(dp[i][j-1], dp[i-1][j]), dp[i-1][j-1]) + 1;
                maxsize = Math.max(maxsize, dp[i][j]);                
            }

        }
    }

    return maxsize * maxsize;
}
