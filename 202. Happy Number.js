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

/**
 * Leetcode Fundamental: Set, Update 1/21/2019
 */
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    // 1. Use sum of each digits as key of the set
    // 2. Use while loop keep adding new sum to the set
    // 3. If set.has(sum) -> infinite loop, exit while loop, return false
    // 4. If sum === 1, return true
    let set = new Set();
    let sum = calSum(n);
    if (sum === 1) return true;
    
    while (!set.has(sum)) {
      set.add(sum);
      sum = calSum(sum);
      if (sum === 1) return true;
    }
    
    return false;
  };
  
  const calSum = (n) => {
    let sum = 0;
    
    while (n / 10 !== 0) { // no more next quotient
      sum += (n % 10) * (n % 10);
      n = parseInt(n / 10);
    }
    return sum;
  }
