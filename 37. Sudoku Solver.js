/**
 * @param {character[][]} board
 * @return {void}  Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
  if (board.length === 0 || board[0].length === 0) {
    return;
  }

  let visited = new Array(10).fill(0);//0-9

  dfs();
  //check every element in the board, if its is empty, put a valid number to it and go dfs and check board again, modify board every time call dfs
  function dfs() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] != '.') {
          continue;
        }

        for (let k = 1; k <= 9; k++) {
          board[i][j] = k.toString();
          if (isValid(i, j) && dfs()) {
            return true;
          }

          board[i][j] = '.';
        }

        return false;
      }
    }

    return true;
  }

  //check the board is solvable, row, column and 3 by 3 submatrix
  /**
   * @return {boolean}
   */
  function isValid(a, b) {
    //row
    visited = [];
    for (let j = 0; j < board[0].length; j++) {
      let element = board[a][j];
      let index = parseInt(element, 10);
      if (visited[index] === 1) {
        return false;
      }

      if (element !== '.') {
        visited[index] = 1;
      }
    }

    // col
    visited = [];
    for (let i = 0; i < board.length; i++) {
      let element = board[i][b];
      let index = parseInt(element, 10);
      if (visited[index] === 1) {
        return false;
      }

      if(element !== '.') {
        visited[index] = 1;
      }
    }

    visited = [];
    for (let m = 0; m < 3; m++) {
      for (let n = 0; n < 3; n++) {
        let x = Math.floor(a / 3) * 3 + m;
        let y = Math.floor(b / 3) * 3 + n;
        let element = board[x][y];
        let index = parseInt(element, 10);
        if (visited[index] == 1) {
          return false;
        }

        if(element !== '.') {
          visited[index] = 1;
        }
      }
    }

    return true;
  }
};

let test1 = [['5', '3', '.', '.', '7', '.', '.', '.', '.'],
             ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
             ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
             ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
             ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
             ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
             ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
             ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
             ['.', '.', '.', '.', '8', '.', '.', '7', '9']];

// console.log(solveSudoku(test1));

/**
Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:

Each of the digits 1-9 must occur exactly once in each row.
Each of the digits 1-9 must occur exactly once in each column.
Each of the the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
Empty cells are indicated by the character '.'.


A sudoku puzzle...


...and its solution numbers marked in red.

Note:

The given board contain only digits 1-9 and the character '.'.
You may assume that the given Sudoku puzzle will have a single unique solution.
The given board size is always 9x9.
 */
/**
 * Leetcode Fundamental: 11/16 Update
 * Failure:
 * Can not think of by myself
 * 
 * Hard to figure out how to share used number array between validRow, validCol and validBox
 * DON'T validate row, col and box in seperate funcs
 * 
 * Runtime: 64 ms
 */
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku2 = function(board) {
  if (board === undefined || board.length === 0 || board[0].length === 0) return;
  
  // Initiate rows, cols and boxes states
  let rows = []; // [i][num]
  let cols = []; // [j][num]
  let boxes = []; // [(i / 3)*3 + (j / 3)][num]
  for (let i = 1; i <= 9; i += 1) {
    rows.push(new Array(10).fill(false)); // <- Use new array in each row to prevent sharing reference
    cols.push(new Array(10).fill(false)); // <- Use new array in each row to prevent sharing reference
    boxes.push(new Array(10).fill(false)); // <- Use new array in each row to prevent sharing reference
  }

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[0].length; j += 1) {
      if (board[i][j] !== ".") {
        let num = String(board[i][j]);

        // Initiate rows, cols and boxes states
        rows[i][num] = true;
        cols[j][num] = true;
        let boxI = Math.floor(i / 3);
        let boxJ = Math.floor(j / 3);
        let boxKey = boxI * 3 + boxJ;
        boxes[boxKey][num] = true;
      }
    }
  }
  
  searchAnswer(board, 0, 0, rows, cols, boxes); // return true if there is an answer, else return false
};

const searchAnswer = (board, i, j, rows, cols, boxes) => {
  if (i === 9) return true;

  // Find next position
  let nextJ = (j + 1) % 9;
  let nextI = (nextJ === 0) ? i + 1 : i; // Next row if j is the last col in the row

  // Skip current Cell if it's not available. Recursive find next valid answer
  if (board[i][j] !== ".") return searchAnswer(board, nextI, nextJ, rows, cols, boxes);

  for (let num = 1; num <= 9; num += 1) {
    let boxI = Math.floor(i / 3);
    let boxJ = Math.floor(j / 3);
    let boxKey = boxI * 3 + boxJ;

    if (!rows[i][num] && !cols[j][num] && !boxes[boxKey][num]) {
      rows[i][num] = true;
      cols[j][num] = true;
      boxes[boxKey][num] = true;
      board[i][j] = String(num);
      // Backtrack
      if (searchAnswer(board, nextI, nextJ, rows, cols, boxes)) return true;

      // Restore to prev states (mirror)
      board[i][j] = ".";
      boxes[boxKey][num] = false;
      cols[j][num] = false;
      rows[i][num] = false;
    }
  }

  return false; // No matched answer
};

solveSudoku2(test1);
console.log(test1);
