/**
Given an integer (signed 32 bits), write a function to check whether it is a power of 4.

Example 1:

Input: 16
Output: true
Example 2:

Input: 5
Output: false
Follow up: Could you solve it without loops/recursion?
 */
/**
 * Algorithm:  Bit manipulation
 * 
 * The(num - 1) % 3 == 0is used to distinguish the 4^n from 2^n.
 * 2^n = (3-1)^n = C(n,0)3^n(-1)^0+....+(-1)^n.
 * 
 * 1.When 2^n is 4^n, which means n is even, in this case, 
 * (-1)^n==1 and (2^n-1）%3==0
 * 2.When 2&n is not 4^n, which means n is odd, in this case, 
 * (-1)^n=-1 and (2^n-1）%3==1；
 * This is why we can use(num-1)%3==0 as a condition to sperate 4^n from 2^n.
 */
const isPowerOfFour = (num) => {
  return num > 0 && (num & (num - 1)) === 0 && (num - 1) % 3 === 0;
}
