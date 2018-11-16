/**
 * Note:
 * 1. Use list array to record valid permutations
 * 2. Use spred operator to copy list immutablly
 * 3. dfs pattern:
 *  a. Define add list condition and return
 *  b. Iterate input, if duplicate then continue. Push element, dfs and splice
 */
'use strict';
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  let result = new Array();
  let list = new Array();

  if (nums === null || nums.length === 0) {
    return result;
  }

  dfs();

  return result;

  function dfs() {
    if (list.length === nums.length) {
      result.push([...list]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (list.includes(nums[i])) {
        continue;
      }
      list.push(nums[i]);
      dfs();
      list.splice(list.length - 1, 1);
    }
  }
};

/**
 * Leetcode Fundamental: 11/16 Update
 * Failure:
 * 1. Forget to make a copy before push candid into result
 * 2. Fail to candid.pop() in the if loop
 * 
 * T: O(n!)
 * Runtime: 72 ms
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  if (nums === undefined || nums.length === 0) return [];
  
  let result = [];
  let candid = [];
  
  backtrack(result, candid, nums);
  
  return result;
};

const backtrack = (result, candid, nums) => {
  if (candid.length === nums.length) {
    result.push([...candid]); // <- forget to make a copy
    return;
  }
  
  for (let num of nums) {
    if (!candid.includes(num)) {
      candid.push(num);
      backtrack(result, candid, nums);
      candid.pop(); // <- forget to put it in the if loop
    }
  }
  
  return result;
};
