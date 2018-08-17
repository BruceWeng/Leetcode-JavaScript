/**
 * Quick Select 
 * 
 * T: O(n) in average, O(n^2) in worst, S: O(1)
 */
/**
 * Quick Select function
 * 
 * @param {array} arr
 * @param {number} k
 * @return {array} array partition by kth number
 */
const quickSelect = function(arr, k) {
  if (k > arr.length) return -1;
  
  let left = 0, right = arr.length - 1;
  while (true) {
    let pivot = right;
    let partitionedIndex = partition(arr, pivot, left, right);
    if (partitionedIndex === k - 1) return arr;
    else if (partitionedIndex > k - 1) right = partitionedIndex - 1;
    else left = partitionedIndex + 1;
  }
}

/**
 * Partition helper function
 * 
 * @param {array} arr
 * @param {number} pivot
 * @param {number} left
 * @param {number} right
 * @return {number} partitionedIndex
 */
const partition = function(arr, pivot, left, right) {
  let pivotValue = arr[pivot];
  let partitionIndex = left;

  for (let i = left; i < right; i += 1) {
    if (arr[i] < pivotValue) {
      // swap
      [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
      partitionIndex += 1;
    }
  }

  // swap
  [arr[right], arr[partitionIndex]] = [arr[partitionIndex], arr[right]];
  return partitionIndex;
}

let test1 = [1, 3, 5, 2, 7, 2, 4, 6];
let k = 5;
let test2 = [-1, 3, 10, 5, -6, -22];
let k2 = 5;
console.log(quickSelect(test1, k)); // [...,4 ,...]
console.log(quickSelect(test2, k2)); // [...,5 ,...]
