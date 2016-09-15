/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {
  if (nums === null || nums.length === 0) {
    return false;
  }

  let start = 0;
  let end = nums.length - 1;
  while(start + 1 < end) {
    let mid = start + Math.floor((end - start) / 2);

    if (nums[mid] === target) {
      return true;
    }

    if (nums[mid] === nums[end]) {
      end--;
    } else if (nums[mid] === nums[start]){
      start++;
    } else if (nums[mid] > nums[start]) {
      if (target >= nums[start] && nums[mid] >= target) {
        end = mid;
      } else {
        start = mid;
      }
    } else {
      if (target <= nums[end] && nums[mid] <= target) {
        start = mid;
      } else {
        end = mid;
      }
    }
  }

  if (nums[start] === target) {
    return true;
  }

  if (nums[end] === target) {
    return true;
  }

  return false;
};
let test1 = [2, 2, 2, 0, 2, 2];
console.log(search(test1, 0));// true
