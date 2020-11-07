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
function quickSelect(nums, k) {
  if (k > nums.length) return -1;
  nums = shuffle(nums);
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
 * Swap nums element
 * @param {array} nums 
 * @param {number} a 
 * @param {number} b 
 */
function swap(nums, a, b) {
  [nums[a], nums[b]] = [nums[b], nums[a]];
};

/**
 * Shuffle array
 * 
 * @param {array} nums 
 */
function shuffle(nums) {
  if (nums.length < 2) return nums;
  for (let j = 1; j < nums.length; j += 1) {
    let i = Math.floor(Math.random() * (j + 1));
    swap(nums, i, j);
  }
  return nums;
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
function partition(nums, pivot, left, right) {
  let pivotValue = nums[pivot];
  let partitionIndex = left;
  for (let i = left; i < right; i += 1) {
    if (nums[i] < pivotValue) {
      swap(nums, i, partitionIndex);
      partitionIndex += 1;
    }
  }
  swap(nums, right, partitionIndex);
  return partitionIndex; // where the final location of pivotValue
}

let test1 = [1, 3, 5, 2, 7, 2, 4, 6];
let k = 5;
let test2 = [-1, 3, 10, 5, -6, -22];
let k2 = 5;
console.log(quickSelect(test1, k)); // [...,4 ,...]
console.log(quickSelect(test2, k2)); // [...,5 ,...]
