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
