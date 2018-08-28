/**
 * Function passed in memoize function needs to be pure function: ex fibonacii
 * Pure function: When we have same input, we always has the same output.
 * 
 * Application: React/Redux reselect use a memoized selector to ensure that calculation
 * only happen when a change happens in a related part of the state tree.
 */
/**
 * Memoize
 * 
 * @param {Function} pure function
 * @return {Function}
 */
const memoize = function(fn) {
  // 1. Declare a cache
  let cache = {};
  // 2. Return a function receives params with rest parameter ...args
  return (...args) => {
    // 3. Spreading args, in this case, there is only one parameter
    let n = args[0];
    // 4. If calculated, return value from cache
    if (n in cache) { // <- for in convert the key n into 'string'
      return cache[n];
    } 
    // 5. If not calculated, use fn to calculate and store the value in cache
    else {
      let value = fn(n);
      cache[n] = value;
      return value;
    }
  }
}