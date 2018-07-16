/**
Given s1, s2, s3, find whether s3 is formed by the interleaving of s1 and s2.

Example 1:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Example 2:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
 */
/**
 * Algorithm: DP
 * 1. Initiate bool dp[m+1][n+1], m = s1.length, n = s2.length, one more length for empty string case
 * 2. Initiate first row by dp[0][j] = dp[0][j-1] && (s2[j-1] === s3[i+j-1])
 * 3. Initiate first col by dp[i][0] = dp[i-1][0] && (s1[i-1] === s3[i+j-1])
 * 4. dp[i][j] = (dp[i-1][j] && s1[i-1] === s3[i+j-1]) || (dp[i][j-1] && s2[j-1] === s3[i+j-1])
 * 5. return dp[m][n]
 * 
 * T: O(m*n) m = s.length, n = s2.length
 * S: O(m*n)
 */
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {bool}
 */
const isInterleave = function(s1, s2, s3) {
    let m = s1.length;
    let n = s2.length;
    if (s3.length !== m+n) return false;

    let dp = [];
    for (let i = 0; i < m+1; i += 1) {
        dp.push(new Array(n+1).fill(false));
    }

    dp[0][0] = true;
    for (let j = 1; j < n+1; j += 1) {
        dp[0][j] = dp[0][j-1] && (s2[j-1] === s3[j-1]);
    }
    for (let i = 1; i < m+1; i += 1) {
        dp[i][0] = dp[i-1][0] && (s1[i-1] === s3[i-1]);
    }

    for (let j = 1; j < n+1; j+= 1) {
        for (let i = 1; i < m+1; i += 1) {
            dp[i][j] = (dp[i-1][j] && s1[i-1] === s3[i+j-1]) || (dp[i][j-1] && s2[j-1] === s3[i+j-1]);
        }
    }

    return dp[m][n];
}
