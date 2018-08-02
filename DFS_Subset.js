/**
 * 78. Subsets

Given a set of distinct integers, nums, return all possible subsets (the power set).

Note: The solution set must not contain duplicate subsets.

Example:

Input: nums = [1,2,3]
Output:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function(nums) {
    // 1. Initiate instance variable result
    let result = [];
    
    // 3. Sort the nums
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
     backtrack(nums, result, [], 0);

    // 2. Return the result
    return result;
}

// 4. Declare Backtrack Helper function
/**
 * @param {number[]} nums 
 * @param {number[][]} result 
 * @param {number[]} path 
 * @param {number} start start index for child node
 */
const backtrack = function(nums, result, path, start) {
    // 6. Update result, need to copy elements in the path into a new array
    result.push([...path]);

    // 7. for loop in range(start:): Iterate the nums from start index to the end
    for (let i = start; i < nums.length; i += 1) {
        // 7.1 Update path
        path.push(nums[i]);
        // 7.2 Recursive case, next start index is the key
        backtrack(nums, result, path, i+1);
        // 7.3 Resotre state of path to its parent node: pop last element
        path.pop();
    }
}

let test1 = [1, 2, 3];
console.log(subsets(test1));

/**
 * T: O(2^n)
 * S: O(2^n)
 */