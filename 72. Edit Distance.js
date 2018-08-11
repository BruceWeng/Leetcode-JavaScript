/**
 * string1: "abb" -> string2: "ac"
 * 1. delete string1: "ab" -> "ac" (i-1, j)
 * 2. insert string1 and string2: "abbc" -> "ac" = "abb" -> "a" (i, j-1)
 * 3. replace string1: "abc" -> "ac" = "ab" -> "a" (i-1, j-1)
 */
/**
 * Given two words word1 and word2, find the minimum number of operations 
 * required to convert word1 to word2.
 * 
 * @param {string} word1 
 * @param {string} word2 
 */
var minDistance = function(word1, word2) {
    let n = word1.length;
    let m = word2.length;

    let dp = new Array(n+1);
    for (let x = 0; x < m + 1; x++) {
        dp[x] = new Array(m + 1);
    }

    for (let y = 0; y < n + 1; y++) {
        dp[y][0] = y;
    }

    for (let x = 0; x < m + 1; x++) {
      dp[0][x] = x;
    }

    for (let y = 1; y < n + 1; y++) {
        for (let x = 1; x < m + 1; x++) {
            if (word1[y - 1] === word2[x - 1]) {
                dp[y][x] = dp[y - 1][x - 1];
            } else {
                dp[y][x] = Math.min(dp[y - 1][x - 1], Math.min(dp[y - 1][x], dp[y][x - 1])) + 1;
            }
        }
    }

    console.log(dp);
    return dp[n][m];
};

let test2 = 'orange';
let test1 = 'apple';
console.log(minDistance(test1, test2)); //6
