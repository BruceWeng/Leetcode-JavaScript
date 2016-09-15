/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  if (nums === null || nums.length === 0) {
    return;
  }

  let length = nums.length;
  k = k % length;
  reverse(0, length - k - 1);
  reverse(length - k, length - 1);
  reverse(0, length - 1);
  return;

  function reverse(start, end) {
    while (start < end) {
      let temp = nums[start];
      nums[start] = nums[end];
      nums[end] = temp;
      start ++;
      end --;
    }
  }
};

let test1 = [1, 2, 3, 4, 5, 6, 7];
console.log(rotate(test1, 3));
