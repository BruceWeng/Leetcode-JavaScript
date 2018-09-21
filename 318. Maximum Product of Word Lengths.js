/**
Given a string array words, find the maximum value of length(word[i]) * length(word[j]) 
where the two words do not share common letters. You may assume that each word will contain 
only lower case letters. If no such two words exist, return 0.

Example 1:

Input: ["abcw","baz","foo","bar","xtfn","abcdef"]
Output: 16 
Explanation: The two words can be "abcw", "xtfn".
Example 2:

Input: ["a","ab","abc","d","cd","bcd","abcd"]
Output: 4 
Explanation: The two words can be "ab", "cd".
Example 3:

Input: ["a","aa","aaa","aaaa"]
Output: 0 
Explanation: No such pair of words.
 */
/**
 * Algorithm: Bit manipulation
 * 1. Declare bytes [] stores bit representation of char by
 *    val |= 1 << words[i].charCodeAt(j) - 97
 *    ex: abc -> 00000111
 *        de ->  00011000
 * 2. Iterate bytes and compares any two:
 *      if bytes[i] & bytes[j] == 0 (mutual excluded):
 *        result = Math.max(result, words[i].length * words[j].length)
 * 3. return result
 */
/**
 * @param {string[]} words
 * @return {number}
 */
const maxProduct = function(words) {
  if (typeof words === "undefined" || words.length === 0) 
    return 0;

  let result = 0;
  let len = words.length;
  let bytes = new Array(len).fill(0);

  for (let i = 0; i < len; i += 1)
    for (let char of words[i])
      bytes[i] |= (1 << (char.charCodeAt(0) - 97));

  for (let i = 0; i < len; i += 1)
    for (let j = i + 1; j < len; j += 1)
      if ( (bytes[i] & bytes[j]) === 0 ) 
      // Must have parentheses between bytes[i] & bytes[j]
      // otherwise default: bytes[i] & (bytes[j] === 0)
        result = Math.max(result, words[i].length * words[j].length);
  
  return result;
};

let input = ["abcw","baz","foo","bar","xtfn","abcdef"];
console.log(maxProduct(input)); // 16