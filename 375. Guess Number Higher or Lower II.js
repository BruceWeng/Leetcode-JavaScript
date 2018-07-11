/**
We are playing the Guess Game. The game is as follows:

I pick a number from 1 to n. You have to guess which number I picked.

Every time you guess wrong, I'll tell you whether the number I picked is higher or lower.

However, when you guess a particular number x, and you guess wrong, you pay $x. You win the 
game when you guess the number I picked.

Example:

n = 10, I pick 8.

First round:  You guess 5, I tell you that it's higher. You pay $5.
Second round: You guess 7, I tell you that it's higher. You pay $7.
Third round:  You guess 9, I tell you that it's lower. You pay $9.

Game over. 8 is the number I picked.

You end up paying $5 + $7 + $9 = $21.
Given a particular n ≥ 1, find out how much money you need to have to guarantee a win.

Note: Should pay minimum amount.
*/
/**
 * Algorithm: Recursion + DP
 * 1. Declare a table[n+1][n+1] = 0 stores minimum cost to guest from range(i...j)
 * 2. When you choose an x where i <= x <= j, you may find the target number from left i...x-1, 
 *    or you may find the target number from the x+1...j, because you don't know which way should 
 *    go, so to guarantee you have enough money to find the target, you need to prepare the more, 
 *    which is max(dp[i][x-1], dp[x+1][j]).
 * 3. Termination condition:
 *      if start >= end: return 0
 *      if table[start][end] != 0: return table[start][end] (avoid update)
 * 4. Initiate table[start][end] = max number(Number.MAX_SAFE_INTEGER)
 * 5. Recursive condition:
 *      Iterate from start to end:
 *          left = RecursiveCall(start, i-1)
 *          right = RecursiveCall(i+1, end)
 *          table[start][end] = min(table[start][end], i + max(left, right))
 * 6. return table[start][end]
 * 
 * T: O(n^3) (Easier to derive from iterative solution)
 * S: O(n^2)
 * 
 * Note: This is so called min-max algorithm
 */

/**
 * Return minimum cost to guess the right number
 * @param {number} n 
 * @return {number}
 */
const getMoneyAmount = function(n) {
    let table = [];
    for (let i = 1; i <= n+1; i += 1) {
        table.push(new Array(n+1).fill(0));
    }
    
    return helper(table, 1, n);
}

/**
 * Recursive helper function, return minimum cost to guest right number in range(start, end)
 * @param {number[][]} table pass table in so that block in helper can access table
 * @param {number} start 
 * @param {number} end 
 * @return {number}
 */
const helper = function(table, start, end) {
    if (start >= end) return 0;
    if (table[start][end] !== 0) return table[start][end];

    table[start][end] = Number.MAX_SAFE_INTEGER; // 2^53 - 1
    
    for (let k = start; k <= end; k += 1) {
        let left = helper(table, start, k-1);
        let right = helper(table, k+1, end);
        table[start][end] = Math.min(table[start][end], k + Math.max(left, right));
    }

    return table[start][end];
}
