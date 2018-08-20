/**
A city's skyline is the outer contour of the silhouette formed by all the buildings in that city 
when viewed from a distance. Now suppose you are given the locations and height of all the buildings 
as shown on a cityscape photo (Figure A), write a program to output the skyline formed by these 
buildings collectively (Figure B).

Buildings  Skyline Contour
The geometric information of each building is represented by a triplet of integers [Li, Ri, Hi], 
where Li and Ri are the x coordinates of the left and right edge of the ith building, respectively, 
and Hi is its height. It is guaranteed that 0 ≤ Li, Ri ≤ INT_MAX, 0 < Hi ≤ INT_MAX, and Ri - Li > 0. 
You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height 0.

For instance, the dimensions of all buildings in Figure A are recorded as: [ [2 9 10], [3 7 15], 
[5 12 12], [15 20 10], [19 24 8] ] .

The output is a list of "key points" (red dots in Figure B) in the format of [ [x1,y1], [x2, y2], 
[x3, y3], ... ] that uniquely defines a skyline. A key point is the left endpoint of a horizontal 
line segment. Note that the last key point, where the rightmost building ends, is merely used to 
mark the termination of the skyline, and always has zero height. Also, the ground in between any 
two adjacent buildings should be considered part of the skyline contour.

For instance, the skyline in Figure B should be represented as:[ [2 10], [3 15], [7 12], [12 0], 
[15 10], [20 8], [24, 0] ].

Notes:

The number of buildings in any input list is guaranteed to be in the range [0, 10000].
The input list is already sorted in ascending order by the left x position Li.
The output list must be sorted by the x position.
There must be no consecutive horizontal lines of equal height in the output skyline. For instance, 
[...[2 3], [4 5], [7 5], [11 5], [12 7]...] is not acceptable; the three lines of height 5 should 
be merged into one in the final output as such: [...[2 3], [4 5], [12 7], ...]
 */
/**
 * Algorithm: https://briangordon.github.io/2014/08/the-skyline-problem.html
 * 1. Construct a 1D heightmap storing the height on each indecies
 * 
 *      for each rectangle r:
 *        for each heightmap cell c starting at r.left and ending at r.right:
 *          c gets the max of r.height and the previous value of c
 * 
 * 2. We can see from the animation that the skyline constructed from the heightmap isn’t quite 
 *    correct. The edges of the rectangles don’t line up perfectly with the array cells, so there 
 *    is a small amount of error in the shape of the skyline.
 * 
 * 3. The running time of your algorithm depends not only on the number of given rectangles, but 
 *    also on the resolution of the output image.
 * 
 * 4. the only time the skyline can change its y position is at the left or right side of a rectangle. 
 *    It’s clear now that if we find the height of the skyline at each of these “critical points” on 
 *    the x axis then we will have completely determined the shape of the skyline. At each critical point, 
 *    you just go up or down to the new height and draw a line segment to the right until you reach the 
 *    next critical point.
 * 
 * 5. Instead of printing the rectangles onto a heightmap array with an entry for each pixel, let’s 
 *    print the rectangles onto an array with an entry for each critical point! This will eliminate the 
 *    problem of dealing with too many points, because we’re now dealing with the minimum number of points 
 *    necessary to determine the skyline.
 * 
 * 6. for each rectangle r:
 *      for each critical point c:
 *        if c.x >= r.left && c.x < r.right:
 *          c.y gets the max of r.height and the previous value of c.y
 *    T: O(n^2)
 * 
 * 7. We don’t really need to look at every critical point when printing a rectangle, but rather only 
 *    those critical points below the rectangle in question.
 * 
 *    for each rectangle r:
 *      for each critical point c below r (except the one at r.right):
 *        c.y gets the max of r.height and the previous value of c.y
 *    T: Still O(n^2)
 * 
 * 8. What if, instead of looking at each critical point for each rectangle, we look at each rectangle 
 *    for each critical point? This is the same code as before, with the loops switched:
 * 
 *    for each critical point c:
 *      for each rectangle r:
 *        if c.x >= r.left && c.x < r.right:
 *          c.y gets the max of r.height and the previous value of c.y
 * 9. Again, we don’t really need to consider all rectangles, only the ones above the critical point in question:
 * 
 *    for each critical point c:
 *      for each rectangle r above c (not including the right edge of rectangles):
 *        c.y gets the max of r.height and the previous value of c.y
 * 
 * 10. Given a critical point, how do we efficiently find all of the rectangles above it?
 *      a. We begin at the critical point and go left looking for left edges, and also go right 
 *         looking for right edges, and then intersect the two sets of rectangles T: O(n^2)
 *      b. A better approach is to simply scan across the skyline’s sorted critical points from left to 
 *         right, keeping track of an active set of rectangles as you go. When you reach a critical point, 
 *        the active set is updated and then the critical point gets assigned a copy of the current active 
 *        set of rectangles. By the end of the pass, each critical point will know about all of the rectangles above it.
 *        
 *        Calculating the tallest rectangle over c in O(n)
 *        for each critical point c
 *          c.y gets the height of the tallest rectangle over c 
 * 
 *        Total Time: O(n*n)
 * 11. Optimization: Using Heap to find the tallest ractangle in O(logn)
 * 12. Overall algorithm:
 *      a. Sort the critical points
 *      b. Scan across the critical points from left to right
 *      c. When we encounter the left edge of a rectangle, we add that rectangle to the heap with its height as key
 *      d. When we encounter the right edge of a rectangle, we remove the rectangle from the heap
 *        (This requires keeping external pointers into the heap)
 *      e. At anytime we encounter a critical point, after updating the heap,  we set the height of that critical point
 *         to the value peeked from the top of the heap
 * 
 *      Total Time: O(nlogn), Space: O(n)
 */
/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
let getSkyline = function(buildings) {
  let result = [];
  let heights = [];
  for (let b of buildings) {
    // start point has negative height value
    heights.push([b[0], -b[2]]);
    // end point has normal height value
    heights.push([b[1], b[2]]);
  }

  // sort heights, based on the first value, if necessary, use the second to
  // break ties
  heights.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];

    return a[1] - b[1];
  });

  // Use a maxHeap to store possible heights
  let maxHeap = new Heap((a, b) => b - a);

  // Provide a initial value to make it more consistent
  maxHeap.push(0);

  // Before starting, the previous max height is 0;
  let prev = 0;

  // visit all points in order
  for (let h of heights) {
    // a start point, add height
    if (h[1] < 0) maxHeap.push(-h[1]);
    // a end point, remove height
    else maxHeap.remove(h[1]);
    
    // current max height
    let curr = maxHeap.peek() === null ? 0 : maxHeap.peek();
      
    // compare current max height with previous max height, update result and 
    // previous max height if necessary
    if (prev !== curr) {
      result.push([h[0], curr]);
      prev = curr
    }
  }
  return result;
};
