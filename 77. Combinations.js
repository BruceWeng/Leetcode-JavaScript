/**
Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.

Example:

Input: n = 4, k = 2
Output:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
 */
/**
 * Leetcode Fundamental: 11/16 Update
 * 
 * T: O(n!/k!(n-k)!)
 * Runtime: 140 ms
 * 
 * Python Runtime: 632ms, so slooow!
 */
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  // Handle edge case
  if (n === undefined || k === undefined || n === 0 || k === 0) return [];
  
  let result = [];
  let candid = [];
  
  backtrack(result, candid, n, k, 1);
  
  return result;
};

const backtrack = (result, candid, n, k, start) => {
  if (candid.length === k) {
    result.push([...candid]);
    return
  }
  
  for (let i = start; i <= n; i += 1) {
    candid.push(i);
    backtrack(result, candid, n, k, i + 1);
    candid.pop();
  }
};

/**
 * Optimize with reduce start upper bound:
 * For each round, only k - candid.length space remaining to push new number in
 * The loop should stop earlier if there is no enough elements in n to fill k - candid.length space
 * Max upper bound num to use: n - (remaining space) + 1
 * = n - (k - candid.length) + 1
 * 
 * Ex:
 * If n = 10, k = 5, and you're in the outermost level of recursion, you choose 
 * only i = 1...6 , because if you pick i=7 and go into backTracking() you only 
 * have 8,9,10 to pick from, so at most you will get [7,8,9,10]... but we need 5 
 * elements!
 * 
 * Runtime: 104 ms. Beats 97.21%. JS is so slow lol.
 * 
 * Python Runtime: Runtime: 136 ms. JS is faster.
 */
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  // Handle edge case
  if (n === undefined || k === undefined || n === 0 || k === 0) return [];
  
  let result = [];
  let candid = [];
  
  backtrack(result, candid, n, k, 1);
  
  return result;
};

const backtrack = (result, candid, n, k, start) => {
  if (candid.length === k) {
    result.push([...candid]);
    return
  }
  
  for (let i = start; i <= n - (k - candid.length) + 1; i += 1) {
    candid.push(i);
    backtrack(result, candid, n, k, i + 1);
    candid.pop();
  }
};
