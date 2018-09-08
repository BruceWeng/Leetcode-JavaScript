/**
Given an integer array, you need to find one continuous subarray that if you only sort this 
subarray in ascending order, then the whole array will be sorted in ascending order, too.

You need to find the shortest such subarray and output its length.

Example 1:
Input: [2, 6, 4, 8, 10, 9, 15]
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.
Note:
Then length of the input array is in range [1, 10,000].
The input array may contain duplicates, so ascending order here means <=.
 */
/**
 * Algorithm:
 * 1. Find the subarray that need to be sorted range (start...end)
 * 2. Start from A[0] and update maxVal while traversing A
 * 3. Start from A[n-1] and update minVal while traversing A
 * 4. if A[i] < maxVal: end = i
 * 5. if A[n-1-i] > minVal: start = n-1-i
 * 6. return end - start + 1
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
const findUnsortedSubarray = function(nums) {
  let n = nums.length;
  let start = -1;
  let end = -2; // start move, cover the sorted input case
  let maxVal = nums[0];
  let minVal = nums[n-1];
  for (let i = 1; i < n; i += 1) {
    maxVal = Math.max(maxVal, nums[i]);
    minVal = Math.min(minVal, nums[n-1-i]);
    if (nums[i] < maxVal) end = i;
    if (nums[n-1-i] > minVal) start = n-1-i;
  }

  console.log(end);
  console.log(start);
  return end - start + 1;
};

console.log(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]));