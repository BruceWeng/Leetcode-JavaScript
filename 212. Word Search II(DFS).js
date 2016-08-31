/**
 * Note:
 *   1. Time: O(N^2)(board size)*O(N^2)(DFS)*O(L)(word list size)
 *      or O(N^2)*O(4^A)(A is number of all characters)
 *   2. Space: visited O(N^2), can optimize to O(1) by replace each word into '#' when visited
 *   3. Optimize edge case: many string with identical characters -> Trie Tree
 *      Reduce time from O(N^2)*O(4^K)(K is the longest string) -> Same as single string(Word Search I)
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

  let visited = new Array();
  for (let i = 0; i < board.length; i++) {
    visited[i] = new Array(board[0].length).fill(0);
  }

  for (let word of words) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (dfs(0, i, j, word) && !result.includes(word)) {
          result.push(word);
        }
      }
    }
  }

  return result;

  /**
   * @param {number} word index
   * @param {number} board i coordinate
   * @param {number} board j coordinate
   * @param {number} word list index
   * @return {boolean} true if find match word
   */
  function dfs(index, i, j, word) {
    // console.log(visited);
    if (index === word.length) {
      return true;
    }

    if (!(i >= 0 && i < board.length && j >= 0 && j < board[0].length)) {
      return false;
    }

    if (visited[i][j] === 1 || board[i][j] !== word[index]) {
      return false;
    }

    visited[i][j] = 1;
    let findNext = dfs(index + 1, i - 1, j, word) ||
                   dfs(index + 1, i, j + 1, word) ||
                   dfs(index + 1, i + 1, j, word) ||
                   dfs(index + 1, i, j - 1, word);
    visited[i][j] = 0;

    return findNext;
  }
};

let test1 = [['o', 'a', 'a', 'n'],
             ['e', 't', 'a', 'e'],
             ['i', 'h', 'k', 'r'],
             ['i', 'f', 'l', 'v']];
let word1 = ['oath', 'pea', 'eat', 'rain'];

console.log(findWords(test1, word1));
