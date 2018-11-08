/**
nums[j] and the absolute difference between i and j is at most k.

Example 1:

Input: nums = [1,2,3,1], k = 3
Output: true
Example 2:

Input: nums = [1,0,1,1], k = 1
Output: true
Example 3:

Input: nums = [1,2,3,1,2,3], k = 2
Output: false
 */
/**
 * Note:
 * 1. Hash Map(value, index)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    if (nums === null || nums.length === 0) {
        return false;
    }

    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            if (i - map.get(nums[i]) <= k) {
                return true;
            } else {
                map.set(nums[i], i);
            }
        } else {
            map.set(nums[i], i);
        }
    }

    return false;
};
/**
 * Leetcode Fundamental: 11/8 Update
 * 
 * Declare a map with key: nums[bound], value: bound (current end becomes start for next round)
 * for (let bound = 0; bound < nums.length; bound += 1)
 *   Timing:
 *   if (nums[end] === nums[start])
 *     if (end - start <= k): return true;
 *     else: update end to lastest bound
 *   else:
 *     update end to latest bound
 * 
 * Fail to find the timing to update map
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
  if (nums === undefined || nums.length === 0) return false;

  let map = new Map();
  for (let bound = 0; bound < nums.length; bound += 1) {
    if (map.has(nums[bound])) {
      if (bound - map.get(nums[bound]) <= k) {
        return true;
      } else {
        map.set(nums[bound], bound);
      }
    } else {
      map.set(nums[bound], bound);
    }
  }

  return false;
};
/**
 * 玩轉算法 11/8 Update
 * 1. The question can be transformed into finding an interval of length k and check if there
 * are pairs nums[start], nums[end] where nums[start] === nums[end]
 * 
 * 2. Maintain a set of nums[i] with length <= k (contains nums[l...l+k])
 *    a. check if next nums[l+k+1] is in set: return true
 *    b. else: set.add(nums[l+k+1])
 *         if (set.size > k) set.delete(nums[l]) (l = i-k)
 * 3. No valid pairs found: return false
 * 
 * Store valid elements in set, maintain interval by maintaining the set
 */
const containsNearbyDuplicate = (nums, k) => {
  if (nums === undefined || nums.length === 0) return false;

  let set = new Set();
  for (let bound = 0; bound < nums.length; bound += 1) {
    if (set.has(nums[bound])) return true;
    
    set.add(nums[bound]);
    if (set.size > k) set.delete(nums[bound-k]);
  }

  return false;
};
