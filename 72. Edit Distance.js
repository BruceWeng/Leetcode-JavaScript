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
