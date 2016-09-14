/**
 * Note:
 *  1. Iterate 1/4 elements and replace in-place
 *  2. Be careful the boudary: row -> n/2, col: (n+1)/2 (Odd + 1, Even remain half)
 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  if (matrix === null || matrix.length === 0 || matrix.length === 1) {
    return matrix;
  }

  let n = matrix.length;

  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < Math.floor((n + 1) / 2); j++) {
      temp = matrix[i][j];
      matrix[i][j] = matrix[n - j - 1][i];
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
      matrix[j][n - i - 1] = temp;
    }
  }

  return matrix;
};

let test1 = [[1, 2], [3, 4]];
console.log(rotate(test1));
