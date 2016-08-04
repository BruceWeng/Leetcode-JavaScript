/**
 * Solution A:
 * 1. hash table
 * Solution B:
 * 0. new Array(size).fill(0)
 * 1. Bit manipulation
 * 2. Bitwise shift: n >> m = ( n / 2 ^ m), n << m = (n * 2 ^ m)
 * 3. Bit mask:
 * a. Duplicate single bit: shift and & 1
 * b. Duplicate all bits: | 0
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    if (nums.length === 0) {
        return 0;
    }

    let result = 0;
    let bitHolder = new Array(32).fill(0);
    for (let i = 0; i < 32; i++) {
        for (let j = 0; j < nums.length; j++) {
            bitHolder[i] += ((nums[j] >> i) & 1);
            bitHolder[i] %= 3;
        }

        result |= (bitHolder[i] << i);
    }

    return result;
};
