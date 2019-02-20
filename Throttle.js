/**
 * Throttle: we don't allow to our function to execute more than once
 * every X milliseconds.
 *
 * The main difference between this and debouncing is that throttle
 * guarantees the execution of the function regularly, at least every
 * X milliseconds.
 *
 * Example: Infinite scrolling
 */
/**
 * Throttle
 *
 * @param {Function} fn (not necessary be pure function)
 * @param {number} limit ms
 * @return {Function} with a timeout for limit ms delay
 */
const throttle = function(fn, limit) {
  // 1. Initial a waiting flag
  let waiting = false; // aka. in session
  // 2. Return a function receives params with rest parameter ...args
  return (...args) => {
    // 3. Check if the function is not waiting (function not in session)
    if (!waiting) {
      //a. Change the this in fn to current context and execute on args array
      fn.apply(this, args);
      //b. Set waiting to true
      waiting = true;
      //c. Set waiting to false after limit ms
      setTimeout(() => {
        waiting = false;
      }, limit);
    }

    // 4. If the function is waiting, do nothing
  };
};
