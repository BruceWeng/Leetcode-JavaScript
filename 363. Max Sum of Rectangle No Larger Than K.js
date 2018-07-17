/**
Given a non-empty 2D matrix matrix and an integer k, find the max sum 
of a rectangle in the matrix such that its sum is no larger than k.

Example:
Given matrix = [
  [1,  0, 1],
  [0, -2, 3]
]
k = 2
The answer is 2. Because the sum of rectangle [[0, 1], [-2, 3]] is 2 and 
2 is the max number no larger than k (k = 2).

Note:
The rectangle inside the matrix must have an area > 0.
What if the number of rows is much larger than the number of columns?
 */
/**
 * Algorithm: Maximum Sum Rectangular Submatrix in Matrix + Max Subarray Sum no more than K
 * 0. There is no TreeSet in JS, try to use mergesort to solve this question
 * 1. MergeSort to get sum no larger than k with recursion function mergeSort(sum: number[], start: number, end: number, k: number)
 * 2. Come back and check https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/discuss/83595/JAVA-117ms-beat-99.81-merge-sort
 * 
 * 
 * T: min(M, N)^2 * max(M, N) * log(max(M, N))
 * S: max(M, N)
 */
/**
 * @param {number[][]} matrix
 * @param {number} K
 * @return {number}
 */
const maxSumSubmatrix = function(matrix, k) {
    let m = matrix.length;
    let n = matrix[0].length;
    let result = Number.MIN_SAFE_INTEGER;
    let sum = new Array(m+1).fill(0);

    for (let i = 0; i < n; i += 1) {
        let sumInRow = new Array(m).fill(0);
        for (let j = i; j < n; j += 1) {
            for (let p = 0; p < m; p += 1) {
                sumInRow[p] += matrix[p][j];
                sum[p+1] = sum[p] + sumInRow[p];
            }

            result = Math.max(result, mergeSort(sum, 0, m+1, k));
            if (result === k) return k;
        }
    }

    return result;
}

const mergeSort = function(sum, start, end, k) {
    if (end === start+1) return Number.MIN_SAFE_INTEGER;
    let mid = start + Math.floor((end - start) / 2);
    let count = 0;
    let result = mergeSort(sum, start, mid, k);
    if (result === k) return k;

    result = Math.max(result, mergeSort(sum, mid, end, k));

    if (result === k) return k;

    let cache = new Array(end-start).fill(0);

    for (let i = start, j = mid, p = mid; i < mid; i += 1) {
        while (j < end && sum[j] - sum[i] <= k) j += 1;

        if (j-1 >= mid) {
            result = Math.max(result, Math.floor(sum[j-1]-sum[i]));
            if (result === k) return k;
        }

        while (p < end && sum[p] < sum[i]) {
            cache[count] = sum[p];
            count += 1;
            p += 1;
        }

        cache[count] = sum[i];
        count += 1
    }
    for (let i = 0; i < count; i += 1) {
        sum[start] = cache[i];
        start += 1;
    }
    return result;
}
