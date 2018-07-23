/**
Find all possible combinations of k numbers that add up to a number n, given that only 
numbers from 1 to 9 can be used and each combination should be a unique set of numbers.

Note:

All numbers will be positive integers.
The solution set must not contain duplicate combinations.
Example 1:

Input: k = 3, n = 7
Output: [[1,2,4]]
Example 2:

Input: k = 3, n = 9
Output: [[1,2,6], [1,3,5], [2,3,4]]
 */
/**
 * Algorithm: Recursion, Backtracking
 * 1. Declare a helper function to find next possible number and add it in the path[]
 * 2. helper function() :
 *      base: if path.length == k and n == 0:
 *              copy path to new_list 
 *              result.push(new_list)
 *              return
 *      recursive: for i = next; i <= 9; i += 1
 *              path.push(i)
 *              Increment i, decrement n by i (since add i already)
 *              helper(result, path, i+1, k, n-i)
 *              path.pop()
 * 3. Declare result = [], path = [], call helper(result, path, 1, k, n)
 * 4. return result
 * 
 * T: O(9!)
 * S: O(9) (result + path)
 */
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
let combinationSum3 = function(k, n) {
    let result = [];
    helper(result, [], 1, k, n);
    return result;
};

let helper = function(result, path, next, k, n) {
    if (path.length === k && n === 0) {
        result.push([...path]);
        return;
    }

    for (let i = next; i <= 9; i += 1) {
        path.push(i);
        helper(result, path, i+1, k, n-i);
        path.pop();
    }
}

let k1 = 3;
let n1 = 7;
console.log(combinationSum3(k1, n1)); // [[1,2,4]]

let k2 = 3;
let n2 = 9;
console.log(combinationSum3(k2, n2)); // [[1,2,6], [1,3,5], [2,3,4]]