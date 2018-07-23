/**
Given two words (beginWord and endWord), and a dictionary's word list, find all shortest 
transformation sequence(s) from beginWord to endWord, such that:

Only one letter can be changed at a time
Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
Note:

Return an empty list if there is no such transformation sequence.
All words have the same length.
All words contain only lowercase alphabetic characters.
You may assume no duplicates in the word list.
You may assume beginWord and endWord are non-empty and are not the same.
Example 1:

Input:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

Output:
[
  ["hit","hot","dot","dog","cog"],
  ["hit","hot","lot","log","cog"]
]
Example 2:

Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

Output: []

Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.
 */
/**
 * Algorithm: BFS (construct graph) + DFS search possible next words and construct the path
 * ex 1:
 *                    t->g
 *                dot ---> dog
 *      i->o    / h->d        \ d->c
 *  hit ---> hot               cog
 *              \ h->l        / l->c
 *                lot ---> log
 *                    t->g
 * 
 * ex 2: word in wordList reused
 * 
 *        rex ---> tex
 *      /      /       \
 *  red       /         tax
 *      \    /         /
 *        ted ---> tad
 * 
 * T: O(m+n),m is the number of edge and n is the number of point
 * S: O(m+n)
 * 
 * Time Limit Exceeded in JS
 */
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
const findLadders = function(beginWord, endWord, wordList) {
    // Construct wordList set so that search cost O(1)
    let unvisitedSet = new Set(wordList);

    // Edge case
    if (!unvisitedSet.has(endWord)) {
      return [];
    }

    // Remove beginWord so that won't construct path of itself
    unvisitedSet.delete(beginWord);

    // Construct neighborMap(word: string, neightbor_word[]: string[])
    let neighborMap = {};

    // Construct a queue for BFS
    let queue = [beginWord];

    // BFS: A variation of Dijkstra's algorithm
    while (queue.length !== 0) {
      // label visited words
      let visitedSet = new Set();
      // traverse the whole level words with the same length of laddar
      /**
       * VERY IMPORTANT: Must assign queue.length outside of for loop,
       * because queue.length is re-evaluated while queue size changed in the for loop
       */
      let len = queue.length;
      for (let i = 0; i < len; i += 1) {
        let currWord = queue.shift();
        // iterate each letter in currWord
        for (let i = 0; i < currWord.length; i += 1) {
          // iterate a to z
          for (let code = "a".charCodeAt(0); code <= "z".charCodeAt(0); code += 1) {
            let char = String.fromCharCode(code);
            let neighborWord = currWord.substring(0, i) + char + currWord.substring(i+1);
            if (neighborWord === currWord) continue;
            if (unvisitedSet.has(neighborWord)) {
              if (!visitedSet.has(neighborWord)) {
                visitedSet.add(neighborWord);
                queue.push(neighborWord);
              }

              if (neighborWord in neighborMap) {
                neighborMap[neighborWord].push(currWord);
              } else {
                neighborMap[neighborWord] = [currWord];
              }
            }
          }
        }
      }
      // Make difference of unvisitedSet from visitedSet
      unvisitedSet = new Set(
        [...unvisitedSet].filter(x => !visitedSet.has(x))
      );
      visitedSet.clear();
    }

    // DFS search possible next words and construct the path
    let result = [];
    helperDFS(neighborMap, beginWord, endWord, result, [endWord]);
    return result;
};

/**
 * @param {Map} neighborMap 
 * @param {string} beginWord 
 * @param {string} endWord 
 * @param {[]} result 
 * @param {object} path 
 */
const helperDFS = function(neighborMap, beginWord, word, result, path) {
  if (beginWord === word) {
    result.push(path);
  } else {
    // Iterate array neighborMap[word]
    if (word in neighborMap) {
      for (let prevNode of neighborMap[word]) {
        helperDFS(neighborMap, beginWord, prevNode, result, [prevNode].concat(path));
      }
    }
  }
}

let beginWord = "hit";
let endWord = "cog";
let wordList = ["hot","dot","dog","lot","log","cog"];
console.log(findLadders(beginWord, endWord, wordList));
/**
 * [
 *  ["hit","hot","dot","dog","cog"],
 *  ["hit","hot","lot","log","cog"]
 * ]
 */