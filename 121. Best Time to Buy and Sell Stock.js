/**
 * Note:
 *  1. Let min = Number.MAX_SAFE_INTEGER
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (prices === null || prices.length === 0) {
    return 0;
  }

  let min = Number.MAX_SAFE_INTEGER;
  let profit = 0;
  for (let price of prices) {
    if (price <= min) {
      min = price;
    }

    if (price - min > profit) {
      profit = price - min;
    }
  }

  return profit;
};

let test1 = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(test1));
