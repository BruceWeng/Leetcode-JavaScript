/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    if (nums === null || nums.length === 0) {
        return false;
    }

    let set = new Set();
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) {
            return true;
        }

        set.add(nums[i]);
    }

    return false;
};
