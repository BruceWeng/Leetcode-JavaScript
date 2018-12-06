/**
 * Array to Matrix Manipulation
 */
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let matrix1 = [];
for (let i = 0; i < 5; i += 1) matrix1.push(new Array(5).fill(0));
let col = 4;

let dirs = [ [-1, 0], [0, 1], [1, 0], [0, -1] ];

for (let i = 0; i < array.length; i += 1) {
  matrix1[Math.floor(i / col)][i % col] = array[i];
}

console.log(matrix1);


let matrix2 = [];
for (let i = 0; i < 5; i += 1) matrix2.push(new Array(5).fill(0));
let a = 2;
let b = 2;
for (let [i, j] of dirs) matrix2[a+i][b+j] = 1;

console.log(matrix2);