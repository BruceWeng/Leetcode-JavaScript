/**
Given a non-empty string s and a dictionary wordDict containing a list of non-empty 
words, add spaces in s to construct a sentence where each word is a valid dictionary 
word. Return all such possible sentences.

Note:

The same word in the dictionary may be reused multiple times in the segmentation.
You may assume the dictionary does not contain duplicate words.
Example 1:

Input:
s = "catsanddog"
wordDict = ["cat", "cats", "and", "sand", "dog"]
Output:
[
  "cats and dog",
  "cat sand dog"
]
Example 2:

Input:
s = "pineapplepenapple"
wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
Output:
[
  "pine apple pen apple",
  "pineapple pen apple",
  "pine applepen apple"
]
Explanation: Note that you are allowed to reuse a dictionary word.
Example 3:

Input:
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
Output:
[]
 */
/**
 * Algorithm: DFS
 * 0. https://www.youtube.com/watch?v=JqOIRBC0_9c
 * 1. Move a break point and divide the string into two parts,
 *    the result will the union of the following recursion functions
 *    ex: s = "catsanddog"
 *        wordBreakII("catsanddog") = 
 *                      {wordBreakII("") + inDictHelper("catsanddog")}
 *                    U {wordBreakII("c") + inDictHelper("atsanddog")}
 *                    U {wordBreakII("ca") + inDictHelper("tsanddog")}
 *                                          ...
 *                    U {wordBreakII("catsand") + inDictHelper("dog")}
 *                                          ...
 *        = { "cat sand dog", "cats and dog" }
 * 
 *        wordBreakII("catsand") = 
 *                      {wordBreakII("") + inDictHelper("catsand")}
 *                    U {wordBreakII("c") + inDictHelper("atsand")}
 *                    U {wordBreakII("ca") + inDictHelper("tsand")}
 *                    U {wordBreakII("cat") + inDictHelper("sanddog")}
 *                    U {wordBreakII("cats") + inDictHelper("anddog")}
 *                                          ...    
 *        = { "cat sand", "cats and" }    
 * 
 *        wordBreakII("cat") = 
 *                      {wordBreakII("") + inDictHelper("cat")}
 *                    U {wordBreakII("c") + inDictHelper("at")}    
 *                                          ...
 *        = { "cat" }  
 * 
*        wordBreakII("cats") = 
 *                      {wordBreakII("") + inDictHelper("cats")}
 *                    U {wordBreakII("c") + inDictHelper("ats")}    
 *                                          ...
 *        = { "cats" }  
 * 
 *      inDictHelper("cat") = "cat"
 *      inDictHelper("cats") = "cats"
 *      inDictHelper("sand") = "sand"
 *      inDictHelper("dog") = "dog"
 *      inDictHelper(unknown) = ""
 * 2. Construct dict array to set so that the find operation is O(1)
 * 3. Construct map to store (sentence, validWords[string]) to prevent duplicate recursion
 * 
 * T: O(2^N)
 * S: O(2^N)
 */
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
const wordBreak = function(s, wordDict) {
  // construct a set storing words in wordDict so that search action will be O(1)
  let dict = new Set(wordDict);
  // construct a map storing (sentence, validWords[string]) to prevent multiple
  // recursion
  let map = {};
  return inDictHelper(s, map, dict);
};

/**
 * Return a string array with all possibility sentence
 * @param {string} s 
 * @param {map} map
 * @param {set} dict 
 * @return {string[]}
 */
const inDictHelper = function(s, map, dict) {
  // check if the string s is calculated before
  if (s in map) return map[s];

  let result = [];

  for (let start = 0; start < s.length-1; start += 1) {
    if (dict.has(s.substring(0, start+1))) {
      let validWords = inDictHelper(s.substring(start+1, s.length), map, dict);
      if (validWords.length > 0) {
        for (let word of validWords) {
          result.push(`${s.substring(0, start+1)} ${word}`);
        }
      }
    }
  }

  if (dict.has(s)) result.push(s);
  map[s] = result;
  return result;
};

let test_s = "catsanddog";
let test_dict = ["cat","cats","and","sand","dog"];

console.log(wordBreak(test_s, test_dict)); 
/**
 * [
 *  "cats and dog",
 *  "cat sand dog"
 * ]
 */
