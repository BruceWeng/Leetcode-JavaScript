/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
  if (n <= 0) return [];
  let result = [];
  for (let i = 1, fizz = 0, buzz = 0; i <= n; i++) {
    fizz++;
    buzz++
    if (fizz === 3 && buzz === 5) {
      result.push("FizzBuzz");
      fizz = 0;
      buzz = 0;
    } else if (fizz === 3) {
      result.push("Fizz");
      fizz = 0;
    } else if (buzz === 5) {
      result.push("Buzz");
      buzz = 0;
    } else {
      result.push(String(i));
    }
  }
  return result;
};