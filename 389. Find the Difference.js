/**
Given two strings s and t which consist of only lowercase letters.

String t is generated by random shuffling string s and then add one more letter at a random position.

Find the letter that was added in t.
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
let findTheDifference = function(s, t) {
  if (s === undefined || t === undefined || s.length + 1 !== t.length ||
      typeof s !== 'string' || typeof t !== 'string')
    return "";

  let map = {};
  for (let char of s) {
    if (char in map) map[char] += 1;
    else map[char] = 1;
  }

  for (let char of t) {
    if (char in map) map[char] -= 1;
    else map[char] = -1;
  }

  for (let key in map) {
    if (map[key] === -1) return key;
  }
};

/**
 * Bit manipulation
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
let findTheDifference2 = function(s, t) {
  // s.concat(t) returns a new string since string is immutable
  // let str = s.concat(t); O(n)

  // O(1)
  let result = t.charCodeAt(t.length - 1);
  for (let i = 0; i < s.length; i += 1) {
    result ^= s.charCodeAt(i);
    result ^= t.charCodeAt(i);
  }

  return String.fromCharCode(result);
}

console.log(findTheDifference("abcd", "abcde")); // e
// Explanation: 'e' is the letter that was added.
console.log(findTheDifference("", "")); // ""
console.log(findTheDifference()); // ""
console.log(findTheDifference(1, 2)); // ""
console.log(findTheDifference("abcd", "a")); // ""