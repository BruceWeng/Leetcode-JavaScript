/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var frequencySort = function(nums) {
  if(nums==null) return []
  let freqs = {}
  for(let num of nums) {
    if(!(num in freqs)) freqs[num] = 1
    else freqs[num]+=1
  }
  return nums.sort((a, b) => {
    if(freqs[a]!==freqs[b]) return freqs[a]-freqs[b]
    else return b-a
  })
};