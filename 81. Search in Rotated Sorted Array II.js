/**
 * Note:
 *  Reference: 154. Minimum in Rotated Sorted Array II
 */
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

/**
 * Leetcode Fundamental: 10/23 Update
 * 
 * Failure:
 * Fail to judge if target is in RHS or LHS bsince they are possible be equal to the boudary and they could be duplicate elements
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {
  if (nums === undefined || nums.length === 0 || target === undefined) return false;
  
  // Handle target at nums[0] case first and then exclude first element from the range
  if (nums[0] === target) return true;
  // Declare start and end as range of binary search boundaies [start...end] (include element)
  let start = 0;
  let end = nums.length - 1;
  
  // Key Step HERE! if low bound and high bound are duplicate element -> move start and end until next index of unique element
  while (start < nums.length && nums[start] === nums[0]) start += 1;
  while (end >= 0 && nums[end] === nums[0]) end -= 1;

  // From here the code is teh same as 33. Search in Rotated Sorted Array
  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);
    if (nums[mid] === target) return true;

    if (target >= nums[0]) {
      if (nums[mid] >= nums[0]) {
        if (nums[mid] > target) end = mid - 1;
        else start = mid + 1;
      }
      else end = mid - 1;
    } 
    else if (target < nums[0]) {
      if (nums[mid] < nums[0]) {
        if (nums[mid] > target) end = mid - 1;
        else start = mid + 1;
      }
      else start = mid + 1;
    }
  }
  
  return false;
};