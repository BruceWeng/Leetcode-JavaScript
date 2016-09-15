/**
 * Note:
 *  1. Must mention the worst case: every element is the same: O(N)
 *  2. Add two line else if for remove duplicated elements
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  if (nums === null || nums.length === 0) {
    return -1;
  }

  let start = 0;
  let end = nums.length - 1;
  while (start + 1 < end) {

    let mid = start + Math.floor((end - start) / 2);
    if (nums[mid] === nums[end]) {
      end--;
    } else if (nums[mid] === nums[start]) {
      start++;
    } else if ( nums[mid] < nums[end]){
      end = mid;
    } else {
      start = mid;
    }
  }

  if (nums[start] <= nums[end]) {
    return nums[start];
  } else {
    return nums[end];
  }
};

let test1 = [4, 5, 5, 6, 7, 1, 2, 3, 4, 4];
console.log(findMin(test1));
