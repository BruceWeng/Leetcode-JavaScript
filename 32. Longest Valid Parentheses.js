/**
Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

Example 1:

Input: "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()"
Example 2:

Input: ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()"
 */
/**
 * Leetcode Fundamental: 1/13/2019 Update
 * Algorithm: Stack
 * Stack SOP:
 * 1. Iterate parentheses
 * 2. Push index of '(': if (char === '(') stack.push(index)
 * 3. Match Found: else if (stack.length !== 0 && stack[stack.length-1] === '(') stack.pop()
 * 4. Push index of ')': else stack.push(index)
 * 
 * 1. Scan the string from beginning to end
 * 2. Do Stack SOP
 * 3. After the scan is done, the stack will only contains the indices of chars which can not be matched
 * 3.a: If stack.lenght === 0, the whole string is a valid parentheses, return s.length
 * 3.b: Intervals between all the indices in the stack are valid parentheses
 * 3.c: Calculate max length by update result from valid parentheses length(high - low - 1) 
 * 3.d: Need to iterate in REVERSED ORDER!
 * 4. return max(result, right) <-- cover the interval [0, right]
 * 
 * T: O(n), S: O(n)
 * Runtime: 80 ms
 */
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  if (s === undefined || s.length === 0) return 0;
  
  let stack = [];
  for (let i = 0; i < s.length; i += 1) {
    if (s[i] === '(') stack.push(i);
    else if (stack.length !== 0 && s[stack[stack.length - 1]] === '(') stack.pop();
    else stack.push(i);
  }
  
  if (stack.length === 0) return s.length;
  
  // Find longest length of valid parentheses by calculate length of interval between indices left in stack
  let left = 0;
  let right = s.length; 
  let result = 0;
  for (let i = stack.length - 1; i >= 0; i -= 1) {
    left = stack[i];
    result = Math.max(result, right - left - 1);
    right = stack[i];
  }
  
  return Math.max(result, right);
};