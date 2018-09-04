/**
You are given a list of non-negative integers, a1, a2, ..., an, and a target, S. 
Now you have 2 symbols + and -. For each integer, you should choose one from + 
and - as its new symbol.

Find out how many ways to assign symbols to make sum of integers equal to target S.

Example 1:
Input: nums is [1, 1, 1, 1, 1], S is 3. 
Output: 5
Explanation: 

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

There are 5 ways to assign symbols to make the sum of nums be target 3.
Note:
The length of the given array is positive and will not exceed 20.
The sum of elements in the given array will not exceed 1000.
Your output answer is guaranteed to be fitted in a 32-bit integer.
 */
/**
 * Algorithm: DP, 0/1 Knapsack, Rolling Array
 * Reference: 416. Partition Equal Subset Sum
 * 1. Declare stages[2*sum + 1]. Initiate: stages[sum + 0] = 1 (1 way)
 * 2. Each state stage[j] at current stage will affect states nextStage[j + num] and nextStage[j - num]
 * 3. Transfer func: 
 *    nextStage[j + num] += stage[j]
 *    nextStage[j - num] += stage[j]
 * 4. Assign nextStage to currentStage
 * 5. return stage[sum + S]
 * 
 * T: (n*(2sum+1)), S: O(2*sum)
 */
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
const findTargetSumWays = function(nums, S) {
  // 1. Calculate sum
  let sum = 0;
  for (let num of nums) {
    sum += num;
  }
  // 2. Handle boundary case
  if (S > sum || S < -sum) return 0;

  // 3. Initiate stages array
  let stage = new Array(2*sum+1).fill(0);
  stage[sum+0] = 1;

  // 4. Iterate nums and update states in nextStage from stage
  for (let num of nums) {
    let nextStage = new Array(2*sum+1).fill(0);
    for (let j = 0; j < 2*sum+1; j += 1) {
      if (stage[j] !== 0) {
        nextStage[j - num] += stage[j];
        nextStage[j + num] += stage[j];
      }
    }
    // Replace current stage from nextStage
    stage = nextStage;
  }

  // 5. return final answer
  return stage[sum+S];
};