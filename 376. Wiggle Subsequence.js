/**
A sequence of numbers is called a wiggle sequence if the differences between successive numbers strictly alternate between positive and negative. The first difference (if one exists) may be either positive or negative. A sequence with fewer than two elements is trivially a wiggle sequence.

For example, [1,7,4,9,2,5] is a wiggle sequence because the differences (6,-3,5,-7,3) are alternately positive and negative. In contrast, [1,4,7,2,5] and [1,7,4,5,5] are not wiggle sequences, the first because its first two differences are positive and the second because its last difference is zero.

Given a sequence of integers, return the length of the longest subsequence that is a wiggle sequence. A subsequence is obtained by deleting some number of elements (eventually, also zero) from the original sequence, leaving the remaining elements in their original order.

Example 1:

Input: [1,7,4,9,2,5]
Output: 6
Explanation: The entire sequence is a wiggle sequence.
Example 2:

Input: [1,17,5,10,13,15,10,5,16,8]
Output: 7
Explanation: There are several subsequences that achieve this length. One is [1,17,10,13,10,16,8].
Example 3:

Input: [1,2,3,4,5,6,7,8,9]
Output: 2
Follow up:
Can you do it in O(n) time?
 */
/**
 * Leetcode Fundamental: 12/11 Update
 * Failure:
 * Fail to think of 
 * 1. Copy upStage[i] from upStage[i-1] in decrease case
 * 2. Copy downStage[i] from downStage[i] in increase case
 * 3. Copy upStage[i] from upStage[i-1] and Copy downStage[i] from downStage[i] in even case
 * 
 * Two Stage DP:
 * 
 * Stages[i] store longest length from 0 to i
 * ex: [1,17,5,10,13,15,10,5,16,8], n = 10
 * Initialization:
 * upStages: [1,0,0,0,0,0,0,0,0,0]
 * downStages: [1,0,0,0,0,0,0,0,0,0]
 * 
 * Transfer Function from i = 1 to i = n-1:
 * 
 * if (nums[i] === nums[prev]): 
 *   upStages[i] = upStages[i-1]
 *   downStages[i] = downStages[i-1]
 * else if (nums[i] > nums[i-1]):
 *   upStages[i] = downStages[i-1] + 1
 *   downStages[i] = downStages[i-1]
 * else if (nums[i] < nums[i-1]):
 *   downStages[i] = upStages[i-1] + 1
 *   upStages[i] = upStages[i-1]
 * 
 * return max(upStages[n-1], downStages[n-1])
 * 
 * T: O(n)
 * S: O(n)
 * Runtime: 52 ms
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function(nums) {
  if (nums === undefined) return 0;
  let n = nums.length;
  if (n <= 1) return n;

  // Initialization
  let upStages = new Array(n).fill(0);
  let downStages = new Array(n).fill(0);
  upStages[0] = 1;
  downStages[0] = 1;

  for (let i = 1; i < n; i += 1) {
    if (nums[i] === nums[i-1]) {
      upStages[i] = upStages[i-1];
      downStages[i] = downStages[i-1];
    }
    else if (nums[i] > nums[i-1]) {
      upStages[i] = downStages[i-1] + 1;
      downStages[i] = downStages[i-1];
    }
    else if (nums[i] < nums[i-1]) {
      downStages[i] = upStages[i-1] + 1;
      upStages[i] = upStages[i-1];
    }
  }

  return Math.max(upStages[n-1], downStages[n-1]);
};

/**
 * Rolling Array Improvement
 * 
 * T: O(n)
 * S: O(1)
 * Runtime: 48 ms
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function(nums) {
  if (nums === undefined) return 0;
  let n = nums.length;
  if (n <= 1) return n;

  // Initialization
  let upStages = new Array(2).fill(0);
  let downStages = new Array(2).fill(0);
  upStages[0] = 1;
  downStages[0] = 1;

  for (let i = 1; i < n; i += 1) {
    if (nums[i] === nums[i-1]) {
      upStages[i % 2] = upStages[(i-1) % 2];
      downStages[i % 2] = downStages[(i-1) % 2];
    }
    else if (nums[i] > nums[i-1]) {
      upStages[i % 2] = downStages[(i-1) % 2] + 1;
      downStages[i % 2] = downStages[(i-1) % 2];
    }
    else if (nums[i] < nums[i-1]) {
      downStages[i % 2] = upStages[(i-1) % 2] + 1;
      upStages[i % 2] = upStages[(i-1) % 2];
    }
  }

  return Math.max(upStages[(n-1) % 2], downStages[(n-1) % 2]);
};