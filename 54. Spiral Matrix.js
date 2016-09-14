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
