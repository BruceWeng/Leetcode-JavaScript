/**
Given a board with m by n cells, each cell has an initial state live (1) or dead (0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

Any live cell with fewer than two live neighbors dies, as if caused by under-population.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by over-population..
Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
Write a function to compute the next state (after one update) of the board given its current state. The next state is created by applying the above rules simultaneously to every cell in the current state, where births and deaths occur simultaneously.
 */
/**
 * Algorithm: Siumulation + bit manipulation
 * 1. Next state live condition:
 *    a. board[i][j] == 1 && lives >= 2 && lives <= 3: 
 *       board[i][j] = 0x11 (3)
 *    b. board[i][j] == 0 && lives == 3:
 *       board[i][j] == 0x10 (2)
 * 2. Get current state:
 *    board[i][j] & 1
 * 3. Get next state:
 *    board[i][j] >> 1
 * 4. Write a function liveNeighbors(board, m, n, i, j): lives
 * 
 * T: O(m*n)
 * S: O(1)
 */
/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const gameOfLife = function(board) {
  if (board === undefined || board.legnth === 0) return;
  let m = board.length;
  let n = board[0].length;

  for (let i = 0; i < m; i += 1)
    for (let j = 0; j < n; j += 1) {
      let lives = liveNeighbors(board, m, n, i, j);

      // In the beginning, every 2nd bit is 0
      // So we only need to care about when will the 2nd bit become 1.
      if (board[i][j] === 1 && lives >= 2 && lives <= 3)
        board[i][j] = 3; // Make the 2nd bit 1: 01 => 11

      if (board[i][j] === 0 && lives === 3)
        board[i][j] = 2; // Make the 2nd bit 1: 00 => 10
    }

  for (let i = 0; i < m; i += 1)
    for (let j = 0; j < n; j += 1)
      board[i][j] >>= 1; // Get next(the 2nd) state
};

const liveNeighbors = function(board, m, n, i, j) {
  let lives = 0;
  for (let x = Math.max(i - 1, 0); x <= Math.min(i + 1, m - 1); x += 1)
    for (let y = Math.max(j - 1, 0); y <= Math.min(j + 1, n - 1); y += 1)
      lives += board[x][y] & 1; // Get current state

  lives -= board[i][j] & 1; // Get current state
  return lives;
}