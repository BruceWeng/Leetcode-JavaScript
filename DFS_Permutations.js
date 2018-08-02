/**
46. Permutations

Given a collection of distinct integers, return all possible permutations.

Example:

Input: [1,2,3]
Output:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function(nums) {
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
     backtrack(nums, result, []);

    // 2. Return the result
    return result;
};

// 4. Declare Backtrack Helper function
/**
 * @param {number[]} nums 
 * @param {number[][]} result 
 * @param {number[]} path 
 */
const backtrack = function(nums, result, path) {
    // a. Base case: path.length === nums.length
    if (path.length === nums.length) result.push([...path]);

    // b. for loop in range(:): Iterate the whole nums
    for (let i = 0; i < nums.length; i += 1) {
        if (path.includes(nums[i])) continue;
        // b.1 Update path
        path.push(nums[i]);
        // b.2 Recursive case
        // next start index is not i+1 because we will always iterate nums from 0 index
        backtrack(nums, result, path); 
        // b.3 Resotre state of path to its parent node: pop last element
        path.pop();
    }
};

let test1 = [1, 2, 3];
console.log(permute(test1));

/**
 * T: O(Numbers of paths * time to construct each path) = O(n! * n)
 * S: O(Times to call helper function * new space for copy path) = O(n! * n)
 */