/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  let result = [];
  if (matrix === null || matrix.length === 0 || matrix[0].length === 0) {
    return result;
  }

  let row = matrix.length;
  let col = matrix[0].length;
  let x = 0;
  let y = 0;

  while (row > 0 && col > 0) {

    if (row === 1) {
      for (let i = 0; i < col; i++) {
        result.push(matrix[x][y++]);
      }

      break;
    } else if (col === 1) {
      for (let i = 0; i < row; i++) {
        result.push(matrix[x++][y]);
      }

      break;
    }
    for (let i = 0; i < col - 1; i++) {
      result.push(matrix[x][y++]);
    }

    for (let i = 0; i < row - 1; i++) {
      result.push(matrix[x++][y]);
    }

    for (let i = 0; i < col - 1; i++) {
      result.push(matrix[x][y--]);
    }

    for (let i = 0; i < row - 1; i++) {
      result.push(matrix[x--][y]);
    }

    row -= 2;
    col -= 2;
    x++;
    y++;
  }

  return result;
};

let test1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

console.log(spiralOrder(test1));

/**
 * Leetcode Explore: 1/14/2019 Update
 * Runtime: 68 ms
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  if (matrix === undefined || matrix.length === 0) return [];
  let result = [];
  
  // coordinate order:
  // Use range as count number: m, n
  // a. [0, 0] -> [0, 1] -> [0, 2] -> (row, col in [start, end - 1])
  // b. [0, 3] -> [1, 3] -> (row in [start, end - 1], col)
  // c. [2, 3] -> [2, 2] -> [2, 1] -> (row, col in [end, start + 1])
  // d. [2, 0] -> [1, 0] -> (row in [end, start + 1])
  // m -= 2, n -= 2
  // a. [1, 1] -> [1, 2] 
  
  // Corner case: one row, m === 1
  // [0, 0] -> [0, 1] -> [0, 2]
  
  // Corner case: one col, n === 1
  // [0, 0] -> [1, 0] -> [2, 0]
  
  // Pattern: range row in [start...end], Initial: start = 0, end = m-1, then: start += 1, end -= 1,
  //          range col in [start...end], Initial: start = 0, end = n-1, then: start += 1, end -= 1
  // 
  let m = matrix.length;
  let n = matrix[0].length;
  let x = 0;
  let y = 0;
  
  while (m > 0 && n > 0) {
    // Corner case: one row
    if (m === 1) {
      for (let j = 0; j < n; j += 1) {
        result.push(matrix[x][y]);
        y += 1;
      }
      break;
    } 
    // Corner case: one col
    else if (n === 1) {
      for (let i = 0; i < m; i += 1) {
        result.push(matrix[x][y]);
        x += 1;
      }
      break;
    }
    
    // a.
    for (let j = 0; j < n - 1; j += 1) result.push(matrix[x][y++]);
    // b.
    for (let i = 0; i < m - 1; i += 1) result.push(matrix[x++][y]);
    // c. 
    for (let j = 0; j < n - 1; j += 1) result.push(matrix[x][y--]);
    // d.
    for (let i = 0; i < m - 1; i += 1) result.push(matrix[x--][y]);
    
    m -= 2;
    n -= 2;
    // Update cell starting point: [0, 0] -> [1, 1] ->...
    x += 1;
    y += 1;
  }
  
  return result;
};