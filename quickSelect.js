/**
 * Quick Select 
 * 
 * T: O(n) in average, O(n^2) in worst, S: O(1)
 */
/**
 * Quick Select function:
 * Find the kth number and return the array (1/13/2019 Update)
 * 
 * @param {array} nums
 * @param {number} k
 * @return {array} array partition by kth number
 */
const quickSelect = function(nums, k) {
  if (k > nums.length) return -1;
  
  let left = 0, right = nums.length - 1;
  while (true) {
    let pivot = right;
    let partitionedIndex = partition(nums, pivot, left, right);
    if (partitionedIndex === k - 1) return nums;
    else if (partitionedIndex > k - 1) right = partitionedIndex - 1;
    else left = partitionedIndex + 1;
  }
}

/**
 * Partition helper function
 * 
 * @param {array} nums
 * @param {number} pivot
 * @param {number} left
 * @param {number} right
 * @return {number} partitionedIndex
 */
const partition = function(nums, pivot, left, right) {
  let pivotValue = nums[pivot];
  let partitionIndex = left;

  for (let i = left; i < right; i += 1) {
    if (nums[i] < pivotValue) {
      // swap
      [nums[i], nums[partitionIndex]] = [nums[partitionIndex], nums[i]];
      partitionIndex += 1;
    }
  }

  // swap
  [nums[right], nums[partitionIndex]] = [nums[partitionIndex], nums[right]];
  return partitionIndex;
}

let test1 = [1, 3, 5, 2, 7, 2, 4, 6];
let k = 5;
let test2 = [-1, 3, 10, 5, -6, -22];
let k2 = 5;
console.log(quickSelect(test1, k)); // [...,4 ,...]
console.log(quickSelect(test2, k2)); // [...,5 ,...]
