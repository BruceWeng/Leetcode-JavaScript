/**
Given a collection of integers that might contain duplicates, nums, 
return all possible subsets (the power set).

Note: The solution set must not contain duplicate subsets.

Example:

Input: [1,2,2]
Output:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
 */
/**
 * Algorithm: Recursion, backtracking
 * 1. Declare a helper function to find next possible number and add it in the path[]
 * 2. Sort nums, O(nlogn)
 * 3. Add empty array to result as one of the solution
 * 4. Call helperDFS(result, nums, path, i, next) with depth from 1 to nums.length
 * 5. Return result
 * 
 * 6. helperDFS(result, nums, path, depth, next):
 *      base: if path.length === depth:
 *          copy path
 *          result.push(path)
 *          return
 *      recursive: for i = next; i < nums.length; i += 1:
 *          avoid duplicate: if i !== next and nums[i] === nums[i-1]: continue
 * 
 *          path.push(nums[i])
 *          helperDFS(result, nums, path, depth, i+1)
 *          path.pop()
 *      
 * T: O(n^2)
 * S: O(n) (result + path)
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let subsetsWithDup = function(nums) {
    let result = [];
    // Edge case
    if (nums.length === 0) return result;
    let path = [];
    
    nums.sort();

    // Add empty path as one of the solution
    result.push(path);

    for (let i = 1; i <= nums.length; i += 1) {
        helperDFS(result, nums, path, i, 0);
    }

    return result;

};

/**
 * DFS helper function
 * 
 * @param {int[][]} result 
 * @param {int[]} nums 
 * @param {int[]} path 
 * @param {number} depth defined by for loop in main function
 * @param {number} next 
 */
let helperDFS = function(result, nums, path, depth, next) {
    if (path.length === depth) {
        result.push([...path]);
        return;
    }

    for (let i = next; i < nums.length; i += 1) {
        // Avoid duplicate numbers
        if (i !== next && nums[i] === nums[i-1]) continue;

        path.push(nums[i]);
        helperDFS(result, nums, path, depth, i+1);
        path.pop();
    }
};