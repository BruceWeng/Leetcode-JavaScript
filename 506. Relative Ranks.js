/**
Given scores of N athletes, find their relative ranks and the people with the top three 
highest scores, who will be awarded medals: "Gold Medal", "Silver Medal" and "Bronze Medal".

Note:
N is a positive integer and won't exceed 10,000.
All the scores of athletes are guaranteed to be unique.
 */
/**
 * Algorithm 1: Regular sorting with compare func
 * T: O(nlogn)
 * 
 * Algorithm 2: Hash table
 * T: O(max(num))
 */
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var findRelativeRanks = function(nums) {

};

let input = [5, 4, 3, 2, 1]
console.log(findRelativeRanks(input)); // ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"]
//Explanation: The first three athletes got the top three highest scores, so they got "Gold Medal", "Silver Medal" and "Bronze Medal". 
//For the left two athletes, you just need to output their relative ranks according to their scores.

/*
Given an array of unique numbers, return a new array of 
rankings of the original array. For example, if your input 
array is [10, 5, 20], the output should be [2, 3, 1], 
since 10 is the second largest number, 5 is the third largest, and 20 is the largest.

Examples:

rankings([10, 5, 20]); // [2, 3, 1]
rankings([6, 8, 1, 12, 4, 3, 9]); // [4, 3, 7, 1, 5, 6, 2]
rankings([100]); // [1]
rankings([4, 2, 3, 1]); // [1, 3, 2, 4]
*/
/**
 * Algorithm 1: Regular sorting
 * Ranking: new index of sorted array + 1
 * Position: original index
 * 
 * Algorithm 2: Hash table
 * 
 */
const rankings = (nums) => {
  let pairs = [];
  let result = new Array(nums.length);
  for (let i = 0; i < nums.length; i += 1) {
    pairs.push([nums[i], i]);
  }

  pairs.sort((a, b) => b[0] - a[0]);

  for (let i = 0; i < pairs.length; i += 1) {
    let pair = pairs[i];
    result[pair[1]] = i + 1;
  }

  return result;
}

const rankings2 = (nums) => {
  let maxVal = Number.MIN_SAFE_INTEGER;
  for (let num of nums) {
    maxVal = Math.max(maxVal, num);
  }
  
  let hash = new Array(maxVal).fill(-1); // index: num, value: position
  for (let i = 0; i < nums.length; i += 1) 
    hash[nums[i]] = i; // filling position

  let result = [];
  let rank = 1;
  for (let i = hash.length - 1; i >= 0; i -= 1) {
    if (hash[i] !== -1) {
      result[hash[i]] = rank;
      rank += 1;
    }
  }

  return result;
}

const rankings3 = (nums) => {
  // Solution2 with allowing negative numbers
  let maxVal = Number.MIN_SAFE_INTEGER;
  let minVal = Number.MAX_SAFE_INTEGER;
  for (let num of nums) {
    maxVal = Math.max(maxVal, num);
    minVal = Math.min(minVal, num);
  }
  
  let hash = new Array(maxVal-minVal).fill(-1); // index: num, value: position
  for (let i = 0; i < nums.length; i += 1) 
    hash[nums[i]-minVal] = i; // filling position

  let result = [];
  let rank = 1;
  for (let i = hash.length - 1; i >= 0; i -= 1) {
    if (hash[i] !== -1) {
      result[hash[i]] = rank;
      rank += 1;
    }
  }

  return result;
}
console.log(rankings2([10, 5, 20])); // [2, 3, 1]
console.log(rankings2([6, 8, 1, 12, 4, 3, 9])); // [4, 3, 7, 1, 5, 6, 2]
console.log(rankings2([100])); // [1]
console.log(rankings2([4, 2, 3, 1])); // [1, 3, 2, 4]
console.log(rankings3([-1, 10, 5])); // [3, 1, 2]