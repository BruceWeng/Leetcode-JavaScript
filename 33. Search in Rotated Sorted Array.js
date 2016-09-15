/**
 * Note: Binary search
 *  1. Compare nums[mid] with nums[start] to check mid is in left or right side.
 *  2. Compare target, nums[start], nums[mid] in left side.
 *  3. Compare target, nums[end], nums[mid] in right side.
 *  4. Return mid when nums[mid] === target
 *  5. When there are only two elements in array, return start if nums[start] === target,
 *     return end if nums[end] === target.
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  if (nums === null || nums.length === 0) {
    return -1;
  }

  let start = 0;
  let end = nums.length - 1;
  while(start + 1 < end) {
    let mid = start + Math.floor((end - start) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] > nums[start]) {
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
    return start;
  }

  if (nums[end] === target) {
    return end;
  }

  return -1;
};
let test1 = [3, 5, 1];
console.log(search(test1, 1));// 1
