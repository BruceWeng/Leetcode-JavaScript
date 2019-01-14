/**
Given a non-empty array of digits representing a non-negative integer, plus one to the integer.

The digits are stored such that the most significant digit is at the head of the list, and each element in the array contain a single digit.

You may assume the integer does not contain any leading zero, except the number 0 itself.

Example 1:

Input: [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Example 2:

Input: [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
 */
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  // Iterate digits
  // 1. Each element have two cases:
  // 1.1 digits[i] < 9: digits[i] += 1; return digits
  // 1.2 digits[i] === 9: digits[i] = 0;
  // 2. Add one more 1 in the leading digit
  // 3. Return digits
  
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    if (digits[i] < 9) {
      digits[i] += 1;
      return digits;
    } else {
      digits[i] = 0;
    }
  }
  
  digits = [1, ...digits];
  return digits
};