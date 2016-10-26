/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */

 /**
  * Solution1: DFS and find kth number
  * Time: O(n!) Time Limit Exceeded
  */

  /**
   * Solution2: Math
   * http://bangbingsyb.blogspot.com/2014/11/leetcode-permutation-sequence.html
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

console.log(getPermutation(8, 31492));//1
