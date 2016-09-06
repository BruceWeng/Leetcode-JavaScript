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

console.log(solveSudoku(test1));
