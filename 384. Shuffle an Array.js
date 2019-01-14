/**
Shuffle a set of numbers without duplicates.

Example:

// Init an array with set 1, 2, and 3.
int[] nums = {1,2,3};
Solution solution = new Solution(nums);

// Shuffle the array [1,2,3] and return its result. Any permutation of [1,2,3] must equally likely to be returned.
solution.shuffle();

// Resets the array back to its original configuration [1,2,3].
solution.reset();

// Returns the random shuffling of array [1,2,3].
solution.shuffle();
 */
/**
 * Leetcode Fundamentals: 11/1 Update
 * Proof:
 * Let i be index in range [0...j] and each probability is 1/(1+j)
 * To change number from index j to index i:
 * Select j:
 * 1. if i === j, no need to change its position: P: 1/(1+j)
 * 2. if i !== j (P: j/(j+1) ), choose another value in range [0...j-1] (P: 1/j )
 *    Total: P: (j/j+1) * (1/j) = 1/(j+1)
 * Each value has equal probability at any position
 */
/**
 * Algorithm: Reservoir Sampling
 */
class Solution {
  constructor(nums) {
    this.nums = nums;
  }

  /**
   * Resets the array to its original configuration and return it.
   * @return {number[]}
   */
  reset() {
    return this.nums;
  }

  /**
   * Returns a random shuffling of the array.
   * @return {number[]}
   */
  shuffle() {
    if (this.nums == null) return null;
    let numsCopy = [...this.nums];
    for (let j = 1; j < numsCopy.length; j += 1) {
      let i = Math.floor(Math.random() * (j+1)); // i: index in range[0...j], each probability is 1/(1+j)
      this.swap(numsCopy, i, j);
    }

    return numsCopy;
  }

  /**
   * 
   * @param {array} arr 
   * @param {number} i first index
   * @param {number} j second index
   */
  swap(arr, i, j) {
    [ arr[i], arr[j] ] = [ arr[j], arr[i] ];
  }
}