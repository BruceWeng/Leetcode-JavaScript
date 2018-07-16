/**
The demons had captured the princess (P) and imprisoned her in the bottom-right 
corner of a dungeon. The dungeon consists of M x N rooms laid out in a 2D grid. 
Our valiant knight (K) was initially positioned in the top-left room and must 
fight his way through the dungeon to rescue the princess.

The knight has an initial health point represented by a positive integer. If at 
any point his health point drops to 0 or below, he dies immediately.

Some of the rooms are guarded by demons, so the knight loses health (negative 
    integers) upon entering these rooms; other rooms are either empty (0's) or 
    contain magic orbs that increase the knight's health (positive integers).

In order to reach the princess as quickly as possible, the knight decides to 
move only rightward or downward in each step.

 

Write a function to determine the knight's minimum initial health so that he 
is able to rescue the princess.

For example, given the dungeon below, the initial health of the knight must 
be at least 7 if he follows the optimal path RIGHT-> RIGHT -> DOWN -> DOWN.

-2 (K)	-3	3
-5	-10	1
10	30	-5 (P)
 

Note:

The knight's health has no upper bound.
Any room can contain threats or power-ups, even the first room the knight 
enters and the bottom-right room where the princess is imprisoned.
 */
/**
 * Algorithm: DP
 * 1. Initiate dp matrix health[m][n] = 0
 * 2. Initiate the last col and last row from health[m-1][n-1]
 *    health[m-1][m-2] = max(1, 1-dungeon[m-1][n-1])
 *    row: health[m-1][n-2] -> health[m-1][0] (j: n-2 -> 0) health[m-1][j] = max(1, health[m-1][j+1]-dungeon[m-1][j])
 *    col: health[m-1][n-2] -> health[0][n-1] (i: m-2 -> 0) health[i][n-1] = max(1, health[i+1][n-1]-dungeon[i][n-1])
 * 3. down = max(1, health[i+1][j]-dungeon[i][j])
 *    right = max(1, health[i][j+1]-dungeon[i][j])
 *    health[i][j] = min(down, right)
 * 4. return health[0][0]
 * 
 * T: O(M*N)
 * S: O(M*N)
 * 
 * Reduce 2D array to 1D array:
 * class Solution {
    public int calculateMinimumHP(int[][] dungeon) {
        int m = dungeon.length, n = dungeon[0].length;
        int[] dp = new int[n + 1];
        dp[n]  = 1;
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int health = 0;
                if (i == m - 1) health = dp[j + 1] - dungeon[i][j];
                else if (j == n - 1) health = dp[j] - dungeon[i][j];
                else health = Math.min(dp[j + 1], dp[j]) - dungeon[i][j];
                dp[j] = health <= 0 ? 1 : health;
            }
        }
        return dp[0];                  
    }
}
 */
/**
 * @param {number[][]} dungeon
 * @return {number}
 */
const calculateMinimumHP = function(dungeon) {
    let m = dungeon.length;
    let n = dungeon[0].length;
    let health = [];
    for (let i = 0; i < m+1; i += 1) {
        health.push(new Array(n+1).fill(1));
    }

    health[m-1][n-1] = Math.max(1, 1-dungeon[m-1][n-1]);

    // Initiate last col
    for (let i = m-2; i >= 0; i -= 1) {
        health[i][n-1] = Math.max(1, health[i+1][n-1] - dungeon[i][n-1]);
    }

    // Initiate last row
    for (let j = n-2; j >= 0; j -= 1) {
        health[m-1][j] = Math.max(1, health[m-1][j+1] - dungeon[m-1][j]);
    }

    for (let i = m-2; i >= 0; i -= 1) {
        for (let j = n-2; j >= 0; j -= 1) {
            let down = Math.max(1, health[i+1][j] - dungeon[i][j]);
            let right = Math.max(1, health[i][j+1] - dungeon[i][j]);
            health[i][j] = Math.min(down, right);
        }
    }
    
    return health[0][0];
}
