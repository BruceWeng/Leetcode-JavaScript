/**
Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

Find all the elements of [1, n] inclusive that do not appear in this array.

Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.

Example:

Input:
[4,3,2,7,8,2,3,1]

Output:
[5,6]
 */
/**
 * Algorithm: No missing numbers, each element and index should be one-to-many relationship
 * 0. Filter the relationship with exsiting numbers
 * 1. Consider num as an index. Iterate nums and mark all positions of index(nums[i]) into negative
 * 2. Iterate in range(0, nums.length), if nums[i] > 0, result.push(i + 1)
 * 3. return result
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findDisappearedNumbers = function(nums) {
  let result = [];
    
  for (let i = 0; i < nums.length; i += 1) {
    let index = Math.abs(nums[i]) - 1;
    if (nums[index] > 0) nums[index] = -nums[index];
  }
    
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] > 0) result.push(i + 1);
  }

  return result;
};