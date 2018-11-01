/**
 * Leetcode Fundamentals: 11/1 Update
 * Failure:
 * 1. Fail to pass left and right as boundary in sortHelper
 * I passed 0 as left and nums.length - 1 as right
 * Remember each sortHelper call reduce the partition range
 * 2. Fail to return nums at the end of sortHelper func
 * 3. PartitionIndex is easy typo
 */
/**
 * Quick Sort
 * 
 * T: O(nlogn) in average, O(n^2) for non partitioned, S: O(1)
 * @param {array} nums
 * @return {array} sorted array
 */
const quickSort = function(nums) {
  // Array of length 0 or 1 are sorted by definition.
  if (nums.length < 2) return nums;

  return sortHelper(nums, 0, nums.length-1);
}

/**
 * Quick Sort helper function
 * (right index is included boundary)
 * @param {array} nums 
 * @param {array} left 
 * @param {array} right 
 * @return {array} sorted array
 */
const sortHelper = function(nums, left, right) {
  if (left < right) {
    let pivot = right; // Pivot has to be right in this implementation
    let partitionIndex = partition(nums, pivot, left, right); 
    // PartitionIndex is the final position
    // No need to include the position in recursive calls

    sortHelper(nums, left, partitionIndex-1);
    sortHelper(nums, partitionIndex+1, right);
  }

  return nums;
}

/**
 * Partition function
 * @param {array} nums 
 * @param {number} pivot 
 * @param {number} left 
 * @param {number} right 
 * @return {number} partitionIndex
 */
const partition = function(nums, pivot, left, right) {
  let pivotValue = nums[pivot];
  let partitionIndex = left; // The first index that arr[partitionIndex] >= pivotValue

  for (let i = left; i < right; i += 1) {
    if (nums[i] < pivotValue) {
      // swap nums[i] and nums[partitionIndex]
      swap(nums, i, partitionIndex);
      partitionIndex += 1;
    }
  }

  // swap nums[pivot] and nums[partitionIndex]
  swap(nums, pivot, partitionIndex);
  return partitionIndex;
}

/**
 * Swap nums[a] and nums[b] in place
 * 
 * @param {Array} nums 
 * @param {Number} a 
 * @param {Number} b 
 */
const swap = (nums, a, b) => {
  [nums[a], nums[b]] = [nums[b], nums[a]];
}

let test1 = [1];
let test2 = [2, 1];
let test3 = [1, 3, 5, 2, 7, 2, 4, 6];
let test4 = [-1, 3, 10, 5, -6, -22];
console.log(quickSort(test1));
console.log(quickSort(test2));
console.log(quickSort(test3));
console.log(quickSort(test4));