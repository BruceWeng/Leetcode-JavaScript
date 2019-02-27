/**
Given a string, find the length of the longest substring T that contains at most k distinct characters.

Example 1:

Input: s = "eceba", k = 2
Output: 3
Explanation: T is "ece" which its length is 3.
Example 2:

Input: s = "aa", k = 1
Output: 2
Explanation: T is "aa" which its length is 2.
 */
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function(s, k) {
  if (s.length === 0) return 0;
  let map = new Map();
  let start = 0;
  let end = 0;
  let length = 0;

  while (end < s.length) {
    let endChar = s[end];
    if (!map.has(endChar)) map.set(endChar, 1);
    else map.set(endChar, map.get(endChar) + 1);
    end += 1;

    while (map.size > k) {
      let startChar = s[start];
      map.set(startChar, map.get(startChar) - 1);
      if (map.get(startChar) === 0) map.delete(startChar);
      start += 1;
    }

    length = Math.max(length, end - start);
  }
  return length;
};
