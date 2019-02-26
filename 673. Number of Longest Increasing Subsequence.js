/**
Given an unsorted array of integers, find the number of longest increasing subsequence.

Example 1:
Input: [1,3,5,4,7]
Output: 2
Explanation: The two longest increasing subsequence are [1, 3, 4, 7] and [1, 3, 5, 7].

Example 2:
Input: [2,2,2,2,2]
Output: 5
Explanation: The length of longest continuous increasing subsequence is 1, and there are 5 subsequences' length is 1, so output 5.
Note: Length of the given array will be not exceed 2000 and the answer is guaranteed to be fit in 32-bit signed int.
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function(nums) {
  // 1. find the longest length of increasing sequence
  // 1.1 use DP to count the longest length from nums[0] to nums[curr]
  // 1.2 Declare longestLens = [nums.length]
  // 1.3 Declare counts = [nums.length] stores count of longest length ends at index i
  // 1.3.1 update counts[i] = counts[j] when
  //   a. longestLens[i] === longestLens[j]:
  //        longestLens[i] = longestLens[j] + 1
  //        counts[i] = counts[j]
  //   b. longestLens[i] === longestLens[j] + 1:
  //        counts[i] += counts[j]
  // 2. find the number of longest length increasing sequence
  // 2.1 let max = max(...longestLen)
  // 2.2 get sum of count of counts that longestLens[i] === max

  if (nums === undefined || nums.length === 0) return 0;
  let longestLens = new Array(nums.length).fill(1);
  let counts = new Array(nums.length).fill(1);

  for (let i = 0; i < nums.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (nums[i] > nums[j]) {
        // key here below
        if (longestLens[i] === longestLens[j]) {
          counts[i] = counts[j];
        } else if (longestLens[i] === longestLens[j] + 1) {
          counts[i] += counts[j];
        }
        // key here above
        longestLens[i] = Math.max(longestLens[i], longestLens[j] + 1);
      }
    }
  }

  let maxVal = Math.max(...longestLens);
  let result = 0;
  for (let i = 0; i < counts.length; i += 1) {
    if (longestLens[i] === maxVal) result += counts[i];
  }
  return result;
};

console.log(findNumberOfLIS([1, 3, 5, 4, 7])); // 2
console.log(findNumberOfLIS([2, 2, 2, 2, 2])); // 5
