/**
Given two strings s and t, determine if they are isomorphic.

Two strings are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character but a character may map to itself.

Example 1:

Input: s = "egg", t = "add"
Output: true
Example 2:

Input: s = "foo", t = "bar"
Output: false
Example 3:

Input: s = "paper", t = "title"
Output: true
Note:
You may assume both s and t have the same length.
 */
/**
 * Leetcode Fundamental: Map, 1/21/2019 Update
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
  // 1. Geneate pairs in map with key: s[i], value: t[i]
  // 2. Iterate s and s:
  // if map.has(s[i]):
  //   if map.get(s[i]) !== t[i]: return false;
  // 3. Condition to set pairs: both s[i] not as key in map and t[i] not as value in map: map.set(s[i], t[i])
  // 4. valid case: return true

  if (s === undefined || t === undefined) return false;
  if (s.length !== t.length) return false;
  
  let map = new Map();
  for (let i = 0; i < s.length; i += 1) {
    if (map.has(s[i])) {
      if (map.get(s[i]) !== t[i]) return false;
    }
    else {
      for (let [key, value] of map) {
        if (t[i] !== value) continue;
        else return false;
      }
      map.set(s[i], t[i]);
    }
  }    
  
  return true;
};