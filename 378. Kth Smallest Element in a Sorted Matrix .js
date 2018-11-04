/**
Given a n x n matrix where each of the rows and columns are sorted in ascending order, find the kth smallest element in the matrix.

Note that it is the kth smallest element in the sorted order, not the kth distinct element.

Example:

matrix = [
   [ 1,  5,  9],
   [10, 11, 13],
   [12, 13, 15]
],
k = 8,

return 13.
Note: 
You may assume k is always valid, 1 ≤ k ≤ n2.
 */
/**
 * Leetcode Fundamental: 10/31 Update
 * 
 * Failure:
 * Fail to think of using extra variable count to track the amount of elements < k
 * 
 * Gain from DingDing:
 * 1. Always think about the limitation
 * 2. Find the condition boundary that this algorithm works
 * T: max(O(nlogn), O(nlog(max - min)), S: O(1), Binary Search base on int
 */
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(matrix, k) {
  // 1. Handle edge case: matrix is undefined or k is undefined
  // 2. Handle edge case: empty matrix or empty row
  // 3. Search range: smallest element matrix[0][0] as start and largest element matrix[m][n] as end (inclusive [start, end]: while true condition: start <= end)
  // 3.1 mid not necessary be one of the element in the matrix, but we can still find number of elements that < mid
  // 3.2 Declare count(number of elements < mid)used for compare with k. After find the mid, traverse the matrix start from top-right element
  // 3.3 if matrix[row][col] < mid: count += col + 1 (index + 1 as number of elements), row += 1 <- won't work, need to handle matrix[row][col] > mid case first
  // 3.4 else while (col >= 0 && matrix[row][col] > mid) col -= 1
  // 3.5 count += col + 1
  // 4. return start (why we can ensure start is in matrix?)
  
  if (matrix === undefined || k === undefined) return 0;
  
  if (matrix.length === 0 | matrix[0].length === 0) return 0;
  
  let m = matrix.length;
  let n = matrix[0].length;
  let start = matrix[0][0];
  let end = matrix[m-1][n-1];
  
  while (start <= end) {
    console.log(`start: ${start}`);
    console.log(`end: ${end}`);
    let mid = start + Math.floor((end - start) / 2);
    console.log(`mid: ${mid}`);
    let count = 0;
    let col = n - 1;
    
    for (let row = 0; row < m; row += 1) {
      // Handle matrix[row][col] > mid case: find next smaller element
      // This line will only be execute if we find the right row
      while(col >= 0 && matrix[row][col] > mid) col -= 1;
      // Increment count anyway no matter:
      // 1. the amount of entire row
      // 2. number of elements <= mid in specific row
      count += col + 1;
      console.log(`row: ${row}`);
      console.log(`col: ${col}`);
      console.log(`count: ${count}`);
      console.log(`----------`);
    }
    
    // Handle case that need to move start bound
    if (count < k) {
      console.log(`count < k: start = mid + 1`);
      start = mid + 1;
    }
    // Handle case that needto move end bound
    else {
      console.log(`count >= k: end = mid - 1`);
      end = mid - 1;
    }
  }
  
  return start;
};

const test = [[1, 5], [5, 5], [6, 6]];
const k = 3;
const test1 = [[1, 5, 8],
               [20, 26, 29],
               [33, 9936, 10000]];
const k1 = 8;
const test2 = [[1, 5, 8],
               [7, 26, 29],
               [24, 9936, 10000]];
const k2 = 8;
console.log(kthSmallest(test2, k2));