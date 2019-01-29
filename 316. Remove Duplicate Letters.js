/**
Given a string which contains only lowercase letters, remove duplicate letters so that every letter appear once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.

Example 1:

Input: "bcabc"
Output: "abc"
Example 2:

Input: "cbacdcbc"
Output: "acdb"
 */
/**
 * Leetcode Fundamental: 1/28 Update
 * Data Structure: 
 * 1. Increasing stack: make sure result is in increasing order
 * 2. Map(char, frequency): make sure each char are in stack
 * 3. Set: make sure char in stack are unique
 * 
 * T: O(n)
 * S: O(n)
 * Runtime: 88ms
 */
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function(s) {
  // 1. Declare count map to store key: char: frequency to make sure eache char are in stack
  // 2. Declare set to store visited char
  // 3. Use increasing stack to store first unique char
  //   3.1 When num < stack.peek(): stack.pop(), visited.delete(char)
  //   3.2 Whenever stack.push(char), visited.add(char)
  // 4. convert stack to string and return it
  
  let stack = []; // increasing stack
  let map = new Map();
  let visited = new Set();
  
  for (let char of s) {
    if (!map.has(char)) map.set(char, 1);
    else map.set(char, map.get(char) + 1);
  }
  
  for (let char of s) {
    map.set(char, map.get(char) - 1);
    if (visited.has(char)) continue;
    
    while (stack.length !== 0 && char.charCodeAt(0) < stack[stack.length - 1].charCodeAt(0) && map.get(stack[stack.length - 1]) !== 0) {
      visited.delete(stack.pop());
    }
    
    stack.push(char);
    visited.add(char);
  }
  
  return stack.join("");
};