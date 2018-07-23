/**
The set [1,2,3,...,n] contains a total of n! unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for n = 3:

"123"
"132"
"213"
"231"
"312"
"321"
Given n and k, return the kth permutation sequence.

Note:

Given n will be between 1 and 9 inclusive.
Given k will be between 1 and n! inclusive.
Example 1:

Input: n = 3, k = 3
Output: "213"
Example 2:

Input: n = 4, k = 9
Output: "2314"
 */
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */

/**
 * Solution1: DFS and find kth number
 * Time: O(n!) Time Limit Exceeded
 * 
 * Solution2: Math
 * http://bangbingsyb.blogspot.com/2014/11/leetcode-permutation-sequence.html
 * 
 * ex: n = 4, k = 9
 * 0. Declare factorial[n] stores factorial number from 1 to n [1, 1, 2, 6, 24]
 *    Declare num[n] stores available numbers from 1 to n for sub permutations [1, 2, 3, 4]
 * 1. There are totally 4! permutations, result[0] can be {1, 2, 3, 4} 
 *    and each result has 3! for result[1:]
 * 2. k -= 1 (for edge case: n = 1, k = 1, k -= 1, index = k / factorial[n-1] = 0/1 = 1), only for first time
 * 3. Find the position for result[0]: 
 *    index = k / factorial[n-1] = 9 / fctorial[3] = 8 / 6 = 1
 *    result[0] = num[index] = num[1] = 2
 * 4. Next k = k % factorial[n-1] = 8 % 6 = 2
 * 5. Delete 2 in num, num = {1, 3, 4}, n -= 1 = 3
 * 6. k = 2, index = k / factorial[n-1] = 1 / factorial[3-1] = 2 / 2 = 1
 * 7. result[1] = num[index] = num[1] = 3
 * 8. Next k = k % factorial[n-1] = 2 % 2 = 0
 * 9. Delete 3 in num, num = {1, 4}, n -= 1 = 2
 * 10. index = k / factorial[n-1] = 0 / factorial[2-1] = 0 / 2 = 0
 * 11. result[2] = num[index] = num[0] = 1
 * 12. Next k = k % factorial[n-1] = 0 % 2 = 0
 * 13. Delete 1 in num, num = {4}, n -= 1 = 1
 * 14. index = k / factorial[n-1] = 0 / factorial[0] = 0 / 1 = 0
 * 15. result[3] = num[index] = num[0] = 4
 * 16. Next k = k % factorial[n-1] = doesn't matter
 * 17. Delete 4 in num, num = {}, n -= 1 = 0, end loop
 * 18. Return result
 *      
 * T: O(n^2) (splice operation cost O(n))
 * S: O(n)
 */

/**
 * Solution1
 */
var getPermutation = function(n, k) {
    let result = [];

    if (n === 0 || k <= 0) {
        return '';
    }

    let path = [];

    function helper() {
        if (path.length === n) {
            result.push([...path].join(''));
            return;
        }

        for (let i = 1; i <= n; i++) {
            if (path.includes(i)) {
                continue;
            }
            path.push(i);
            helper();
            path.splice(path.length - 1, 1);
        }
    }

    helper();

    return result[k - 1];
};

/**
 * Solution2
 */
const getPermutation2 = function(n, k) {
    let result = [];
    let factorial = new Array(n).fill(1);
    let num = new Array(n).fill(1);

    for (let i = 1; i < n; i += 1) {
        factorial[i] = factorial[i-1]*i;
    }

    for (let i = 0; i < n; i += 1) {
        num[i] = String(i+1);
    }

    k -= 1;
    for (let i = n; i >= 1; i -= 1) {
        let index = Math.floor(k / factorial[i-1]);
        k %= factorial[i-1];
        result.push(num[index]);
        // splice operation cost O(n)
        num.splice(index, 1);
    }

    return result.join("");
};

let n1 = 3;
let k1 = 3;

let n2 = 4;
let k2 = 9;

console.log(getPermutation2(n1, k1)); // "213"
console.log(getPermutation(n2, k2)); // "2314"