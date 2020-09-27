/**
Given a collection of intervals, merge all overlapping intervals.

Example 1:

Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
Example 2:

Input: [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 */
/**
 * Leetcode Fundamental: 12/7 Update, 2020/9/27 Update
 * 
 * Greedy Solution
 * 
 * T: O(NlogN)
 * S: O(N)
 * Runtime: 76 ms
 */
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (intervals === undefined || intervals.length === 0) return [];
  let result = [];
  intervals.sort((a, b) => a[0] - b[0]);
  let prevInterval = intervals[0];
  for (let i = 1; i < intervals.length; i++) {
    if (prevInterval[1] >= intervals[i][0]) {
      prevInterval[1] = Math.max(prevInterval[1], intervals[i][1]);
    } else {
      result.push(prevInterval);
      prevInterval = intervals[i];
    }
  }
  result.push(prevInterval);
  return result;
};