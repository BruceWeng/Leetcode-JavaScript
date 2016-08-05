/**
 * Note:
 * 1. Seperate getNextNumber and isHappy while loop
 */
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    let set = new Set();
    while (n !== 1) {
        if (set.has(n)) {
            return false;
        }

        set.add(n);
        n = getNextNumber(n);
    }

    return true;
};

/**
 * @param {integer} n
 * @return {integer}
 */
function getNextNumber(n) {
    let sum = 0;
    while (n !== 0) {
        sum += Math.pow(n % 10, 2);
        n = Math.floor(n / 10);
    }

    return sum;
}
