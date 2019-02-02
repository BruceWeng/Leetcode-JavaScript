/**
Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*'.

'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).
The matching should cover the entire input string (not partial).

Note:

s could be empty and contains only lowercase letters a-z.
p could be empty and contains only lowercase letters a-z, and characters like ? or *.
Example 1:

Input:
s = "aa"
p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input:
s = "aa"
p = "*"
Output: true
Explanation: '*' matches any sequence.
Example 3:

Input:
s = "cb"
p = "?a"
Output: false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
Example 4:

Input:
s = "adceb"
p = "*a*b"
Output: true
Explanation: The first '*' matches the empty sequence, while the second '*' matches the substring "dce".
Example 5:

Input:
s = "acdcb"
p = "a*c?b"
Output: false
 */
/**
 * Leetcode Fundamental: 2/1/2019 Update
 * Algorithm: Two String Matching DP
 * 1. row: s indices + empty first char
 *    col: p indices + empty first char
 * 
 * 2. let bool states[i][j]: whether substring s[0, i] matches p[0, j] (inclusive)
 * 
 * 3. Initiate initial states for 1st row:
 *    To handle s = "adceb", p = "*a*b", states at all (and only) leading "*" should be true
 *    if p[j] === "*": states[0][j] = true
 *    else break
 * 
 * 4. 3 cases:
 *    4.1 p[j] === s[i]: states not change, copy from previous substring
 *        states[i][j] = states[i-1][j-1]
 *    4.2 p[j] === "?": matches any single character, states not change, copy from previous substring
 *        states[i][j] = states[i-1][j-1]
 *    4.3 p[j] === "*": matches zero or many characters, (2 sub conditions)
 *        4.3.1 "*" as empty char (aka ignore p[j]): state copy from state at s[i] and p[j-1]
 *              states[i][j] = states[i][j-1]
 *        4.3.2 "*" as one or multiple char: consider current s[i] is merged with s[i-1] (aka ignore current s[i])
 *              state copy from s[i-1] and p[j]
 *              states[i][j] = states[i-1][j] 
 *        either case is true in 2 sub conditions: states[i][j] = true
 * 
 * 5. i and j are index of s and p, use states[i+1][j+1] to represent current state, update all states indecies by i += 1 and j += 1
 * 
 * 6. return states[m][n]: m = s.length, n = p.length
 * 
 * T: O(m*n), S: O(m*n)
 * Runtime: 184 ms
 */
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = (s, p) => {
  // empty s and p allowed
  if (s === undefined || p === undefined) return false;

  let m = s.length;
  let n = p.length;
  let states = [];
  for (let i = 0; i < m + 1; i += 1) states.push(new Array(n + 1).fill(false));
  
  states[0][0] = true; // if s[0] matches p[0], copy states[0][0]
  
  // 3.
  for (let j = 0; j < n; j += 1) {
    if (p[j] === "*") states[0][j+1] = true;
    else break;
  }

  // 4.
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      // 4.1
      if (p[j] === s[i]) states[i+1][j+1] = states[i][j];
      // 4.2
      else if (p[j] === "?") states[i+1][j+1] = states[i][j];
      // 4.3
      else if (p[j] === "*") {
        // 4.3.1 "*" as empty char
        // 4.3.2 "*" as one or multiple char
        states[i+1][j+1] = states[i+1][j] || states[i][j+1];
      }
    }
  }

  return states[m][n];
};