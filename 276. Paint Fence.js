/**
There is a fence with n posts, each post can be painted with one of the k colors.

You have to paint all the posts such that no more than two adjacent fence posts have the same color.

Return the total number of ways you can paint the fence.

Note:
n and k are non-negative integers.

Example:

Input: n = 3, k = 2
Output: 6
Explanation: Take c1 as color 1, c2 as color 2. All possible ways are:

            post1  post2  post3      
 -----      -----  -----  -----       
   1         c1     c1     c2 
   2         c1     c2     c1 
   3         c1     c2     c2 
   4         c2     c1     c1  
   5         c2     c1     c2
   6         c2     c2     c1
 */
/**
 * Algorithm: DP
 * 1. Case 1: first 2 posts have same color: sameCase = k
 * 2. Case 2: first 2 posts have different colors: diffCase = k * (k-1)
 * 3. To every sameCase and diffCase, we can add a new post with different
 *    color as the last one. We have k-1 color options for the last one.
 * 4. To every diffCase, we can add a new post with the same color as the last one
 *    to not generate violation - no more than 2 adjacent fence posts have the same color.
 * 5. return sameCase + diffCase
 * 
 * T: O(n)
 * S: (1)
 */
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const numWays = function(n , k) {
    if (n <= 0 || k <= 0) return 0;

    if (n === 1) return k;

    let sameCase = k;

    let diffCase = k * (k-1);

    for (let i = 3; i < n+1; i += 1) {
        let temp = diffCase;

        diffCase = (sameCase+diffCase) * (k-1);

        sameCase = temp;
    }

    return sameCase + diffCase;
}