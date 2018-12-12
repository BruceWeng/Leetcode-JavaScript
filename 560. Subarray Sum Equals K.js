/**
Given an array of integers and an integer k, you need to find the total number of 
continuous subarrays whose sum equals to k.

Note:
The length of the array is in range [1, 20,000].
The range of numbers in the array is [-1000, 1000] and the range of the integer k is [-1e7, 1e7].
 */
/**
 * Algorithm: PrefixSum + 2 Sum using Hash
 * 1. Create prefix sum by hashMap<sum[0, i-1], count>
 * 2. sum[i, j] = sum[0, j] - sum[0, i-1] --> sum[0, i-1] = sum[0, j] - sum[i, j]
 *        k          sum      hashMap-key     hashMap-key      sum          k
 * 3. Why don't map.put(sum[0, i - 1], 1) every time ?
        if all numbers are positive, this is fine
        if there exists negative number, there could be preSum count > 1
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

/**
 * Leetcode Fundamental: 11/8 Update
 * Failure:
 * 1. Fail to think of using hashmap storing count
 * 2. Fail to use only one variable preSum to store prefix sum(rather than prefixSum[])
 * 
 * T: O(n)
 * S: O(n)
 */
const subarraySum = (nums, k) => {
  if (nums === undefined || nums.length === 0 || k === undefined) return 0;

  let map = {
    0: 1 // key: preSum, value: count
  }; 

  let preSum = 0;
  let result = 0;
  for (let num of nums) {
    preSum += num;
    // Update result
    if ((preSum - k) in map) result += map[preSum - k];
    // Update map
    if (!(preSum in map)) map[preSum] = 1;
    else map[preSum] += 1;
  }

  return result;
};

/**
 * Leetcode Fundamental: 12/12 Revisited
 * Brute Force: Iterate from 0 to n-1 to find sum of subarray == k and update result
 * 
 * T: O(n^3)
 * S: O(1)
 * 
 * Runtime: TLE
 * 
 */
const subarraySum = (nums, k) => {
  if (nums === undefined || nums.length === 0 || k === undefined) return 0;
  
  let n = nums.length;
  let result = 0;
  for (let i = 0; i < n; i += 1) { // start index of subarray
    for (let j = i+1; j <= n; j += 1) { // end index of subarray (exclude!!!)
      let sum = 0;
      for (let k = i; k < j; k += 1) sum += nums[k];
      if (sum === k) result += 1;
    }
  }

  return result;
};

/**
 * Reduced Brute Force
 * Add the sum of subarray in end index loop
 * 
 * T: O(n^2)
 * S: O(1)
 * Runtime: 304 ms
 */
const subarraySum = (nums, k) => {
  if (nums === undefined || nums.length === 0 || k === undefined) return 0;
  
  let n = nums.length;
  let result = 0;
  for (let i = 0; i < n; i += 1) { // start index of subarray
    let sum = 0;
    for (let j = i; j < n; j += 1) { // end index of subarray (include!!!)
      sum += nums[j];
      if (sum === k) result += 1;
    }
  }

  return result;
};

/**
 * Reduce Brute Force(PrefixSum) + 2 Sum(HashMap)
 * 
 * T: O(n)
 * S: O(n)
 * Runtime: 96 ms
 */
const subarraySum = (nums, k) => {
  if (nums === undefined || nums.length === 0 || k === undefined) return 0;

  // key: sum, value: count, (Put sum in map, check sum-k in map)
  let map = {
    0: 1 // if sum == k, sum-k == 0, we can find one match by default here
  }; 

  let sum = 0;
  let result = 0;
  for (let num of nums) {
    sum += num;
    // Find match, Update result
    if ((sum - k) in map) result += map[sum - k];
    // Old sum, Update map
    if (sum in map) map[sum] += 1;
    // New sum (sum not in map), Update map
    else map[sum] = 1;
  }

  return result;
};

console.log(subarraySum([1,1,1], 2)); // 2