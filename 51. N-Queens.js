/**
 * Solution: 玩轉算法
 */
/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = (n) => {
  // Check if Queen is placed at col, dia1, dia2
  let col = new Array(n).fill(false); // column
  let dia1 = new Array(2*n-1).fill(false); // up-right to down-left diagonal
  let dia2 = new Array(2*n-1).fill(false); // up-left to down-right diagonal


  let result = [];
  let row = [];
  putQueen(n, 0, row);

  return result;

  /**
   * Put Queen at index-th in row
   * 
   * @param {number} n 
   * @param {number} index 
   * @param {array} row 
   */
  function putQueen(n, index, row) {
    if (index === n) {
      result.push(generateBoard(n, row));
      return;
    }

    for (let i = 0; i < n; i += 1) {
      if (!col[i] && !dia1[index+i] && !dia2[index-i+n-1]) {
        row.push(i);
        col[i] = true;
        dia1[index+i] = true;
        dia2[index-i+n-1] = true;
        putQueen(n, index+1, row);

        // Backtracking step: restore col, dia1 and dia2 to prev state
        col[i] = false;
        dia1[index+i] = false;
        dia2[index-i+n-1] = false;
        row.pop();
      }
    }
  }

  function generateBoard(n, row) {
    console.assert(row.length == n);
    let board = [];
    for (let i = 0 ; i < n; i += 1) {
      board.push(new Array(n).fill("."));
      board[i][row[i]] = "Q";
      board[i] = board[i].join("");
    }

    return board;
  }
};

console.log(solveNQueens(4));