/**
Implement next permutation, which rearranges numbers into the lexicographically 
next greater permutation of numbers.

If such arrangement is not possible, it must rearrange it as the lowest possible 
order (ie, sorted in ascending order).

The replacement must be in-place and use only constant extra memory.

Here are some examples. Inputs are in the left-hand column and its corresponding 
outputs are in the right-hand column.

1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1
 */
/**
 * Algorithm: Observe the order, Swap, Reverse
 * 1. From the end of the array, find the the first element that is not in 
 *    descending order as A (index i-1)
 * 2. If i == 0: reverse(nums, 0, n-1)
 * 3. Else: 
 *    a. From the end of the array, find the first element that is greater that 
 *    A as B (index j)
 *    b. Else: Swap(A, B)
 *    c. Sort(nums, i, n-1)
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const nextPermutation = function(nums) {
  // 1. Find the first element that is not descending order
  let i = 0;
  let j = 0;
  for (i = nums.length - 1; i >= 1; i -= 1) {
    if (nums[i-1] < nums[i]) break;
  }

  // Current number is the last permutation, back to the first one
  if (i === 0) {
      reverse(nums, 0, nums.length - 1);
  } else {
    // 2. Find the first element that is greater that A (index i - 1)
    for (j = nums.length - 1; j >= 1; j -= 1) {
      if (nums[j] > nums[i-1]) break;
    }

    swap(nums, i - 1, j);
    reverse(nums, i, nums.length - 1);
  }
};

const swap = function(nums, i, j) {
  [nums[i], nums[j]] = [nums[j], nums[i]];
};

const reverse = function(nums, start, end) {
  while (start < end) swap(nums, start++, end--);
};