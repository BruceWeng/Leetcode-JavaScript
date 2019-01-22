/**
Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

Examples:

s = "leetcode"
return 0.

s = "loveleetcode",
return 2.
Note: You may assume the string contain only lowercase letters.
 */
/**
 * Leetcode Fundamental: Map(update info), Update 1/21/2019
 */
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  // 1. let map stores: key: char, value: [ocurrence, index]
  // 2. If map.has(s[i]) map.get(s[i])[0] += 1
  // 3. Iterate map where value[0] === 1: update minIndex
  // 4. return minIndex
  let map = new Map();
  let minIdx = s.length;
  
  for (let i = 0; i < s.length; i += 1) {
    if (map.has(s[i])) map.get(s[i])[0] += 1;
    else map.set(s[i], [1, i]);
  }
  
  for (let [key, value] of map) {
    if (value[0] === 1) minIdx = Math.min(minIdx, value[1]);
  }
  
  if (minIdx === s.length) return -1;
  return minIdx;
  
};