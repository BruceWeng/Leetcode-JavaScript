/**
39. Combination Sum

Given a set of candidate numbers (candidates) (without duplicates) and a target number (target), 
find all unique combinations in candidates where the candidate numbers sums to target.

The same repeated number may be chosen from candidates unlimited number of times.

Note:

All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.
Example 1:

Input: candidates = [2,3,6,7], target = 7,
A solution set is:
[
  [7],
  [2,2,3]
]
Example 2:

Input: candidates = [2,3,5], target = 8,
A solution set is:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = function(nums, target) {
    // 1. Initiate instance variable result
    let result = [];
    
    // 3. Sort the nums for ascending order result
    nums.sort((a, b) => a - b);

    /**
     * arr.sort([compareFunction])
     * 
     * Parameters: compareFunction(optional)
     * If omitted, the array is sorted according to each character's Unicode code point value, according to the string conversion of each element.
     * EX: [1, 30, 4, 21].sort() -> [1, 21, 30, 4]
     * 
     * Return value:
     * The sorted array. 
     * 1. The array is sorted in place.
     * 2. No copy is made.
     * 3. The sort is not stable in Firefox.
     * 4. Different browsers feature different sort algorithms.
     */ 

     // 5. Invoke Backtrack Helper function
     backtrack(nums, target, result, [], 0);

    // 2. Return the result
    return result;
};

// 4. Declare Backtrack Helper function
/**
 * @param {number[]} nums 
 * @param {number} target
 * @param {number[][]} result 
 * @param {number[]} path 
 * @param {number} start start index for child node
 */
const backtrack = function(nums, target, result, path, start) {
    // a. Base case happend depends on target
    // a.1 Base case 1
    if (target < 0) return;

    // a.2 Base case 2: Case to update result, need to copy elements in the path into a new array
    else if (target === 0) result.push([...path]); // Implicit return

    // b. for loop in range(start:): Iterate the nums from start index to the end
    for (let i = start; i < nums.length; i += 1) {
        // b.1 Update path
        path.push(nums[i]);
        // b.2 Recursive case, next target is the key
        // next start index is not i+1 because we can use same elements
        backtrack(nums, target-nums[i], result, path, i); 
        // b.3 Resotre state of path to its parent node: pop last element
        path.pop();
    }
};

let test1 = [2,3,6,7];
let target1 = 7;
console.log(combinationSum(test1, target1));

/**
 * Depth = target / min, m: m is distinct elements in candidate[] which candidate[i] <=  target (current level)
 * T: O(m^Depth)
 * S: O(m^Depth) (Times to call helper function)
 */
