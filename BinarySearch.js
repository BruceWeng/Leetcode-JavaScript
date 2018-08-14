/**
 * Given a sorted integer array and an integer target.
 * Write a function to search if the target is in the array.
 * Return true if find it, else return false.
 */
/**
 * @param  {number[]} nums
 * @return {bool}
 */
const binarySearch = function(nums, target) {
    let start = 0;
    let end = nums.length - 1;
    let checkCount = 0
    // Search
    while (start + 1 < end) {
        let mid = start + Math.floor((end - start) / 2);
        checkCount += 1;
        if (nums[mid] === target) return checkCount;

        if (nums[mid] < target) {
            start = mid;
        } else {
            end = mid;
        }
    }
    // Second check
    checkCount += 1;
    if (nums[start] === target) {
        return checkCount;
    }

    checkCount += 1;
    if (nums[end] === target) {
        return checkCount;
    }

    return checkCount;
}

/**
 * Solution 2
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  
    let start = 0;
    let end = nums.length - 1;
    
    while (start <= end) { 
        
      let mid = start + Math.floor((end - start) / 2);
          
      if (nums[mid] === target) return mid;
        
      if (nums[mid] > target) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
        
    return - 1;
};

let test = [1, 2, 3, 4, 5, 6, 7, 8];
let target1 = 0;
let target2 = 4;
let target3 = 8;

console.log(binarySearch(test, target1)); // false
console.log(binarySearch(test, target2)); // true
console.log(binarySearch(test, target3)); // true