/**
 * Note:
 * 1. DFS
 * 2. Unique value: can Sort
 * 3. dfs preserve:
 *  a. index: not look back the the first element every time, loop start with index
 *  b. target: target = target - candidates[i]
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  let result = new Array();
  let list = new Array();

  if (candidates === null || candidates.length === 0 || target === null) {
    return result;
  }

  candidates.sort();
  dfs(0, target);
  return result;

  function dfs(index, target) {
    if (target === 0) {
      result.push([...list]);
      return;
    }

    for (let i = index; i < candidates.length; i++) {
      if (candidates[i] > target) {
        continue;
      }

      list.push(candidates[i]);
      dfs(i, target - candidates[i]);
      list.splice(list.length - 1, 1);
    }
  }
};

/**
 * Leecode Fundamental: 11/16 Update
 * 
 * T: O(2^n), n: candidates.length. Each num can be added or not
 * Runtime: 72 ms
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  if (candidates === undefined || candidates.length === 0 || target === undefined || target <= 0) return [];
  
  let result = [];
  let candid = [];
  
  backtrack(result, candid, candidates, target, 0);
  
  return result;
};

const backtrack = (result, candid, candidates, target, start) => {
  if (target < 0) return;
  if (target === 0) {
    result.push([...candid]);
    return;
  }
  
  for (let i = start; i < candidates.length; i += 1) {
    // pruning
    if (candidates[i] > target) continue;
    
    candid.push(candidates[i]);
    backtrack(result, candid, candidates, target - candidates[i], i);
    candid.pop();
  }
}
