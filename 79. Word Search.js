/**
 * Note:
 *   1. dfs from every element in the board
 *   2. Need visited a 2d array to memorize traversed element: Space O(N^2)
 *   3. Time: O(N^2)(every element)*O(N^2)(dfs) = O(N^4)
 *   4. Check boundary, visited, matched word, return true when index === word.length
 *   5. let nextFInd = four direction dfs return value
 *   6. set visited[i][j] = 1 before dfs, set visited[i][j] = 0 after dfs, so that
 *      same element can be inspected from different starting point
 */
'use strict';
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  if (board.length === 0 || board[0].length === 0 || word === null) {
    return false;
  }

  let visited = new Array();
  for (let i = 0; i < board.length; i++) {
    visited[i] = new Array(board[0].length).fill(0);
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (dfs(0, i, j)) {
        return true;
      }
    }
  }

  return false;

  function dfs(index, i, j) {
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
    let findNext = dfs(index + 1, i + 1, j) ||
                   dfs(index + 1, i, j - 1) ||
                   dfs(index + 1, i - 1, j) ||
                   dfs(index + 1, i, j + 1);
    visited[i][j] = 0;

    return findNext;
  }
};

let test1 = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
console.log(exist(test1, 'aac'));
