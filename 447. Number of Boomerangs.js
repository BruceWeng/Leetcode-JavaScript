/**
Given n points in the plane that are all pairwise distinct, a "boomerang" is a tuple of points (i, j, k) such that the distance between i and j equals the distance between i and k (the order of the tuple matters).

Find the number of boomerangs. You may assume that n will be at most 500 and coordinates of points are all in the range [-10000, 10000] (inclusive).

Example:
Input:
[[0,0],[1,0],[2,0]]

Output:
2

Explanation:
The two boomerangs are [[1,0],[0,0],[2,0]] and [[1,0],[2,0],[0,0]]
 */
/**
 * Leetcode Fundamental: 11/7 Update
 * Failure:
 * 1. Fail to think of calculate amount by sum of each (value * (value-1))
 * 2. Fail to think of reassign map in first for loop
 * (since distance for each point only matter for itself, map can be reassigned to an empty one)
 * Graphical reference: https://leetcode.com/problems/number-of-boomerangs/discuss/92868/Short-Python-O(n2)-hashmap-solution
 * 
 * T: O(n^2), S: O(n)
 */
/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function(points) {
  // Declare a map
  // let (x1 - x2)^2 + (y1 - y2)^2 be key and freq as value
  let map = new Map();
  let result = 0;
  for (let i = 0; i < points.length; i += 1) {
    map = new Map(); // clear prev map
    
    for (let j = 0; j < points.length; j += 1) {
      if (i === j) continue;
      
      let dist = getDist(points[i], points[j]);
      if (map.has(dist)) map.set(dist, map.get(dist) + 1);
      else map.set(dist, 1);
    }
    
    for (let [key, val] of map) {
      result += val * (val - 1);
    }
  }
  
  return result;
};

const getDist = (point1, point2) => {
  return Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2);
};
