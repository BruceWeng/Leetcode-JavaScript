/**
Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.

A region is captured by flipping all 'O's into 'X's in that surrounded region.

Example:

X X X X
X O O X
X X O X
X O X X
After running your function, the board should be:

X X X X
X X X X
X X X X
X O X X
Explanation:

Surrounded regions shouldn’t be on the border, which means that any 'O' on the border of the board 
are not flipped to 'X'. Any 'O' that is not on the border and it is not connected to an 'O' on the 
border will be flipped to 'X'. Two cells are connected if they are adjacent cells connected horizontally 
or vertically.
 */
/**
 * Leetcode Fundamental: 11/27 Update
 * DFS
 * T: O(mn)
 * Runtime: 88 ms
 */
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  if (board === undefined || board.length === 0 || board[0].length === 0) return;
  if (board.length < 2 || board[0].length < 2) return;

  let row = board.length;
  let col = board[0].length;
  // Flip first and last col and its neighbor from 'O' to '*'
  for (let i = 0; i < row; i += 1) {
    if (board[i][0] === 'O') flip(board, i, 0);
    if (board[i][col-1] === 'O') flip(board, i, col-1);
  }

  // Flip first and last row and its neighbor from 'O' to '*'
  for (let j = 0; j < board[0].length; j += 1) {
    if (board[0][j] === 'O') flip(board, 0, j);
    if (board[row-1][j] === 'O') flip(board, row-1, j);
  }

  // Flip all 'O' to 'X' and '*' to 'O'
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < col; j += 1) {
      if (board[i][j] === 'O') board[i][j] = 'X';
      else if (board[i][j] === '*') board[i][j] = 'O';
    }
  }
};

const flip = (board, i, j) => {
  // Not In Area
  if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] !== 'O') return;

  if (board[i][j] === 'O') board[i][j] = '*';

  let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // up right down left
  for (let d of dirs) {
    let nextI = i + d[0];
    let nextJ = j + d[1];
    flip(board, nextI, nextJ);
  }
}

/**
 * Union Find
 * for O in board:
 *   if O is on border: union(dummyBorder, O);
 *   else:
 *     for neighbor of O:
 *       if (neighbor is 'O): union(neighbor, O)
 * 
 * Note: dummyBorder = rows*cols
 * 
 * T: O(mn * DS height) = O(mn*log(m*n))
 * Runtime: 8636 ms
 */
function DisjointSets(board, m, n) {
  var groups = new Array(m*n+1).fill(-1);
  var ranks = new Array(m*n+1).fill(0);

  // Initiate groups
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (board[i][j] === 'O') {
        let index = i * n + j;
        groups[index] = index;
      }
    } 
  }
  groups[m*n] = m * n;

 const find = (index) => {
   if (groups[index] === index) return index;

   return find(groups[index]);
 };

 const union = (index1, index2) => {
   let root1 = find(index1);
   let root2 = find(index2);

   if (root1 === root2) return;

   if (ranks[root1] > ranks[root2]) [[root1, root2], [root2, root1]];

   groups[root1] = root2;
   ranks[root2] = ranks[root1];
 };

 return {
   find,
   union
 }
}
const solve = (board) => {
 if (board === undefined || board.length === 0 || board[0].length === 0) return;
 if (board.length < 2 || board[0].length < 2) return;

 let row = board.length;
 let col = board[0].length;

 let DS = new DisjointSets(board, row, col);
 let dummyBorder = row * col;

 let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
 // For first and last rows and cols, union cellO and dummyBorder
 for (let i = 0; i < row; i += 1) {
   for (let j = 0; j < col; j += 1) {
     if (board[i][j] === 'O') {
       let cellO = i * col + j;
       if (i === 0 || i === row - 1 || j === 0 || j === col - 1) {
         DS.union(dummyBorder, cellO);
         continue;
       }

       // For inner cells, union neighbor and cellO
       for (let d of dirs) {
         let nextI = i + d[0];
         let nextJ = j + d[1];
         // if board[nextI][nextJ] in area and === O, union neighbor and cellO
         if (nextI >= 0 && nextI < row && nextJ >= 0 && nextJ < col && board[nextI][nextJ] === 'O') {
           let neighbor = nextI * col + nextJ;
           DS.union(cellO, neighbor);
         }
       }
     }
   }
 }

 // Flip 'O' to 'X' if DS.find(cell) !== DS.find(dummyBorder)
 for (let i = 0; i < row; i += 1) {
   for (let j = 0; j < col; j += 1) {
     if (board[i][j] === 'O' && DS.find(i * col + j) !== DS.find(dummyBorder)) board[i][j] = 'X';
   }
 }
};

/**
 * BFS
 * 
 * T: O(mn)
 * Runtime: 92 ms
 */
const solve = (board) => {
  if (board === undefined || board.length === 0 || board[0].length === 0) return;
  if (board.length < 2 || board[0].length < 2) return;
 
  let row = board.length;
  let col = board[0].length;

  let queue = [];
  // Put first and last col 'O' cell in queue
  // Put first and last row 'O' cell in queue
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < col; j += 1) {
      if ( ([0, row-1].includes(i) || [0, col-1].includes(j)) && board[i][j] === 'O') queue.push([i, j]);
    }
  }

  let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  // Flip connected 'O' to '*'
  while (queue.length !== 0) {
    let [i, j] = queue.shift();
    if (i >= 0 && i < row && j >= 0 && j < col && board[i][j] === 'O') {
      board[i][j] = '*';
      for (let d of dirs) {
        let nextI = i + d[0];
        let nextJ = j + d[1];
        queue.push([nextI, nextJ]);
      }
    }
  }
  // Flip all 'O' to 'X' and '*' to 'O'
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < col; j += 1) {
      if (board[i][j] === 'O') board[i][j] = 'X';
      else if (board[i][j] === '*') board[i][j] = 'O';
    }
  }
}
