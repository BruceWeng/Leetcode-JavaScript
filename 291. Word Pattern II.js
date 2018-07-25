/**
Given a pattern and a string str, find if str follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern 
and a non-empty substring in str.

Example 1:

Input: pattern = "abab", str = "redblueredblue"
Output: true
Example 2:

Input: pattern = pattern = "aaaa", str = "asdasdasdasd"
Output: true
Example 3:

Input: pattern = "aabb", str = "xyzabcxzyabc"
Output: false
Notes:
You may assume both pattern and str contains only lowercase letters.
 */
/**
 * Algorithm: Backtracking + String.prototype.startsWith("str", startIndex)
 * 1. Declare hashmap matchedPattern stores (pattern: corresponding word) ex: { "a": "red", "b", "blue"}
 * 2. Dclare a set wordUsed stores used words so that no more than one pattern matches the same word:
 *    ex: "a": "red", "red" stores in set and "b" can not matches to "red"
 * 3. Declare helper(pattern, str, matchedPattern, wordUsed):
 *      base: if (pattern.length === 0) return str.length === 0
 *      recursive1: 
 *          p = pattern[0], nextP = pattern.substring(1)
 *          if p in matchedPattern:
 *              word = matchedPatter[p]
 *              if str.startsWith(word): 
 *                  return helper(nextP, str.substring(word.length), matchedPattern, wordUsed)
 *              else:
 *                  return false
 *      recursive2:
 *          for i = 1, p = pattern[0]; i < str.length - nextP.length + 1; i += 1:
 *              word = str.substring(0, i)
 *              if wordUsed.has(word):
 *                  continue
 *              matchedPattern[p] = word
 *              wordUsed.add(word)
 *              if (helper(nextP, str.substring(i), matchedPattern, wordUsed)) return true
 *              wordUsed.delete(word)
 *              delete matchedPattern(p)
 *      return false 
 * 
 * Optimization: pass pattern index and str index rather than the slicing pattern and slicing str into helper
 * This saves time doing the slicing.
 */
/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
let wordPatternMatch = function(pattern, str) {
    return helper(pattern, str, 0, 0, {}, new Set());
};

let helper = function(pattern, str, pIdx, sIdx, matchedPattern, wordUsed) {
    // base case
    if (pIdx === pattern.length && sIdx === str.length) return true;
    if (pIdx === pattern.length || sIdx === str.length) return false;

    // recursive case 1
    let p = pattern[pIdx];
    if (p in matchedPattern) {
        let word = matchedPattern[p];
        if (!str.startsWith(word, sIdx)) {
            return false;
        } 
        
        return helper(pattern, str, pIdx+1, sIdx+word.length, matchedPattern, wordUsed);
    }

    // recursive case 2
    for (let i = sIdx; i < str.length; i += 1) {
        let word = str.substring(sIdx, i+1);

        // for in is useless in Set, must use Set.has()
        if (wordUsed.has(word)) continue;

        matchedPattern[p] = word;
        wordUsed.add(word);

        if (helper(pattern, str, pIdx+1, i+1, matchedPattern, wordUsed)) return true;
        wordUsed.delete(word);
        delete matchedPattern[p];
    }

    return false;
};

let pattern1 = "abab";
let str1 = "redblueredblue";
console.log(wordPatternMatch(pattern1, str1)); // true

let pattern2 = "ab";
let str2 = "aa"
console.log(wordPatternMatch(pattern2, str2)); // false
