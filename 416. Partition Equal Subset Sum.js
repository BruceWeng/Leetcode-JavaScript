/**
Given a non-empty array containing only positive integers, find if the array can 
be partitioned into two subsets such that the sum of elements in both subsets is equal.

Note:
Each of the array element will not exceed 100.
The array size will not exceed 200.
Example 1:

Input: [1, 5, 11, 5]

Output: true

Explanation: The array can be partitioned as [1, 5, 5] and [11].
Example 2:

Input: [1, 2, 3, 5]

Output: false

Explanation: The array cannot be partitioned into equal sum subsets.
 */
/**
 * Algorithm: DP, 0/1 Knapsack
 * 1. This problem is essentially let us to find whether there are several numbers 
 * in a set which are able to sum to a specific value (in this problem, the value is sum/2).
 * 
 * 2. Actually, this is a 0/1 knapsack problem, for each number, we can pick it or 
 * not. Let us assume bool stages[i][j] stage i: range(0, n+1), state j: range(0, sum+1) means whether 
 * the specific sum j can be gotten from the first i numbers. If we can pick such a series 
 * of numbers from 0-i whose sum is j, stages[i][j] is true, otherwise it is false.
 *
 * 3. Base case: stages.fill(false), stages[0][0] is true; (zero number consists of sum 0 is true)
 * 
 * 4. Transition function: 
 *    Not pick nums[i]: stages[i][j] = stages[i-1][j], current state only influenced by same state at previous stage
 *    Pick nums[i]: stages[i][j] = stages[i-1][j-nums[i]], current state influenced by j-nums[i] state at previous stage
 *    Combine: stages[i][j] = stages[i-1][j] || stages[i-1][j-nums[i]]
 * 5. Return stages[n][sum]
 * 
 * T: O(n*sum), S: O(n*sum)
 * 
 * Rolling Array: Since current stage only influenced by states in previous stage. 
 * We only need one row and update it from previous row.
 * 
 * T: O(n*sum), S(sum)
 */
/**
 * @param {Number[]} nums
 * @return {Boolean}
 */
const canPartition = function(nums) {
  let sum = 0;

  for (let num of nums) {
    sum += num;
  }

  if (sum % 2 === 1) return false;

  sum /= 2;

  let n = nums.length;
  let stages = new Array(sum+1).fill(false);
  stages[0] = true;

  for (let num of nums) {
    /**
     * Because stage[j] = dp[j] || dp[j-num] uses smaller index value dp[j-num].
     * If we iterate from j = 1, then dp[j-num] will be overwritten before we use it, which is wrong.
     * We can avoid this problem by iterating from j=sum
     */
    for (let j = sum; j > 0; j -= 1) {
      if (j >= num) stages[j] = stages[j] || stages[j-num];
    }
  }

  return stages[sum];
};