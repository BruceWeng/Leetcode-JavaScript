/**
 * Note:
 * Solution A:
 * 1. Brute force: O(N^2)
 * Solution B:
 * 1. Sort array
 * 2. Two pointers: O(NlogN)
 * Solution C:
 * 1. Map(target - nums[i], i): O(N)
 * 2. iterate the array and check hash map
 * 3. append hash value and current index into the result array
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 function twoSum(nums, target) {
     if (nums.length === 0 || target === null) {
         return null;
     }
     let map = new Map();
     let result = [];
     for (let i = 0; i < nums.length; i++) {
        if (map.size !== 0) {
            if (map.has(nums[i])) {
                result.push(map.get(nums[i]));
                result.push(i);
                return result;
            }
        }
        map.set(target - nums[i], i);
     }

 }
