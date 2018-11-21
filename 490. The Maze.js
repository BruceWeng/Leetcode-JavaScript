/**
There is a ball in a maze with empty spaces and walls. The ball can go through empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.

Given the ball's start position, the destination and the maze, determine whether the ball could stop at the destination.

The maze is represented by a binary 2D array. 1 means the wall and 0 means the empty space. You may assume that the borders of the maze are all walls. The start and destination coordinates are represented by row and column indexes.

 

Example 1:

Input 1: a maze represented by a 2D array

0 0 1 0 0
0 0 0 0 0
0 0 0 1 0
1 1 0 1 1
0 0 0 0 0

Input 2: start coordinate (rowStart, colStart) = (0, 4)
Input 3: destination coordinate (rowDest, colDest) = (4, 4)

Output: true

Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.

Example 2:

Input 1: a maze represented by a 2D array

0 0 1 0 0
0 0 0 0 0
0 0 0 1 0
1 1 0 1 1
0 0 0 0 0

Input 2: start coordinate (rowStart, colStart) = (0, 4)
Input 3: destination coordinate (rowDest, colDest) = (3, 2)

Output: false

Explanation: There is no way for the ball to stop at the destination.

 

Note:

There is only one ball and one destination in the maze.
Both the ball and the destination exist on an empty space, and they will not be at the same position initially.
The given maze does not contain border (like the red rectangle in the example pictures), but you could assume the border of the maze are all walls.
The maze contains at least 2 empty spaces, and both the width and height of the maze won't exceed 100.
 */
/**
 * Leetcode Fundamental: 11/19 Update
 * 79. Word Search Board Search Pattern
 * 0. Handle edge case
 * 1. 2 Nested for loop to iterate each cell
 * 2. if search(board, target, i, j): return true, outside of for loops: return false
 * 3. search(board, target, i, j):
 *   3.a find target case: return true
 *   3.b notInArea case: return false
 *   3.c reserve board[i][j], mark board[i][j] state
 *   3.d if (up || right || down || left) return true;
 *   3.e restore board[i][j] state if need to backtracking
 *   3.f return false
 */
const hasPath = (maze, start, destination) => {
  // 0. Handle edge case
  if (maze === undefined || start === undefined || destination === undefined ||
      maze.length === 0 || maze[0].length === 0 || start.length < 2 || destination.length < 2) return false;
  // 2. search func
  return search(maze, start, destination);
};

const search = (maze, current, destination) => {
  let i = current[0];
  let j = current[1];
  // 3.a Target found
  if (i === destination[0] && j === destination[1]) return true;

  // 3.b Not in area (Will not fall in this case)
  // if (i < 0 || i >= maze.length || j < 0 || j >= maze[0].length) return false;
  
  // Handle case that cell visited
  if (maze[i][j] === 2) return false;

  // 3.c Mark visited at board[i][j] = 2
  maze[i][j] = 2;

  // 3.d find THE MOST EDGE CELL form current index （IMPORTANT!)
  // Make sure every start point from the edge cell
  // Becareful of the boundary
  let up = i;
  while (up > 0 && maze[up-1][j] !== 1) up -= 1;

  let right = j;
  while (right < maze[0].length - 1 && maze[i][right+1] !== 1) right += 1;

  let down = i;
  while (down < maze.length - 1 && maze[down+1][j] !== 1) down += 1;
  
  let left = j;
  while (left > 0 && maze[i][left-1] !== 1) left -= 1;
  
  if (search(maze, [up, j], destination) ||
      search(maze, [i, right], destination) ||
      search(maze, [down, j], destination) ||
      search(maze, [i, left], destination))
      return true;  
  
  // Match failed
  return false;
};
