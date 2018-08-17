/**
 * Quick Sort
 * 
 * T: O(nlogn) in average, O(n^2) for non partitioned, S: O(1)
 * @param {array} arr
 * @return {array} sorted array
 */
const quickSort = function(arr) {
  // Array of length 0 or 1 are sorted by definition.
  if (arr.length < 2) return arr;

  return sortHelper(arr, 0, arr.length-1);
}

/**
 * Quick Sort helper function
 * (right index is included boundary)
 * @param {array} arr 
 * @param {array} left 
 * @param {array} right 
 * @return {array} sorted array
 */
const sortHelper = function(arr, left, right) {
  if (left < right) {
    let pivot = right;
    let partitionIndex = partition(arr, pivot, left, right);

    sortHelper(arr, left, partitionIndex-1);
    sortHelper(arr, partitionIndex+1, right);
  }

  return arr;
}

/**
 * Partition function
 * @param {array} arr 
 * @param {number} pivot 
 * @param {number} left 
 * @param {number} right 
 * @return {number} partitionIndex
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

let test1 = [1];
let test2 = [2, 1];
let test3 = [1, 3, 5, 2, 7, 2, 4, 6];
let test4 = [-1, 3, 10, 5, -6, -22];
console.log(quickSort(test1));
console.log(quickSort(test2));
console.log(quickSort(test3));
console.log(quickSort(test4));