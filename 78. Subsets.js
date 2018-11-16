/**
Given a set of distinct integers, nums, return all possible subsets (the power set).

Note: The solution set must not contain duplicate subsets.

Example:

Input: nums = [1,2,3]
Output:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
 */
/**
 * Leetcode Fundamental: 11/16 Update
 * 
 * T: O(2^n), Each num can be added or not in the candid
 * Runtime: 60ms
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  if (nums === undefined) return [];
  if (nums.length === 0) return [[]];
  
  let result = [];
  let candid = [];
  backtrack(result, candid, 0, nums);
  return result;
};

const backtrack = (result, candid, start, nums) => {
  result.push([...candid]); // Forget to add the copy to result here
  
  for (let i = start; i < nums.length; i += 1) {
    candid.push(nums[i]);
    // Don't try to push the copy to result here!
    backtrack(result, candid, i + 1, nums);
    candid.pop();
  }
};
