// let nums.length = m
// let largest num.length = n
// Time: O(m*nlogn)
// Space: O(m)
/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  if (nums.length === 0 || nums === undefined) return "";
  let result = nums.map(num => String(num)) // O(m)
    .sort((a, b) => { // O(nlogn)
      return Number(b + a) - Number(a + b);
    });
  if (result[0] === "0") return "0";
  return result.join("");
};