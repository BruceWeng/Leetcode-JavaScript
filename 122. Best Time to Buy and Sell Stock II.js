/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (prices === null || prices.length === 0) {
    return 0;
  }

  let profit = 0;

  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i + 1] > prices[i]) {
      profit += (prices[i + 1] - prices[i]);
    } 
  }

  return profit;
};

let test1 = [7, 1, 5, 3, 6, 4]; //4+3 = 7
console.log(maxProfit(test1));
