/**
Given an array of integers with possible duplicates, randomly output the index of a given target number. 
You can assume that the given target number must exist in the array.

Note:
The array size can be very large. Solution that uses too much extra space will not pass the judge.

Example:

int[] nums = new int[] {1,2,3,3,3};
Solution solution = new Solution(nums);

// pick(3) should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.
solution.pick(3);

// pick(1) should return 0. Since in the array only nums[0] is equal to 1.
solution.pick(1);
 */
/**
 * Algorithm: Reservoir Sampling
 */
class Solution {
  constructor(nums) {
    this.nums = nums;
  }

  /** 
   * @param {number} target
   * @return {number}
   */
  pick(target) {
    let result = -1; // anything, result will be replaced
    let count = 0; // target counts: increamented when nums[i] === target, and ensure P(target) = 1/count
    for (let i = 0; i < this.nums.length; i += 1) {
      if (this.nums[i] !== target) continue;

      if (Math.floor(Math.random() * (count+1)) === count) {
          result = i;
      }
        
      count += 1;
    }

    return result;
  }
}