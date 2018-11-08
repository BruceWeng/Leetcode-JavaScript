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
/**
 * Leetcode Fundamental: 11/7 Update
 * Failure:
 * 1. Fail to think of store end index in map as value
 * 2. Fail to update start by map[nums[end]] + 1
 * 3. Fail to think of the timing to update start
 * 
 * T: One Pass O(n)
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // Handle edge case
    if (s === undefined || s.length === 0) return 0;
    
    // Declare a hash table with key: character, value: end index in substring range: [start...end] (inclusive)
    let start = 0;
    let map = {};
    let result = 0;
    for (let end = 0; end < s.length; end += 1) {
      // 2 thing to do no matter what in this loop
      // 1. reset map[s[end]] = end
      // 2. result = Math.max(result, len)
      
      // When we find current char is in map(repeated):
      // Move start pointer to end + 1 if end + 1 > start
      if (s[end] in map) start = Math.max(start, map[s[end]] + 1);
      
      map[s[end]] = end;
      result = Math.max(result, end - start + 1);
    }
    
    return result;
  };
/**
 * Leetcode Fundamental: 11/8 Update
 * 
 * Using Set to maintain valid elements in the interval
 * if nums[end] not in set:
 *   a. add it in and increment end
 *   b. update result = max(result, set.size) <- Awesome move!
 * else: remove nums[start] from set, start += 1
 * 
 * return result
 * 
 * Inspired by 219. Contains Duplicate II
 */
const lengthOfLongestSubstring = (s) => {
  if (s === undefined || s.length === 0) return 0;

  let start = 0;
  let end = 0;
  let result = 0;
  let set = new Set();
  
  while (end < s.length) {
    if (!set.has(s[end])) {
      set.add(s[end]);
      end += 1;
      result = Math.max(result, set.size);
    }
    else {
      set.delete(s[start]);
      start += 1;
    }
  }

  return result;
};
