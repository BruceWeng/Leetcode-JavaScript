/**
Given a string which consists of lowercase or uppercase letters, find the length 
of the longest palindromes that can be built with those letters.

This is case sensitive, for example "Aa" is not considered a palindrome here.

Note:
Assume the length of given string will not exceed 1,010.
 */
/**
 * @param {string} s
 * @return {number}
 */
let longestPalindrome = function(s) {
  let oddCount = 0;
  let map = {};

  for (let char of s) {
    if (char in map) map[char] += 1;
    else map[char] = 1;
  }

  for (let key in map) {
    if (map[key] % 2 === 1) oddCount += 1;
  }

  return (oddCount !== 0) ? s.length - oddCount + 1 : s.length
};

console.log(longestPalindrome("abccccdd")); // 7
console.log(longestPalindrome("aabbeeee")); // 8
// Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.