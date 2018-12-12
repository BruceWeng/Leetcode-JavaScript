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
/**
 * Leetcode Fundamental: 12/11 Update
 * 
 * Case 1: If position[i] is the same color as position[i-1], 1 color for k positions to choose: k ways
 * Case 2: If position[i] is diff color from position[i-1], k-1 colors for k position to choose: k * (k-1) ways
 * 
 * Two stages:
 * sameColorStages: new Array(n+1).fill(0)
 * diffColorStages: new Array(n+1).fill(0)
 * 
 * index 0 and 1 are not used
 * 
 * Stages store "Number of ways to Paint at i" <- Very Important
 * Initialization:
 * 
 * n = 1: return = k, stage doesn't matter
 * n = 2:
 *   same[2] = k*1, diff[2] = k*(k-1)
 * n = 3:
 *   Same case can come from only prev diff case, diff[2]: same[3] = diff[2] * 1
 *   Diff case can come from both same prev case and diff case: diff[3] = (same[2] + diff[2]) * (k-1)
 * 
 * State Trasfer: from 3 to n
 * same[i] = diff[i-1] * 1
 * diff[i] = (same[i-1] + diff[i-1]) * (k-1)
 * 
 * return same[n] + diff[n]
 * 
 * T: O(n)
 * S: O(n)
 * Runtime: 52 ms
 */
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numWays = function(n, k) {
  if (n === 0 || k === 0) return 0;
  
  if (n === 1) return k;

  let sameStages = new Array(n+1).fill(0);
  let diffStages = new Array(n+1).fill(0);

  // Initialization
  sameStages[2] = k;
  diffStages[2] = k * (k-1);

  // Transfer Function from 3 to n
  for (let i = 3; i <= n; i += 1) {
      sameStages[i] = diffStages[i-1];
      diffStages[i] = (sameStages[i-1] + diffStages[i-1]) * (k-1);
  }

  return sameStages[n] + diffStages[n];
};

/**
 * Improvement: Only use prev 1 state -> Reduce two arrays to 4/two variables (Rolling Array)
 * 
 * T: O(n)
 * S: O(1)
 * Runtime: 52 ms
 */
var numWays = function(n, k) {
  if (n === 0 || k === 0) return 0;

  if (n === 1) return k;

  let sameStages = new Array(2).fill(0);
  let diffStages = new Array(2).fill(0);

  // Initialization
  sameStages[0] = k;
  diffStages[0] = k * (k-1);

  // Transfer Function from 3 to n
  for (let i = 3; i <= n; i += 1) {
      sameStages[(i-2) % 2] = diffStages[(i-1) % 2];
      diffStages[i % 2] = (sameStages[(i-1) % 2] + diffStages[(i-1) % 2]) * (k-1);
  }

  return sameStages[n % 2] + diffStages[n % 2];
};
