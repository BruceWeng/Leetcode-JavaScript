/**
 * Note:
 * Solution A:
 * 1. Hash Table: Time: O(N), Space: O(N)
 * Solution B:
 * 1. Exclusive or ^=: Time O(N), Space: O(1)
 * 2. Iterate every element and do XOR, the remaining value will be the single number
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        result ^= nums[i];
    }

    return result;

};
