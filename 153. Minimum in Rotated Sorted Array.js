/**
 * Note:
 * 1. Binary Search
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    if (nums === null || nums.length === 0) {
        return null;
    }

    var start = 0;
    var end = nums.length - 1;
    while(start + 1 < end) {
        var mid = start + Math.floor((end - start) / 2);
        if (nums[mid] <= nums[end]) {
            end = mid;
        } else {
            start = mid;
        }
    }

    if (nums[start] <= nums[end]) {
        return nums[start];
    } else {
        return nums[end];
    }
};
