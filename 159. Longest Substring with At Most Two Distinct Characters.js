/**
Given a string s , find the length of the longest substring t  that contains at most 2 distinct characters.

Example 1:

Input: "eceba"
Output: 3
Explanation: t is "ece" which its length is 3.
Example 2:

Input: "ccaabbb"
Output: 5
Explanation: t is "aabbb" which its length is 5.
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function(s) {
  // 1. if s.length === 0: return 0
  // 2. let map(key: char, val: freq)
  // 3. let end = 0, start = 0, length = 0
  // 4. while end < s.length:
  //    4.1 update map
  //    4.2 while (map.size > 2) update length
  //    4.3 update map, if map.get(startChar) === 0: map.delete(startChar), start += 1
  // 5. return length

  if (s.length === 0) return 0;

  let map = new Map();
  let end = 0;
  let start = 0;
  let length = 0;

  while (end < s.length) {
    let endChar = s[end];
    if (!map.has(endChar)) {
      map.set(endChar, 1);
    } else map.set(endChar, map.get(endChar) + 1);
    end += 1;

    while (map.size > 2) {
      let startChar = s[start];
      map.set(startChar, map.get(startChar) - 1);
      if (map.get(startChar) === 0) map.delete(startChar);
      start += 1;
    }

    length = Math.max(length, end - start);
  }

  return length;
};
