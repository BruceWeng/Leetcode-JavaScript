/**
 * The Debounce technique allow us to "group" multiple sequential calls
 * in a single one.
 * Two kinds of debounce:
 * a. trailing: event triggered when no following input fires after trailing time
 * b. leading(immediate): event triggered at the time first input fired and
 *    holding the events in the following trailing time
 *
 * Example: Autocomplete, Ajax after keypress in form
 * https://codeburst.io/throttling-and-debouncing-in-javascript-646d076d0a44
 */
/**
 * Debounce
 *
 * @param {Function} fn (not necessary be pure function)
 * @param {number} delay ms
 * @return {Function} with a timeout for limit ms delay
 * keeping the trigger rate at exactly 0 until a period of calm, and then triggering the listener exactly once.
 */
const debounce = function(fn, delay) {
  let timerId;
  return (...args) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
};
