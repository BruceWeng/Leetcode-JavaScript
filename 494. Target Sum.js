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
 * currStage -> nextStage: Push Solution
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

/**
 * Leetcode Fundamental: 12/17 Update
 * DP Solution:
 * 1. Draw Tree
 * 2. Transfer Func
 * 3. Reduce States
 * 4. Initialize Leaves
 * 5. Build Stage
 * 
 * Ex: nums: [1, 1, 1, 1, 1], S: 3, output: 5
 * states(cols): -5 - 5
 * stages(rows): 0 - 5
 * 1. Tree: 
 *    node: count of pairs with this sum
 *    pairs: (nums[0:i] used (include), target sum)
 *    children: left: ith chose '-' sign, right: ith chose '+' sign
 * 
 *                             (0, 0) <- leave, not root                                                                   ([])
 *                           /       \ 
 *                       (1, -1)   (1, 1)                                                           ([-1]) ([1])
 *                       /    \    /    \
 *                   (2, -2)  (2, 0)   (2, 2)                                         ([-1, -1]) ([-1, 1], [1, -1]) ([1, 1])
 *                   /    \   /   \    /    \
 *               (3, -3) (3, -1)  (3, 1)  (3, 3)   ([-1, -1, -1]) ([-1, -1, 1], [-1, 1, -1], [1, -1, -1]) ([-1, 1, 1]  [1, -1, 1], [1, 1, -1])  ([1, 1, 1])
 * 
 * 2. Transfer Func: stage(i, j) = stage(i-1, j-nums[i-1]) + stage(i-1, j+nums[i-1]) <- Should not use this as Pull Model
 *    Push Model: stages(i+1, j-nums[i]) += stages(i, j)
 *                stages(i+1, j+nums[i]) += stages(i, j)
 * 
 * 3. Reduce States: Only i-1 stage used: S: O(n*2sum) -> O(2sum)
 * 
 * 4. Initilize leaves: stage(0, 0) = 1 (1 leave)
 * 
 * 5. Build Stage:
 *     -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 |
 * 0 |  0 |  0 |  0 |  0 |  0 | 1 | 0 | 0 | 0 | 0 | 0 | 
 * 1 |    |    |    |    |  1 |   | 1 |   |   |   |   |
 * 2 |    |    |    |  1 |    | 2 |   | 1 |   |   |   |
 * 3 |    |    |  1 |    |  3 |   | 3 |   | 1 |   |   |
 * 4 |    |  1 |    |  4 |    | 6 |   | 4 |   | 1 |   |
 * 5 |  1 |    |  5 |    | 10 |   | 10|   | 5 |   | 1 |     
 *                                          ^
 *                                          |
 *                                        answer                   
 * Single leaf, multiple roots
 * T: O(n*sum), S: O(n*sum) -> O(sum)
 * Runtime: 80 ms
 */
const findTargetSumWays = function(nums, S) {
  if (nums === undefined || S === undefined || nums.length === 0) return 0
  let sum = 0;
  for (num of nums) sum += num;
  if (S > sum || S < -sum) return 0;
  let n = nums.length;

  let stages = [];
  for (let i = 0; i <= n; i += 1) {
    stages.push(new Array(2*sum+1).fill(0));
  }
  stages[0][sum] = 1;

  for (let i = 0; i < n; i += 1) {
    for (let j = nums[i]; j <= 2*sum-nums[i]; j += 1) {
      if (stages[i][j] !== 0) { 
        stages[i+1][j-nums[i]] += stages[i][j];
        stages[i+1][j+nums[i]] += stages[i][j];
      }
    }
  }

  return stages[n][sum+S];
};

// Test
let nums = [1, 1, 1, 1, 1];
let S = 3;
console.log(findTargetSumWays(nums, S)); // 5