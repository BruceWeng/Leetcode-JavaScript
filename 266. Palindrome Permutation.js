/**
Given a string, determine if a permutation of the string could form a palindrome.
 */
/**
 * @param {string} s
 * @return {boolean}
 */
let canPermutePalindrome = function(s) {
  let oddCount = 0;
  let map = {};

  for (let char of s) {
    if (char in map) map[char] += 1;
    else map[char] = 1;
  }

  for (let key in map) {
    if (map[key] % 2 === 1) oddCount += 1;
  }

  return oddCount <= 1 ? true : false;
};

console.log(canPermutePalindrome("code")); // false
console.log(canPermutePalindrome("aab")); // true
console.log(canPermutePalindrome("carerac")); // true