/**
 * Merge Sort
 * 
 * T: O(nlogn), S: O(n)
 * @param {array} arr
 * @return {array} sorted array
 */
const mergeSort = function(arr) {
    // Array of length 0 or 1 are sorted by definition.
    if (arr.length < 2) return arr;
    let mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

/**
 * Merge helper function
 * 
 * @param {array} arr1 
 * @param {array} arr2 
 * @return {array} sorted array
 */
const merge = function(arr1, arr2) {
  const merged = [];
  let i = 0, j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i]);
      i += 1;
    } else {
      merged.push(arr2[j]);
      j += 1;
    }
  }

  merged.push(...arr1.slice(i), ...arr2.slice(j));
  return merged;
}

let test1 = [1];
let test2 = [2, 1];
let test3 = [1, 3, 5, 2, 7, 2, 4, 6];
let test4 = [-1, 3, 10, 5, -6, -22];
console.log(mergeSort(test1));
console.log(mergeSort(test2));
console.log(mergeSort(test3));
console.log(mergeSort(test4));