/**
Given a string s, partition s such that every substring of the partition is a palindrome.

Return the minimum cuts needed for a palindrome partitioning of s.

Example:

Input: "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.
 */
/**
 * Leetcode Fundamental: 2/1/2019 Update
 * Algorithm: Cut Rod DP (Sliding Window DP)
 * 1. let cuts[end] be min cut in s[0, end] (inclusive)
 * 2. let bool palindrome[end][start] be whether substring s[start, end] is a palindrome (inclusive)
 * 3. For each end, iterate start from 0 to end:
 *    3.1 initial cuts[end] = end (edge case: cut every chars)
 *    Check palindrome: (3 condition to be true)
 *      1. end - start === 0, s[end] === s[start] (no need palindrome cache)
 *      2. end - start === 1 && s[end] === s[start] (no need palindrome cache)
 *      3. end - start > 1 && s[end] === s[start] && palindrome[start+1][end-1] === true
 * 
 *      Combine: s[end] === s[start] && (end - start <= 1 || palindrome[start+1][end-1])

 *    If true:
 *      1. palindrome[start][end] = true
 *      2. Update cuts[end]: 
 *        a. if start === 0: cuts[end] = 0
 *        b. else cuts[end] = min(cuts[end], cuts[start-1] + 1)
 * 
 * 4. return cuts[n-1]
 * 
 * T: O(n^2), S: O(n^2)
 */
/**
 * @param {string} s
 * @return {number}
 */
const minCut = (s) => {
  if (s === undefined) return 0;

  let n = s.length;
  let isPal = [];
  let cuts = new Array(n).fill(0);

  for (let i = 0; i < n; i += 1) {
    isPal.push(new Array(n).fill(false));
    cuts[i] = i; // initial max possible cuts
  }

  for (let end = 0; end < n; end += 1) {
    for (let start = 0; start <= end; start += 1) {
      // Check true case
      if (s[end] === s[start] && (end - start <= 1 || isPal[start+1][end-1])) {
        isPal[start][end] = true;
        if (start === 0) cuts[end] = 0; // prevent cuts[0-1]
        else cuts[end] = Math.min(cuts[end], cuts[start-1] + 1);
      }
    }
  }

  return cuts[n-1];
};