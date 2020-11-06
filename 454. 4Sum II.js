/**
Given four lists A, B, C, D of integer values, compute how many tuples (i, j, k, l) there are such that A[i] + B[j] + C[k] + D[l] is zero.

To make problem a bit easier, all A, B, C, D have same length of N where 0 ≤ N ≤ 500. All integers are in the range of -228 to 228 - 1 and the result is guaranteed to be at most 231 - 1.

Example:

Input:
A = [ 1, 2]
B = [-2,-1]
C = [-1, 2]
D = [ 0, 2]

Output:
2

Explanation:
The two tuples are:
1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
 */
/**
 * Leetcode Fundamental: 2019/11/7 Update
 * Failure:
 * 1. Fail to think of use sum of c and d as key and freq as value in map
 * 2. Fail to times -1 to sum of a and b
 * 
 * T: O(n^2), S: O(n^2)
 */
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
var fourSumCount = function (A, B, C, D) {
  // handle edge case

  // Construct map: key: sum of each value of C and D, value: count 
  // worst case: each sum is unique: S: O(n^2)
  let map = {};
  let result = 0;
  for (let numC of C)
    for (let numD of D) {
      let sumCD = numC + numD;
      if (sumCD in map) map[sumCD] += 1;
      else map[sumCD] = 1;
    }

  for (let numA of A)
    for (let numB of B) {
      let sumAB = (numA + numB) * -1; // Remember to times -1 here!
      if (sumAB in map) result += map[sumAB];
    }

  return result;
};

// 2020/11/5 Update
// let map(sum of a and b, count)
// T: O(n^2)
// S: O(n^2), worst case: all a + b are different
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
var fourSumCount = function (A, B, C, D) {
  let map = new Map();
  let result = 0;
  for (let a of A) {
    for (let b of B) {
      let sum = a + b;
      if (!map.has(sum)) map.set(sum, 1);
      else map.set(sum, map.get(sum) + 1);;
    }
  }
  for (let c of C) {
    for (let d of D) {
      let sum = c + d;
      if (map.has(-sum)) result += map.get(-sum);
    }
  }
  return result;
};