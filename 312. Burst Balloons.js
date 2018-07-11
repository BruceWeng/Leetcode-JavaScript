/**
Given n balloons, indexed from 0 to n-1. Each balloon is painted with a number on it 
represented by array nums. You are asked to burst all the balloons. If the you burst 
balloon i you will get nums[left] * nums[i] * nums[right] coins. Here left and right 
are adjacent indices of i. After the burst, the left and right then becomes adjacent.

Find the maximum coins you can collect by bursting the balloons wisely.

Note:

You may imagine nums[-1] = nums[n] = 1. They are not real therefore you can not burst them.
0 ≤ n ≤ 500, 0 ≤ nums[i] ≤ 100
Example:

Input: [3,1,5,8]
Output: 167 
Explanation: nums = [3,1,5,8] --> [3,5,8] -->   [3,8]   -->  [8]  --> []
             coins =  3*1*5      +  3*5*8    +  1*3*8      + 1*8*1   = 167
 */
/**
 * Algorithm1: DP 
 * 0. First thought: n balloons to burst, n steps in the game, after burst, there is n-1 choices
 *    to select to burst. To sum up, cost O(n!) to finish bursting all the balloons.
 * 1. Since the coins to get are independant from the balloons are already bursted, divide the 
 *    subquestions by "the last balloon to burst"
 * 2. Declare table[n][n] to store max coins between left and right boundary(include)
 * 3. Use a for loop to set k from 2 to n-1 to specify the gap between left and right balloon
 * 4. Use a for loop to set boundary left from 0 to n-k-1 
 * 5. Set boundary right = left + k
 * 6. Use a for loop i from left+1 to right-1 
 * 7. table[left][right] = max(table[left][right], nums[left]*nums[i]*nums[right] + table[left][i] + table[i][right])
 * 8. return table[0][n-1]
 * 
 * T: O(n^3)
 * S: O(n^2)
 */

 /**
  * Return maximum coins earned by bursting the balloons
  * @param {number[]} nums
  * @return {number}
  */
 const maxCoins = function(nums) {
    // Add nums[-] = 1 and nums[n+1] = 1 to nums
    let newNums = new Array(nums.length+2).fill(0);
    newNums[0] = 1;
    for (let i = 0; i < nums.length; i += 1) {
        newNums[i+1] = nums[i];    
    }
    newNums[newNums.length-1] = 1;
    
    // Initiate table[n][n]
    let n = newNums.length;
    table = [];
    for (let i = 1; i <= n; i += 1) {
        table.push(new Array(n).fill(0));
    }

    for (let k = 2; k < n; k += 1) {
        for (let left = 0; left < n-k; left += 1) {
            let right = left + k;
            for (let i = left+1; i < right; i += 1) {
                table[left][right] = Math.max(table[left][right], 
                newNums[left] * newNums[i] * newNums[right] + table[left][i] + table[i][right]);
            }
        }
    }

    return table[0][n-1];
 }

 /**
  * Algorithm2: Recursive(D&C) + Memorization
  */
  /**
  * Return maximum coins earned by bursting the balloons
  * @param {number[]} nums
  * @return {number}
  */
 const maxCoins = function(nums) {
    // Add nums[-] = 1 and nums[n+1] = 1 to nums
    let newNums = new Array(nums.length+2).fill(0);
    newNums[0] = 1;
    for (let i = 0; i < nums.length; i += 1) {
        newNums[i+1] = nums[i];    
    }
    newNums[newNums.length-1] = 1;
    
    // Initiate table[n][n]
    let n = newNums.length;
    table = [];
    for (let i = 1; i <= n; i += 1) {
        table.push(new Array(n).fill(0));
    }

    return helper(table, newNums, 0, n-1);
}

/**
 * Helper function to return max coins in given left and right boundary
 * @param {number[][]} table passed in so that we can access table in helper function
 * @param {number[]} nums passed in so that we can access newNums in helper function
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
const helper = function(table, nums, left, right) {
    if (left + 1 == right) return 0;
    if (table[left][right] !== 0) return table[left][right]; // Avoid update

    let result = 0;
    for (let i = left+1; i < right; i += 1) {
        let leftCoin = helper(table, nums, left, i);
        let rightCoin = helper(table, nums, i, right);
        result = Math.max(result, nums[left] * nums[i] * nums[right] + leftCoin + rightCoin);
    }

    table[left][right] = result; // Memorization
    return result;
}