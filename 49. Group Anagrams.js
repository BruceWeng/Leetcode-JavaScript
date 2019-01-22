/**
Given an array of strings, group anagrams together.

Example:

Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
Note:

All inputs will be in lowercase.
The order of your output does not matter.
 */
/**
 * Leetcode Fundamental: Map(design key), 1/21/2019 Update
 */
/**
 * T: O(mlogm * n), m: len(char)
 * S: O(n), worst case: all the key are unique
 */
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  // 1. Use sorted string as key in the map, and group of strings as value
  // 2. Push all the values to the result array
  let map = new Map();
  for (let str of strs) {
    let strArr = str.split("");
    // Inplace sort strArr
    strArr.sort();
    let key = strArr.join("");
    if (map.has(key)) map.get(key).push(str);
    else map.set(key, [str]);
  }
  
  let result = [];
  for (let [key, value] of map) result.push(value);
  return result;
};