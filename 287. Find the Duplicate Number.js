/**
Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.

Example 1:

Input: [1,3,4,2,2]
Output: 2
Example 2:

Input: [3,1,3,4,2]
Output: 3
Note:

You must not modify the array (assume the array is read only).
You must use only constant, O(1) extra space.
Your runtime complexity should be less than O(n2).
There is only one duplicate number in the array, but it could be repeated more than once.
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
const findDuplicate = (nums) => {
  // Prevent return index 0 when first index into the loop
  // Ex: [1, 1] should return 1 rather than 0
  let slow = nums[0];
  let fast = nums[nums[0]];

  // Prove that at least one duplicate number must exist
  // No infinite loop
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[nums[fast]];
  }

  slow2 = 0;

  while (slow2 !== slow) {
    slow2 = nums[slow2];
    slow = nums[slow];
  }

  return slow2;
}
/**
 * Leetcode Fundamental: 10/23 Update
 * 
 * Failure:
 * 1. Fail to do binary search in range [1...n], search range are not necessary be indices
 * 2. Fail to consider one number duplicated multiple times, ex: [3, 3, 3, 3, 3], n = 4
 * 3. Fail to find the correct while true condition (start < end), target is always keeped in range
 * 4. Fail to compare count and mid
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
const findDuplicate = (nums) => {
  console.assert(nums !== undefined);
  console.assert(nums.length !== 0);
  
  // Binary search from range of [1...m] (inclusive), start = 1, end = nums.length - 1 (n)
  // start and end ARE NOT INDECIES
  // if target is found, there will be target + 1 elements <= target
  // ex: target is 3, [1, 2, 3, 4, 3]
  // while condition: (start < end)
  // edge case: there is only one element in the range: find the target, should not allow stat === end in while loop
  // edge case 2: there is one number shows multiple times, ex: [3, 3, 3, 3, 3], n = 4
  // for (num of nums) :
  //   if num <= mid: count += 1;
  // There will be only two cases:
  // a. mid >= target aka count > mid: (mid is still candidate) end = mid
  // b. mid < target aka count <= mid: (mid is no longer candidate) start = mid + 1
  // We can not return the target in while loop because there is no specified condition that make sure we find the target
  // But we can always keep target in range[start...end]
  // return start (or end, start === end) 
  let start = 0;
  let end = nums.length - 1;
  while (start < end) {
    let mid = start + Math.floor((end - start) / 2);
    let count = 0;
    for (let num of nums) 
      if (num <= mid) count += 1;
    
    if (count > mid) end = mid;
    if (count <= mid) start = mid + 1;
  }
  
  return start; // or end
};