/**
Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*'.

'.' Matches any single character.
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

Note:

s could be empty and contains only lowercase letters a-z.
p could be empty and contains only lowercase letters a-z, and characters like . or *.
Example 1:

Input:
s = "aa"
p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input:
s = "aa"
p = "a*"
Output: true
Explanation: '*' means zero or more of the precedeng element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
Example 3:

Input:
s = "ab"
p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
Example 4:

Input:
s = "aab"
p = "c*a*b"
Output: true
Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore it matches "aab".
Example 5:

Input:
s = "mississippi"
p = "mis*is*p*."
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
 *      To handle s = "aab", p = "c*a*b", if p[j] === "*", ignore p[j-1] and copy state from states[0][j-2]
 *      Only handle True case (because default value is false):
 *      if p[j] === "*" and states[0][j-2] === true: states[0][j] = true
 * 
 * 4. 3 cases:
 *    4.1 p[j] === s[i]: states not change, copy from previous substring
 *        states[i][j] = states[i-1][j-1]
 *    4.2 p[j] === ".": matches any single character, states not change, copy from previous substring
 *        states[i][j] = states[i-1][j-1]
 *    4.3 p[j] === "*": matches zero or more preceding elements, (2 sub conditions)
 *        4.3.1 p[j-1] !== s[i] && p[j-1] !== ".": ignore current "*" and previous char p[j-1], states copy from match result from s[i] and p[j-2]
 *              states[i][j] = states[i][j-2]
 *        4.3.2 p[j-1] === s[i] or p[j-1] === ".": (3 sub conditions)
 *            let preceding p[j-1] as "a" for example:
 *            4.3.2.a "a*" as single char "a": state copy from s[i] and p[j-1]
 *                    states[i][j] = states[i][j-1]
 *            4.3.2.b "a*" as multiple char "a": consider current s[i] is merged with s[i-1] (aka ignore current s[i])
 *                    state copy from s[i-1] and p[j]
 *                    states[i][j] = states[i-1][j]
 *            4.3.2.c "a*" as empty current char: ignore current "*" and preceding char, state copy from s[i] and p[j-2]
 *                    states[i][j] = states[i][j-2]
 *            either case is true in 3 sub conditions: states[i][j] = true
 * 
 * 5. i and j are index of s and p, use states[i+1][j+1] to represent current state, update all states indecies by i += 1 and j += 1
 * 
 * 6. return states[m][n]: m = s.length, n = p.length
 * 
 * T: O(m*n), S: O(m*n)
 * Runtime: 96 ms
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
  // Initiate initial states
  let states = [];
  for (let i = 0; i < m + 1; i += 1) {
    states.push(new Array(n + 1).fill(false));
  }

  states[0][0] = true; // if s[0] matches p[0], copy states[0][0]
  
  // 3. 
  for (let j = 0; j < p.length; j += 1) {
    if (p[j] === "*" && states[0][j-1] === true) states[0][j+1] = true;
  }

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      // 4.1
      if (p[j] === s[i]) states[i+1][j+1] = states[i][j];
      // 4.2
      else if (p[j] === ".") states[i+1][j+1] = states[i][j];
      // 4.3
      else if (p[j] === "*") {
        // 4.3.1
        if (p[j-1] !== s[i] && p[j-1] !== ".") states[i+1][j+1] = states[i+1][j-1];
        // 4.3.2
        else if (p[j-1] === s[i] || p[j-1] === ".") {
          // either 3 sub cases is true, states[i][j] is true
          // a. single prev char: states[i][j-1]
          // b. multiple prev char: states[i-1][j]
          // c. empty current char: states[i][j-2]
          states[i+1][j+1] = states[i+1][j] || states[i][j+1] || states[i+1][j-1];
        }
      }
    }
  }

  return states[m][n];
};