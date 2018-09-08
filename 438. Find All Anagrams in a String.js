/**
Given a string s and a non-empty string p, find all the start indices of p's 
anagrams in s.

Strings consists of lowercase English letters only and the length of both 
strings s and p will not be larger than 20,100.

The order of output does not matter.
 */
/**
 * Algorithm: Sliding Window
 */
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
const findAnagrams = function(s, p) {
  let result = [];
  if (p.length > s.length) return result;
  let map = new Map();
  map.getOrDefault = function(key, defaultVal) {
    if (map.has(key)) {
      return map.get(key);
    } else {
      map.set(key, defaultVal);
      return defaultVal;
    }
  }

  for (let char of p) {
    map.set(char, map.getOrDefault(char, 0) + 1);
  }

  let counter = map.size;
  let start = 0;
  let end = 0;
  let head = 0;
  let len = Number.MAX_SAFE_INTEGER;

  while (end < s.length) {
    let char = s[end];
    if (map.has(char)) {
      map.set(char, map.get(char) - 1);
      if (map.get(char) === 0) counter -= 1;
    }

    end += 1;

    while (counter === 0) {
      let tempChar = s[start];
      if (map.has(tempChar)) {
        map.set(tempChar, map.get(tempChar) + 1);
        if (map.get(tempChar) > 0) {
          counter += 1;
        }
      }

      if (end - start === p.length) {
        result.push(start);
      }
      start += 1;
    }
  }
  return result;
};

console.log(findAnagrams("cbaebabacd", "abc")); // [0, 6]
/**
 * Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
 */

console.log(findAnagrams("abab", "ab")); // [0, 1, 2]
/**
 * Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".
 */