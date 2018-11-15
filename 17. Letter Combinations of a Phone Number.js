/**
Given a digit string, return all possible letter combinations that the number could represent.

A mapping of digit to letters (just like on the telephone buttons) is given below.

    1   2   3
       abc def
    4   5   6
   ghi jkl mno
    7   8   9
  pqrs tuv wxyz
        0
 */
/**
 * Leetcode Fundamental: 11/14 Update
 * Failure:
 * 1. Fail to find recursive case: pass substring digits.slice(1)
 * 2. Fail to decide base case: digits.length === 0
 * 3. Fail to make a coopy of candidate for each recursive call
 *    Since we need to make a copy, no need to use array, string is ok
 * 
 * T: O(4^n)
 * Runtime: 52 ms
 */
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  // Handle edge case
  if (digits === undefined || digits.length === 0) return [];

  let map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz"
  }
  
  let result = [];

  const dfs = (digits, candidate) => {
    // Base case
    if (digits.length === 0) {
      result.push(candidate);
      return;
    }

    // Recursive case
    for (let char of map[digits[0]]) {
      dfs(digits.slice(1), candidate + char);
    }
  };
  
  dfs(digits, "");
  
  return result;
};