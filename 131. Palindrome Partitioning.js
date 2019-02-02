/**
Given a string s, partition s such that every substring of the partition is a palindrome.

Return all possible palindrome partitioning of s.

Example:

Input: "aab"
Output:
[
  ["aa","b"],
  ["a","a","b"]
]
 */
/**
 * Algorithm: Backtracking
 *  Note:
 *  1. Since we are going to use s.substring(index, i), the i upper boundary === s.length (Tricky)
 *
 */
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    let result = [];

    if (s === null || s.length === 0) {
        return result;
    }

    let path = [];

    function helper(index) {
        if (index === s.length) {
            result.push([...path]);
            return;
        }

        for (let i = index + 1; i <= s.length; i++) {
            let prefix = s.substring(index, i)
            if (!isPalindrome(prefix)) {
                continue;
            }

            path.push(prefix);
            helper(i);
            path.splice(path.length - 1, 1);
        }
    }

    function isPalindrome(prefix) {
        for (let i = 0; i < prefix.length / 2; i++) {
            if (prefix[i] !== prefix[prefix.length - 1 - i]) {
                return false;
            }
        }

        return true;
    }
    helper(0);

    return result;
};

let test1 = 'a'; // ['a']
let test2 = 'ab'; // ['a', 'b']
let test3 = 'aab'; //[['a', 'a', 'b'], ['aa', 'b']]

console.log(partition(test1));
console.log(partition(test2));
console.log(partition(test3));
