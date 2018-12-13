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

/**
 * Leetcode Fundamental: 12/12 Update
 * 0/1 Knapsack leads:
 * 1. Partition to two subset
 * 2. Sum
 * 
 * Stages: 
 * row: n+1 (include empty case), 
 * col: possible sum, boundary: sum(nums) / 2
 * content(bool): if it is possible to partition into two equal sum subsets at this i
 * 
 * Failure: 
 * Fail to initialize stages
 * 
 * Initialization: 
 * 1. stages[0][0] = true (zero number consists of sum 0 is true)
 * 2. All the 0 col is ture
 * 3. All the 0 row is false: zero number cannot consists sum other than 0
 * Not: 1 and 2 for stages[i-1][j-num] to use
 * 
 * Trasfer function: (row: 1 to n, col: 1 to sum/2+1)
 * 1. Not Pick num (nums[i-1]) at this round, stages[i][j] = stages[i-1][j]
 * 2. Pick num (nums[i-1]) at this round, stages[i][j] = stages[i-1][j-num]
 * Either case 1 is true or case 2 i true: stages[i][j] = true,
 * -> stages[i][j] = stages[i-1][j] || stages[i-1][j-num]
 * 
 * return stages[n][sum/2+1]
 * 
 * T: O(n*sum)
 * S: O(n*sum)
 * Runtime: 172 ms
 */
/**
 * @param {Number[]} nums
 * @return {Boolean}
 */
const canPartition = function(nums) {
  if (nums === undefined || nums.length === 0) return false;
  let sum = 0;
  for (let num of nums) sum += num;

  if (sum % 2 === 1) return false;

  let n = nums.length;
  let stages = []; // (n+1) * (sum/2+1), content: false
  for (let i = 0; i < n+1; i += 1) stages.push(new Array(sum/2+1).fill(false));
  
  // Initialization
  for (let i = 0; i < n+1; i += 1) stages[i][0] = true;

  // Trasfer function: (row: 1 to n, col: 1 to sum/2+1)
  for (let i = 1; i < n+1; i += 1) {
    for (let j = 1; j < sum/2+1; j += 1) {
      let num = nums[i-1];
      // Update only col sum >= num
      if (j >= num) stages[i][j] = stages[i-1][j] || stages[i-1][j-num];
    }
  }

  return stages[n][sum/2];
};

/**
 * Variable Reuse Improvement
 * Only prev 1 stage is used: n rows -> 2 rows(rolling array) -> 1 row
 * 
 * Very important step for reduce dimention for 0/1 Kanpsack Problem:
 * Update current stage from right -> left!
 * 
 * T: O(n*sum)
 * S: O(sum)
 * Runtime: 96 ms
 */
const canPartition = function(nums) {
  if (nums === undefined || nums.length === 0) return false;
  let sum = 0;
  for (let num of nums) sum += num;

  if (sum % 2 === 1) return false;

  let stages = new Array(sum/2+1).fill(false);
  
  // Initialization
  stages[0] = true;

  // Trasfer function: (row: 1 to n, col: 1 to sum/2+1)
  for (let num of nums) {
    /**
     * Have to update current stage from right to left. 
     * The following states in current stage also need to be updated by left states in prev stage.
     * If we update from left to right, new state in current stage will not be preserved.
     */
    for (let j = sum/2; j > 0; j -= 1) { 
      // Update only col sum >= num
      if (j >= num) {
        // current stage = update from prev stage
        stages[j] = stages[j] || stages[j-num];
      }
    }
  }

  return stages[sum/2];
};