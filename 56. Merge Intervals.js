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
 * Leetcode Fundamental: 12/7 Update
 * 
 * Greedy Solution
 * 
 * T: O(NlogN)
 * S: O(N)
 * Runtime: 76 ms
 */
/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */
var merge = function(intervals) {
  if (intervals === undefined || intervals.length === 0) return [];
  
  intervals.sort((a, b) => a.start - b.start);
  let result = [];
  let prevStart = intervals[0].start;
  let prevEnd = intervals[0].end;
  
  for (let {start, end} of intervals) {
    if (start <= prevEnd) prevEnd = Math.max(prevEnd, end);
    else {
      result.push(new Interval(prevStart, prevEnd));
      prevStart = start;
      prevEnd = end;
    }
  }
  
  result.push(new Interval(prevStart, prevEnd));
  return result;
};