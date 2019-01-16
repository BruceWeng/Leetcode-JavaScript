/**
Given two binary strings, return their sum (also a binary string).

The input strings are both non-empty and contains only characters 1 or 0.

Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"
 */
/**
 * Leetcode Explore: 1/15/2019 Update
 * T: O(n)
 * S: O(n)
 */
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
  // Thinking Process
  // 1. Iterate a and b in reversed order in range(max(a.length, b.length) + 1)
  // 1.1 let result = new Array(max(a.length, b.length)).fill(0);
  // 1.1 sum = a[i] + b[i] + carry: result[i] = sum % 2, carry = sum / 2
  // (result[i]: 0 -> 0, 1 -> 1, 2 -> 0, 3 -> 1): sum % 2
  // (carry: 0 -> 0, 1 -> 0, 2 -> 1, 3 -> 1): sum / 2
  // 2. If carry === 1: result = [1, ...result]
  // 3. return result.join("")
  
  if (a === undefined || b === undefined || a.length === 0 || b.length === 0) return "";
  
  let m = a.length;
  let n = b.length;
  
  let result = m >= n ? [...a] : [...b];
  let sum = 0;
  let carry = 0;
  
  for (let count = 0; count < Math.max(a.length, b.length); count += 1) {
    let digitA = (m-count-1 < 0) ? 0 : a[m-count-1];
    let digitB = (n-count-1 < 0) ? 0 : b[n-count-1];

    sum = Number(digitA) + Number(digitB) + carry;
    result[result.length-count-1] = sum % 2;
    carry = Math.floor(sum / 2);
  }
  
  result = result.join("");
  if (carry === 1) result = 1 + result;
  
  return result;
};