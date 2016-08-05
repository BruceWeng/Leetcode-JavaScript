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
