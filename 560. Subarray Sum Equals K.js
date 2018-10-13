/**
Given an array of integers and an integer k, you need to find the total number of 
continuous subarrays whose sum equals to k.

Note:
The length of the array is in range [1, 20,000].
The range of numbers in the array is [-1000, 1000] and the range of the integer k is [-1e7, 1e7].
 */
/**
 * Algorithm: PrefixSum + 2 Sum using Hash
 * 1. Create prefix sum by hashMap<sum[0, i-1], frequency>
 * 2. sum[i, j] = sum[0, j] - sum[0, i-1] --> sum[0, i-1] = sum[0, j] - sum[i, j]
 *        k          sum      hashMap-key     hashMap-key      sum          k
 * 3. Why don't map.put(sum[0, i - 1], 1) every time ?
        if all numbers are positive, this is fine
        if there exists negative number, there could be preSum frequency > 1
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const subarraySum = function(nums, k) {
  if (nums.length === 0) return 0;

  let map = new Map();
  map.getOrDefault = function(key, defaultVal) {
    if (map.has(key)) return map.get(key);
    else map.set(key, defaultVal);
    return defaultVal;
  }

  let sum = 0;
  let result = 0;
  map.set(0, 1);
  
  for (num of nums) {
    sum += num;
    if (map.has(sum - k)) {// there exist a key, that [hashmap-key = sum - k]
      result += map.get(sum - k);
    }
    map.set(sum, map.getOrDefault(sum, 0) + 1);
  }
  return result;
};

console.log(subarraySum([1,1,1], 2)); // 2