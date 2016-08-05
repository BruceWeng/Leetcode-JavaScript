/**
 * Note:
 * 1. Hash Map(character, index)
 * 2. When meet repeating characters and map.get(char) >= start, use last repeating character index + 1 as start for next substring

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  if (s === null || s.length === 0) {
      return 0;
  }

  let length = 0;
  let maxLen = 0;
  let map = new Map();
  let start = 0;
  for (let i = 0; i < s.length; i++) {
      let char = s[i];
      if (map.has(char) && map.get(char) >= start) {
          start = map.get(char) + 1;
          length = i - start;
      }

      map.set(char, i);
      length++;
      if (length > maxLen) maxLen = length;
  }

  return maxLen;
};
