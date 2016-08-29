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
