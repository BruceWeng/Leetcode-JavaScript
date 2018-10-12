/**
Given two arrays, write a function to compute their intersection.

Note:

Each element in the result must be unique.
The result can be in any order.
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
let intersection = function(nums1, nums2) {
  let set = new Set(nums1);
  let result = new Set();
  
  for (num of nums2) 
    if (set.has(num)) result.add(num);

  return Array.from(result);
};

console.log(intersection([1,2,2,1], [2,2])); // [2]
console.log(intersection([4,9,5], [9,4,9,8,4])); // [9,4]
