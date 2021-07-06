/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
  if(nums==null||nums.length<3) return []
  let result = []
  nums.sort((a, b) => a-b)
  for(let i=0;i<nums.length-2;i++) {
    if(i!==0 && nums[i]===nums[i-1]) continue
    if(nums[i]>0) break
    let left = i+1, right = nums.length-1
    while(left<right) {
      let sum = nums[i]+nums[left]+nums[right]
      if(sum===0) {
        let answer = []
        answer.push(nums[i], nums[left], nums[right])
        result.push(answer)
        while(left<right && nums[left]===nums[left+1]) left++
        while(left<right && nums[right]===nums[right-1]) right--
        left++
        right--
      }
      if(sum<0) left++
      if(sum>0) right--
    }
  }
  return result
};

let test1 = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(test1));
