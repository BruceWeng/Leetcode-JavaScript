/**
Given a list of strings words representing an English Dictionary, find the longest 
word in words that can be built one character at a time by other words in words. 
If there is more than one possible answer, return the longest word with the smallest 
lexicographical order.

If there is no answer, return the empty string.

Note:

All the strings in the input will only contain lowercase letters.
The length of words will be in the range [1, 1000].
The length of words[i] will be in the range [1, 30].
 */
/**
 * @param {string[]} words
 * @return {string}
 */
let longestWord = function(words) {
  // lexicographical order sorting
  words.sort((a, b) => {
    for (let i = 0; i < a.length && i < b.length; i += 1) {
      if (a.charCodeAt(i) === b.charCodeAt(i)) continue;
      else return a.charCodeAt(i) - b.charCodeAt(i);
    }

    // handle the case the two word sharing the same prefix, return the word with shorter length
    // ex: "abc" and "abcd"
    return a.length - b.length;
  });

  let set = new Set();
  let result = "";

  for (let word of words) {
    if (word.length === 1 || set.has(word.substring(0, word.length - 1))) {
      if (word.length > result.length) result = word;
      set.add(word);
    }
  }

  return result;
};

console.log(longestWord(["w","wo","wor","worl", "world"])); // "world"
// Explanation: The word "world" can be built one character at a time by 
// "w", "wo", "wor", and "worl".
console.log(longestWord(["a", "banana", "app", "appl", "ap", "apply", "apple"])); // "apple"
// Explanation: Both "apply" and "apple" can be built from other words in the 
// dictionary. However, "apple" is lexicographically smaller than "apply".