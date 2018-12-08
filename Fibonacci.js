/**
 * Fibonacci Series
 * 
 * Input: n, n > 0
 * Output: nth number in fibonacci series
 * 
 * 1. Top-down solution
 * 
 * T: O(2^n)
 * S: O(2^n)
 * 
 * @param {number} n
 * @return {number}
 */
const fibRecursion = function(n) {
  if (n === 1) return 1;
  if (n === 2) return 1;

  return fibRecursion(n - 1) + fibRecursion(n - 2);
}
                                                              //v
console.log(fibRecursion(10)); // 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 

/**
 * 2. Recursion with linear size Memo Solution: (Can not be reduced to linear)
 * 
 * T: O(n)
 * S: O(n)
 */
const fibRecursionMemo = (n, memo={1: 1, 2: 1}) => {
  if (n in memo) return memo[n];

  memo[n] = fibRecursionMemo(n-1, memo) + fibRecursionMemo(n-2, memo);
  return memo[n];
};

console.log(fibRecursionMemo(10)); // 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 

/**
 * 3. Recursion with Memo compose func Solution:
 * 
 * T: O(n)
 * S: O(n)
 */
// const fibRecursion = function(n) {
//   if (n === 1) return 1;
//   if (n === 2) return 1;

//   return fibRecursion(n - 1) + fibRecursion(n - 2);
// };

const memo =(fn) => {
  let memo = {1: 1, 2: 1};
  
  return (n) => {
    if (memo[n]) return memo[n];
    memo[n] = fn(n);
    return memo[n];
  };
};

console.log(memo(fibRecursion)(10)); // 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 
/**
 * 4. Bottom Up DP Solution:
 * 
 * T: O(n)
 * S: O(n) -> O(1)
 */
const fibBottomUpDP = function(n) {
  // 1. Initiate stages array
  let stages = new Array(3).fill(0);
  stages[1] = 1;
  stages[2] = 1;
  if (n <= 2) return stages[n];
    
  // 2. Update state in each stages
  for (let i = 3; i <= n; i += 1) {
    stages[i % 3] = stages[(i - 1) % 3] + stages[(i - 2) % 3];
  }
  
  // 3. Return stage in last stage
  return stages[n % 3];
}

console.log(fibBottomUpDP(10)); // 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 

/**
 * 5. Bottom Up DP with constant variables
 * Reduced version of Solution 4
 * T: O(n)
 * S: O(n) -> O(1)
 */
const fibIteration = function(n) {
  if (n <= 2) return 1;

  let prevOne = 1;  
  let prevTwo = 1;
  let result = 0;

  for (let i = 3; i <= n; i += 1) {
    result = prevOne + prevTwo;
    prevTwo = prevOne;
    prevOne = result;
  }

  return result;
}

console.log(fibIteration(10)); // 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 