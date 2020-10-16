// Solution 1: Line centered
// 1. Find all lines by iterate point[i] and point[j]. There are totally n(n+1)/2 lines.
// 2. Slope is defined by dY and dX, y = ax + b -> dX*y = dY*x + dX*b -> dX*b = dX*y - dY*x
// 3. Count how many points on slope dY, dX with point[k] and update max_value and return max_value
// T: O(n^2) * O(n) = O(n^3)

// Solution 2: Point centered
// 1. Set a map(slope, points count on the line) FOR EACH point[i], map should be cleared before iterate next point[i].
// 2. Consider two case: same_point and precision on division
//   a. locally update max_point by same_point + map.get(getSlope(p1, p2))
//   b. use great common divisor to prevent lookup big dicemal map key
// Prove: A, B, R have same common divisor
// A > B
// A = aX
// B = bX
// A = Bq + r
// r = (a-bq)Xbb
// gcd(A, B) = gcd(B, r) = B when r == 0 or A when B == 0
// 3. Instead using slope(double) as key, using pair (dX/gcd, dY/gcd) as key to prevent big decemal problem
// T: O(n^2), S: O(n) for n-1 slopes (dX/gcd, dY/gcd) for n-1 points in map

/**
 * @param {number[][]} points
 * @return {number}
 */
function maxPoints(points) {
  if (points === undefined) return 0;
  let len = points.length;
  if (points.length < 3) return len;

  let result = 0;
  for (let i = 0; i < len; i++) {
    let same_points = 1, max_points = 0;
    let map = new Map(); // ([dX/d, dY/d]. count)
    for (let j = i + 1; j < len; j++) {
      let p1 = points[i], p2 = points[j];
      if (p1[0] === p2[0] && p1[1] === p2[1]) {
        same_points++;
        continue;
      }
      if (!map.has(getSlope(p1, p2))) {
        map.set(getSlope(p1, p2), 1);
      } else {
        map.set(getSlope(p1, p2), map.get(getSlope(p1, p2)) + 1);
      }
      max_points = Math.max(max_points, map.get(getSlope(p1, p2)));
    }
    result = Math.max(result, max_points + same_points);
  }
  return result;
};

function getSlope(p1, p2) {
  let dX = p2[0] - p1[0], dY = p2[1] - p1[1];
  // horizontal line
  if (dY === 0) return `0, ${p1[1]}`;
  // vertical line
  if (dX === 0) return `${p1[0]}, 0`;
  let d = gcd(dX, dY);
  return `${Math.floor(dX / d)}, ${Math.floor(dY / d)}`;
}

function gcd(a, b) {
  return (b === 0) ? a : gcd(b, a % b);
}