/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function(nums) {
  const n = 10001
  const values = new Array(n).fill(0)
  for(let num of nums) {
    values[num]+=num
  }
  for(let i=2; i<n; i++) {
    values[i] = Math.max(values[i-1], values[i-2]+values[i])
  }
  return values[values.length-1]
};