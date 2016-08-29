/**
 * Note:
 * 1. Multiple numbers:
 *  a. Sort array
 *  b. Make visited array
 *  c. Check elements are placed in order: (i != 0 && nums[i] === nums[i-1] && visited[i-1] === 0)
 */
'use strict';
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  let result = new Array();
  let list = new Array();
  let visited = new Array(nums).fill(0);

  if (nums === null || nums.length === 0) {
    return result;
  }
  nums.sort();
  dfs();

  return result;

  function dfs() {
    if (list.length === nums.length) {
      result.push([...list]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (visited[i] === 1 || (i != 0 && nums[i] === nums[i-1] && visited[i-1] === 0)) {
        continue;
      }
      list.push(nums[i]);
      visited[i] = 1;
      dfs();
      list.splice(list.length - 1, 1);
      visited[i] = 0;
    }
  }

};
