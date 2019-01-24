/**
Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Note that an empty string is also considered valid.

Example 1:

Input: "()"
Output: true
Example 2:

Input: "()[]{}"
Output: true
Example 3:

Input: "(]"
Output: false
Example 4:

Input: "([)]"
Output: false
Example 5:

Input: "{[]}"
Output: true
 */
/** 
 * 
 * @param {string} s 
 * @return {bool}
 */
var isValid = function(s) {
    if (s === null || s.length === 0) {
        return false;
    }

    let stack = [];
    let table = {};

    table[')'] = '(';
    table[']'] = '[';
    table['}'] = '{';

    for (let i = 0; i < s.length; i++) {
        if (table[s[i]] === undefined) {
            stack.push(s[i]);
        } else {
            if (stack[stack.length - 1] === table[s[i]]) {
                stack.pop();
            } else {
                return false;
            }
        }
    }
    console.log(stack);
    return stack.length === 0 ? true : false;

};

console.log(isValid('['));

/**
 * Leetcode Fundamental: 11/4 Update
 * Failure: 
 * 1. Fail to think of a algorithm without hashMap: 
 *    a. push close bracket when meet a open bracket in if statement
 *    b. check if none of chars pushed in stack in else if statement
 *    c. check if stack.pop !== current char
 * 
 * Possible current char:
 * 1. Open bracket: push corresponding cloase bracket
 * 2. Close bracket: check if stack.pop() == char
 * 3. Other characters: After step 1. and stack is empty: return false
 */
const isValid = (s) => {
  if (s === undefined || s.length % 2 === 1) return false;

  let stack = [];
  for (let char of s) {
    if (char === "(") stack.push(")");
    else if (char === "[") stack.push("]");
    else if (char === "{") stack.push("}");
    else if (stack.pop() !== char) return false;
    // Other characters
    else if (stack.lengh === 0) return false; // <- Tricky Line
  }
  return stack.length === 0;
}

/**
 * Leetcode Explore: 1/24/2019 Update
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if (s.length === 0) return true;
    
    let stack = [];
    for (let c of s) {
      if (c === "{") stack.push("}");
      else if (c === "[") stack.push("]");
      else if (c === "(") stack.push(")");
      else if (stack.length !== 0 && stack[stack.length - 1] === c) stack.pop(); // match found
      else return false; // no match open parentheses to current close parentheses
    }
    
    return stack.length === 0; // if there is any open parentheses left, return false
  };