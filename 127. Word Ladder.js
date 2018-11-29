/**
Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest transformation sequence from beginWord to endWord, such that:

Only one letter can be changed at a time.
Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
Note:

Return 0 if there is no such transformation sequence.
All words have the same length.
All words contain only lowercase alphabetic characters.
You may assume no duplicates in the word list.
You may assume beginWord and endWord are non-empty and are not the same.
Example 1:

Input:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

Output: 5

Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
return its length 5.
Example 2:

Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

Output: 0

Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.
 */
/**
 * Leetcode Fundamental: 11/28 Update
 * Two-end BFS with 3 Sets
 * Failure:
 * Fail to think of using BFS
 * 
 * n: wordList.length, l: word.length
 * Single-end BFS: T: O(n*26^l)
 * Two-end BFS: T: O(n*26^(l/2))
 * S: O(n) (Sets)
 * Runtime: 132 ms
 */
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
  if (!wordList.includes(endWord)) return 0;
  let beginSet = new Set();
  let endSet = new Set();
  let wordSet = new Set(wordList); 
  // If we need to use array.includes, transfer the array into set and use set.has for optimization

  let length = 1;
  let visited = new Set();

  beginSet.add(beginWord);
  endSet.add(endWord);
    
  while (beginSet.size !== 0 && endSet.size !== 0) {
    // Swap set for iterating smaller set in the following
    if (beginSet.size > endSet.size) {
      let set = beginSet;
      beginSet = endSet;
      endSet = set;
    }

    let candidSet = new Set(); // Stores next candidate word
    for (let word of beginSet.values()) { // word: string
      // Replace word[i] to chars from 'a' to 'z'
      for (let i = 0; i < word.length; i += 1) {
        // String is immutable
        let wordArr = word.split(''); // Make sure pass empty '' in split()
        for (let charCode = 97; charCode < 123; charCode += 1) {
          let char = String.fromCharCode(charCode);
          let oldChar = wordArr[i];
          wordArr[i] = char;
          let newWord = wordArr.join(''); // Make sure pass empty '' in join()

          if (endSet.has(newWord)) return length + 1;

          if (!visited.has(newWord) && wordSet.has(newWord)) {
            candidSet.add(newWord);
            visited.add(newWord);
          }

          // New word not found. Restore char for word
          wordArr[i] = oldChar;
        }
      }
    }

    beginSet = candidSet;
    length += 1;
  }

  // Transfomr fail
  return 0;
};