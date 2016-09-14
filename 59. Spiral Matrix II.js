/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push([]);
  }

  let x = 0;
  let y = 0;
  let count = 1;

  while(n > 0) {
    if (n === 1) {
      result[x][y] = count;
      break;
    }


    for (let i = 0; i < n - 1; i++) {
      result[x][y++] = count++;
    }

    for (let i = 0; i < n - 1; i++) {
      result[x++][y] = count++;
    }

    for (let i = 0; i < n - 1; i++) {
      result[x][y--] = count++;
    }

    for (let i = 0; i < n - 1; i++) {
      result[x--][y] = count++;
    }

    x++;
    y++;
    n -= 2;
  }

  return result;
};


console.log(generateMatrix(3));
