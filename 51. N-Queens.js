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

/**
 * Leetcode Fundamental: 11/16 Update
 * Board Search
 * 
 * Failure:
 * Can not think of by myself
 * Find dia1 and dia2 patterns by examples
 * 
 * dia1 (3*3): 5 examples
 *    0, 1, 2
 * 0 [Q, Q, Q]
 * 1 [Q, Q, Q]
 * 2 [Q, Q, Q]
 * ex1: [0, 0] 
 *   idx + i = 0
 * ex2: [0, 1], [1, 0]
 *   idx + i = 1
 * ex3: [0, 2], [1, 1], [2, 0] 
 *   idx + i = 2
 * ex4: [1, 2], [2, 1]
 *   idx + i = 3
 * ex5: [2, 2]
 *   idx + i = 4
 * 
 * dia2 (3*3): 5 examples
 *    0, 1, 2
 * 0 [Q, Q, Q]
 * 1 [Q, Q, Q]
 * 2 [Q, Q, Q]
 * ex1: [0, 2]
 *   idx - i + (n - 1) = 4
 * ex2: [0, 1], [1, 2] 
 *   idx - i + (n - 1) = 3
 * ex3: [0, 0], [1, 1], [2, 2]
 *   idx - i + (n - 1) = 2
 * ex4: [1, 0], [2, 1]
 *   idx - i + (n - 1) = 1
 * ex5: [2, 0]
 *   idx - i + (n - 1) = 0
 * 
 * T: O(n^n * n^2), 
 * 1st n: n rows
 * 2nd n: recursion depth
 * 3rd n^2: generateBoard
 * Runtime: 72 ms
 */
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  if (n === undefined || n === 0) return [];
  
  let col = new Array(n).fill(false);
  let dia1 = new Array(2 * n - 1).fill(false); // up-right -> down-left
  let dia2 = new Array(2 * n - 1).fill(false); // up-left -> down-right
  
  let result = [];
  let row = [];
  putQueen(n, 0, row, col, dia1, dia2, result); // Put Queen at idx-th in row
  
  return result;
};

const putQueen = (n, idx, row, col, dia1, dia2, result) => {
  if (idx === n) {
    result.push(generateBoard(n, row)); // return a board with rows of Queen
    return;
  }
  
  // Search Valid Queen
  for (let i = 0; i < n; i += 1) {
    // Do recursion only if all checks pass
    if (!col[i] && !dia1[idx + i] && !dia2[idx - i + (n - 1)]) {
      row.push(i);
      col[i] = true;
      dia1[idx + i] = true;
      dia2[idx - i + (n - 1)] = true;
      putQueen(n, idx + 1, row, col, dia1, dia2, result);
      
      // Backtrack(mirror)
      dia2[idx - i + (n - 1)] = false;
      dia1[idx + i] = false;
      col[i] = false;
      row.pop();
    }
  }
};

const generateBoard = (n, row) => {
  console.assert(row.length === n);
  let board = [];
  for (let i = 0; i < n; i += 1) {
    board.push(new Array(n).fill("."));
    board[i][row[i]] = "Q";
    board[i] = board[i].join(""); // convert row array to row string
  }
  return board;
};