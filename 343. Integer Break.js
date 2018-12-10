/**
Given a positive integer n, break it into the sum of at least two positive integers
and maximize the product of those integers. Return the maximum product you can get.

For example, given n = 2, return 1 (2 = 1 + 1); given n = 10, return 36 (10 = 3 + 3 + 4).

Note: You may assume that n is not less than 2 and not larger than 58.
 */
/**
 * Leetcode Fundamental: 12/10 Update
 * Algorithm: DP and Math
 * Failure: 
 * Fail to think of the "magic number" 3
 * 
 * I use a function to express this product: f=x(N-x)
 * 
 * When x=N/2, we get the maximum of this function.
 * 
 * However, factors should be integers. Thus the maximum is (N/2)*(N/2) when N is even or (N-1)/2 *(N+1)/2 when N is odd.
 * 
 * When the maximum of f is larger than N, we should do the break.
 * 
 * (N/2)*(N/2)>=N, then N>=4
 * 
 * (N-1)/2 *(N+1)/2>=N, then N>=5
 * 
 * These two expressions mean that factors should be less than 4, otherwise we can do the break and get a better product. The factors in last result should be 1, 2 or 3. Obviously, 1 should be abandoned. Thus, the factors of the perfect product should be 2 or 3.
 * 
 * The reason why we should use 3 as many as possible is
 * 
 * For 6, 3 * 3>2 * 2 * 2. Thus, the optimal product should contain no more than three 2.
 * 
 * T: O(n), S: O(1)
 * Runtime: 48 ms
 */
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
  if (n === 2) return 1;
  if (n === 3) return 2;
  if (n === 4) return 4;
  
  let stages = [2, 3, 4]; // [2, 3, 4]: index 5, 6, 7
  for (let i = 5; i <= n; i += 1) stages[(i - 2) % 3] = stages[(i - 2) % 3] * 3; // stages[i] = stages[i-3] * 3
  
  return stages[(n - 2) % 3];
};
