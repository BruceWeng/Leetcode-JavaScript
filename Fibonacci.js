/**
 * Fibonacci Series
 * 
 * Input: n, n > 0
 * Output: nth number in fibonacci series
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

const fibBottomUpDP = function(n) {
  // 1. Initiate stages array
  let stages = new Array(n + 1).fill(0);
  stages[0] = 0;
  stages[1] = 1;
  stages[2] = 1;
  if (n <= 2) return stages[n];
    
  // 2. Update state in each stages
  for (let i = 3; i <= n; i += 1) {
    stages[i] = stages[i - 1] + stages[i - 2];
  }
  
  // 3. Return stage in last stage
  return stages[n];
}

console.log(fibBottomUpDP(10)); // 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 

