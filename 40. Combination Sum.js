/**
 * Note:
 *  1. Skip multiple values(will get the same result): set prev = -1 before the loop
 *  2. check prev === candidates[i] before push value
 *  3. prev = condidates[i]
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  let result = new Array();
  let list = new Array();

  if (candidates === null || candidates.length === 0 || target === 0) {
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

    let prev = -1;
    for (let i = index; i < candidates.length; i ++) {
      if (candidates[i] > target ) {
        continue;
      }

      if (candidates[i] !== prev) {
        list.push(candidates[i]);
        prev = candidates[i];
        dfs(i + 1, target - candidates[i]);
        list.splice(list.length - 1, 1);
      }

    }
  }
};
