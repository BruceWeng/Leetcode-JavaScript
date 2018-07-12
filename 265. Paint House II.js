/**
There are a row of n houses, each house can be painted with one of the k colors. 
The cost of painting each house with a certain color is different. You have to paint 
all the houses such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented by a n x k cost 
matrix. For example, costs[0][0] is the cost of painting house 0 with color 0; 
costs[1][2] is the cost of painting house 1 with color 2, and so on... 
Find the minimum cost to paint all houses.

Note:
All costs are positive integers.

Example:

Input: [[1,5,3],[2,9,4]]
Output: 5
Explanation: Paint house 0 into color 0, paint house 1 into color 2. Minimum cost: 1 + 4 = 5; 
             Or paint house 0 into color 2, paint house 1 into color 0. Minimum cost: 3 + 2 = 5. 
Follow up:
Could you solve it in O(nk) runtime?
 */
/**
 * Algorithm: DP
 * 0. Declare dp[i][j] represents the min paint cost from house 0 to house i when house i use color j; 
 *    The formula will be dp[i][j] = Math.min(any k!= j| dp[i-1][k]) + costs[i][j].
 * 1. Take a closer look at the formula, we don't need an array to represent dp[i][j], 
 *    we only need to know 
 *    1. the min cost to the previous house of any color
 *    2. if the color j is used on previous house to get prev min cost, 
 *       use the second min cost that are not using color j on the previous house. 
 *    So I have three variable to record: prevMin, prevMinColor, prevSecondMin. 
 * 2. The above formula will be translated into: 
 *    dp[currentHouse][currentColor] = 
 *    (currentColor == prevMinColor? prevSecondMin: prevMin) + costs[currentHouse][currentColor].
 * 
 * T: O(nk)
 * S: O(1)
 */
/**
 * @param {number[][]} costs
 * @return {number}
 */
const minCostII = function(costs) {
    if (costs === null || costs.length === 0 || costs[0].length === 0) return 0;

    let n = costs.length;
    let k = costs[0].length;

    // Only one color to select, not valid if there are more than one house
    if (k === 1) {
        if (n === 1) {
            return costs[0][0];
        } else {
            return -1;
        }
    }

    let prevMin = 0;
    let prevMinColor = -1;
    let prevSecondMin = 0; // prevSecondMin always >= prevMin;

    for (let i = 0; i < n; i += 1) {
        let min = Number.MAX_SAFE_INTEGER;
        let minColor = -1;
        let secondMin = Number.MAX_SAFE_INTEGER;

        for (let j = 0; j < k; j += 1) {
            let val = costs[i][j] + (j === prevMinColor ? prevSecondMin : prevMin);

            // When min is not initiated
            if (minColor < 0) {
                min = val;
                minColor = j;
            } else if (val < min) {
                secondMin = min;
                min = val;
                minColor = j;
            } else if (val < secondMin) {
                secondMin = val;
            }
        }

        prevMin = min;
        prevMinColor = minColor;
        prevSecondMin = secondMin;
    }

    return prevMin;
}