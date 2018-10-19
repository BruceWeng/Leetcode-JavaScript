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
/**
 * Solution 2
 */
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist2 = (board, word) => {
  // Hoisting var searchWord;
  // Hoisting var notInArea;
  // Any variable used in searchWord should declared before execute searchWord
    
  // We have to declare visited in the following way
  // If we declare visited = new Array(board.length).fill(new Array(board[0].length).fill(false));
  // Once we set visited[i][j] = true, THE WHOLE COLUMN will be setted to true!!!

  // (When the fill method gets passed an object, it will copy the reference and fill the array with references to that object.)
  // Very tricky, have to remember.
  // 6.1 Declare visited matrix
  let visited = new Array();
  for (let i = 0; i < board.length; i += 1) {
    visited.push(new Array(board[0].length).fill(false));
  }

  // 4.1 Declare direction
  const direction = [ [-1, 0], [0, 1], [1, 0], [0, -1] ];
  // 1. Iterate each grid  
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[0].length; j += 1) {
      // 4.4 Handle true case in if loop
      if (searchWord(0, i, j)) return true;
    }
  }

  // 4.6 No word mateched
  return false;

  /**
   * Search word[index...word.length] form board[startx][starty]
   * 
   * @param {Number} index 
   * @param {Number} startx 
   * @param {Number} starty 
   */
  // 2. Declare searchWord
  function searchWord(index, i, j) {
    // 4.3 base case: the only true case
    if (index === word.length) return true;

    // 5 Handle notInArea false case
    if (notInArea(i, j)) return false;

    // 6. Handle visited gride false case
    if (visited[i][j]) return false;

    // 3. If grid !== word[index] return false
    if (board[i][j] !== word[index]) return false;

    // 7. Set visited grid to true if pass all false case
    visited[i][j] = true;

    // 4. Backtracking recursive case: Find next position
    for (let dir of direction) {
      let next_i = i + dir[0];
      let next_j = j + dir[1];

      // 4.2 Keep finding next word by calling searchWord function, the func only returns true when
      // index === word.length and this case should be handled in if loop
      // return true to terminate search
      if (searchWord(index+1, next_i, next_j)) return true;
    }

    // 8. Backtrack step: restore visited grid state to unvisited
    visited[i][j] = false;

    // 4.5 Current grid and all the children not matched to word[index]
    return false;
  }

  function notInArea(i, j) {
    return !(i >= 0 && i < board.length && j >= 0 && j < board[0].length);
  }
}

// Testing
let test1 = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
console.log(exist2(test1, "ABCCED")); // true
