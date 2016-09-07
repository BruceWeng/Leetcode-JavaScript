/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  let result = new Array();
  let position = new Array();
  dfs(1);
  return result;

  function dfs(row) {
    if (row === n + 1) {
      let temp = new Array();
      for (let i = 1; i < n + 1; i++) {
        let str = '';
        for (let j = 1; j < n + 1; j++) {
          if (position[i] === j) {
            str += 'Q';
          } else {
            str += '.';
          }
        }

        temp.push(str);
      }

      result.push(temp);
      return;
    }

    for (let i = 1; i < n + 1; i++) {
      if (!isValid(row, i)) {
        continue;
      }

      position[row] = i;
      dfs(row + 1, n);
    }
  }

  function isValid(row, col) {
    for (let i = 1; i < row; i++) {
      if (Math.abs(i - row) === Math.abs(position[i] - col)) {
        return false;
      }

      if (col === position[i]) {
        return false;
      }
    }

    return true;
  }
};

console.log(solveNQueens(4));
