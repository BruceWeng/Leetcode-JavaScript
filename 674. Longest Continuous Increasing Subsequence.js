/**
Given an unsorted array of integers, find the length of longest continuous increasing subsequence (subarray).

Example 1:
Input: [1,3,5,4,7]
Output: 3
Explanation: The longest continuous increasing subsequence is [1,3,5], its length is 3. 
Even though [1,3,5,7] is also an increasing subsequence, it's not a continuous one where 5 and 7 are separated by 4. 
Example 2:
Input: [2,2,2,2,2]
Output: 1
Explanation: The longest continuous increasing subsequence is [2], its length is 1. 
Note: Length of the array will not exceed 10,000.
 */
/**
 * Use count to stores the length of current continuous increasing subsequence that ends at with nums[i]
 * Use result to store max count
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
const findLengthOfLCIS = nums => {
  if (nums === undefined || nums.length === 0) return 0;

  let count = 0;
  let result = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (i === 0 || nums[i] > nums[i - 1]) {
      count += 1;
      result = Math.max(result, count);
    } else count = 1;
  }
  return result;
};

console.log(findLengthOfLCIS([1, 3, 5, 4, 7])); // 3
console.log(findLengthOfLCIS([2, 2, 2, 2, 2])); // 1
