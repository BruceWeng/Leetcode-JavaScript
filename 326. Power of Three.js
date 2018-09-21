/**
Given an integer, write a function to determine if it is a power of three.

Example 1:

Input: 27
Output: true
Example 2:

Input: 0
Output: false
Example 3:

Input: 9
Output: true
Example 4:

Input: 45
Output: false
Follow up:
Could you do it without using any loop / recursion?
 */
/**
 * Algorithm:
 * Get length of input and validate if n == 3^(2n) or n == 3^(2n-1)
 */
const isPowerOfThree = function(n) {
  if (n > Number.MAX_SAFE_INTEGER) return false;
  if (n === 1) return true;
  let length = String(n).length;
  
  if (n === Math.pow(3, 2*length) || n === Math.pow(3, 2*length-1))
    return true;
  else return false;
};