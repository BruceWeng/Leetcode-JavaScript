/**
 * @param {number} N
 * @return {number}
 */
var fib = function (N) {
  let result = new Array(N + 1).fill(0);
  result[0] = 0;
  result[1] = 1;
  for (let i = 2; i < N + 1; i += 1) result[i] = result[i - 1] + result[i - 2];
  return result[N];
};