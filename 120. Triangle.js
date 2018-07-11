/**
Given a triangle, find the minimum path sum from top to bottom. Each step you may move 
to adjacent numbers on the row below.

For example, given the following triangle

[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).

Note:

Bonus point if you are able to do this using only O(n) extra space, where n is the total 
number of rows in the triangle.
 */
/**
 * Algorithm: Bottom-Up DP
 * 0. Declare 2D array minPath[k][i](kth row, ith element in each row) to store
 *    Each minPath[k][i] stores current node value and min(children value)
 *    minPath[k][i] = min(minPath[k+1][i], minPath[k+1][i+1]) + triangle[k][i]
 * 1. Since minPath only use k and k+1 for state transfer. Reduce minPath[k][i] to 1D array minLen[i]
 *    minLen[i] = min(minLen[i], minLen[i+1]) + triangle[k][i]
 * 
 * T: O(n^2) (1 + n) * n / 2, n: row size
 * S: O(n)
 */
/**
 * @param {number[][]} triangle
 * @return {number}
 */
const minimumTotal = function(triangle) {
    let n = triangle.length;
    // Fill array with elements in last row of triangle
    minLen = [...triangle[n-1]]

    // Update each layer
    for (let row = n-2; row >= 0; row -= 1) {
        // Iterate each node
        for (let i = 0; i <= row; i += 1) {
            minLen[i] = Math.min(minLen[i], minLen[i+1]) + triangle[row][i];
        }
    }

    return minLen[0];
}