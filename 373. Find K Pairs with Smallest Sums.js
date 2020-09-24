/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
var kSmallestPairs = function (nums1, nums2, k) {
  let len1 = nums1.length, len2 = nums2.length;
  let arr = new Array(len1).fill(0), resList = [];
  while (k-- > 0) {
    let min = +Infinity;
    let index = -1;
    for (let i = 0; i < len1; i++) {
      if (arr[i] >= len2) {
        continue;
      }
      if (nums1[i] + nums2[arr[i]] < min) {
        min = nums1[i] + nums2[arr[i]];
        index = i;
      }
    }
    if (index == -1) {
      break;
    }
    resList.push([nums1[index], nums2[arr[index]]]);
    arr[index]++;
  }
  return resList
};