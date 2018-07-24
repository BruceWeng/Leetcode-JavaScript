/**
Given a 2D board and a list of words from the dictionary, find all words in the board.

Each word must be constructed from letters of sequentially adjacent cell, where "adjacent" 
cells are those horizontally or vertically neighboring. The same letter cell may not be 
used more than once in a word.

Example:

Input: 
words = ["oath","pea","eat","rain"] and board =
[
  ['o','a','a','n'],
  ['e','t','a','e'],
  ['i','h','k','r'],
  ['i','f','l','v']
]

Output: ["eat","oath"]
 */
/**
 * Note:
 *   1. Time: O(N^2)(board size)*O(N^2)(DFS)*O(L)(word list size)
 *      or O(N^2)*O(4^A)(A is number of all characters)
 *   2. Space: visited O(N^2), can optimize to O(1) by replace each word into '#' when visited
 *   3. Optimize edge case: many string with identical characters -> Trie Tree
 *      Reduce time from O(N^2)*O(4^K)(K is the longest string) -> Same as single string(Word Search I)
 * 
 * Explanation: 
 * Intuitively, start from every cell and try to build a word in the dictionary. Backtracking (dfs) is the powerful way to exhaust every possible ways. Apparently, we need to do pruning when current character is not in any word.
 *
 * How do we instantly know the current character is invalid? HashMap?
 * How do we instantly know what's the next valid character? LinkedList?
 * But the next character can be chosen from a list of characters. "Mutil-LinkedList"?
 * Combing them, Trie is the natural choice. Notice that:

 * TrieNode is all we need. search and startsWith are useless.
 * No need to store character at TrieNode. c.next[i] != null is enough.
 * No need to use O(n^2) extra space visited[m][n].
 */
'use strict';
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
  let result = new Array();
  if (board.length === 0 ||
      board[0].length === 0 ||
      words.length === 0 ||
      words[0].length === 0) {
    return result;
  }

  let root = buildTrie(words);

  for (let word of words) {
    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[0].length; j += 1) {
        helperDFS(board, i, j, root, result);
      }
    }
  }

  return result;
};

/**
 * @param {string[][]} board 
 * @param {number} i 
 * @param {number} j 
 * @param {TrieNode} node 
 * @param {string[]} result 
 */
const helperDFS = function(board, i, j, node, result) {
  let char = board[i][j];
  let code = char.charCodeAt(0) - "a".charCodeAt(0);
  if (char === "#" || node.next[code] === null) return;

  node = node.next[code];
  // found one
  if (node.word !== null) {
    result.push(node.word);
    // de-duplicate
    node.word = null;
  }

  board[i][j] = "#";
  if (i > 0) helperDFS(board, i-1, j, node, result); // Go up
  if (j > 0) helperDFS(board, i, j-1, node, result); // Go left
  if (i < board.length-1) helperDFS(board, i+1, j, node, result); // Go down
  if (j < board[0].length-1) helperDFS(board, i, j+1, node, result); // Do right
  board[i][j] = char;
};

class TrieNode {
  constructor() {
    this.next = new Array(26).fill(null);
    this.word = null;
  }
}

/**
 * @param {string[]} words 
 */
const buildTrie = function(words) {
  let root = new TrieNode();

  for (let word of words) {
    let node = root;
    for (let char of word) {
      let code = char.charCodeAt(0) - "a".charCodeAt(0);
      if (node.next[code] === null) {
        node.next[code] = new TrieNode();
      }
      node = node.next[code];
    }
    node.word = word;
  }
  return root;
};

let test1 = [['o', 'a', 'a', 'n'],
             ['e', 't', 'a', 'e'],
             ['i', 'h', 'k', 'r'],
             ['i', 'f', 'l', 'v']];
let word1 = ['oath', 'pea', 'eat', 'rain'];

console.log(findWords(test1, word1)); // ["oath", "eat"]
