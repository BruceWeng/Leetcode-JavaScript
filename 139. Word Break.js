/**
Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.

Note:

The same word in the dictionary may be reused multiple times in the segmentation.
You may assume the dictionary does not contain duplicate words.
Example 1:

Input: s = "leetcode", wordDict = ["leet", "code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple", "pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
             Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false
 */
/**
 * Leetcode Fundamental: 1/10/2019 Update
 * Algorithm: Parenthesization DP
 * Top-Down Thinking:
 * dp(i, j) = valid dp(i, k) and valid dp(k, j)
 * Evaluation substring time: O(len(wordDict)) -> Use Set: O(1)
 * # Substring: O(n^2)
 * slice(i, j): O(n)
 * Total Time: O(n^2)*O(n)*O(len(wordDict))
 * 
 * Optimized with Set: T: O(n^3), S: O(n)
 * Runtime: 80 ms
 */
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  if (s === undefined || wordDict === undefined || s.length === 0 || wordDict.length === 0) return false;
  
  let wordDictSet = new Set(wordDict);
  let stages = new Array(s.length + 1).fill(false);
  stages[0] = true; // no segment
  
  // Iterate substring
  for (let end = 1; end < s.length + 1; end += 1) {
    for (let start = 0; start < end; start += 1) {
      if (stages[start] && wordDictSet.has(s.slice(start, end))) {
        stages[end] = true;
        break;
      }
    }
  }
  
  return stages[stages.length-1];
};