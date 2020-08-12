// Pass by value
let grid = Array(5).fill(null).map(() => Array(4).fill(0));
for (let i = 0; i < 5; i += 1) grid[i][0] = 1;
for (let j = 0; j < 4; j += 1) grid[0][j] = 1;
console.log(grid);