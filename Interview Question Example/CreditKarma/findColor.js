'use strict'

const colors = ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"]

/**
 * m: len(searchTerm)
 * n: len(color)
 * l: len(colors)
 * T: O(m*n^2*l)
 */
/**
 * 
 * @param {*} searchTerm 
 * @param {*} colors 
 */
function findColor(searchTerm, colors) {
  // Handle edge cases:
  // 1. empty inputs
  if (searchTerm === undefined || colors === undefined || colors.length === 0) return [];
  
  // 1. Brute Force: T: O(len(array) * maxlen(color)^2 * len(searchTerm))
  let result = [];
  for (let color of colors) { // O(len(array))
    let start = 0; // (inclusive)
    let i = 0;
    for (i = 0; i < searchTerm.length; i += 1) { // O(len(searchTerm))
      let nextStart = color.slice(start).indexOf(searchTerm[i]); // O(maxlen(color)^2)
      if ( nextStart === -1) break; // cannot find searchTerm[i] in color.slice(start)

      start = nextStart;
    }

    if (i === searchTerm.length) result.push(color);
  }
        
  return result;
}

// antiquewhite
// u q i
// i
// a n t i q u e w h i t e
//   s
  
/**
 * Revisit: 11/28 Update
 * 72. Edit Distance with only insert allowed
 * insert string1 and string2: "abbc" -> "ac" = "abb" -> "a" (i, j-1)
 * 
 * m: len(searchTerm)
 * n: len(color)
 * l: len(colors)
 * T: O(m*n*l)
 */
function findColor2(searchTerm, colors) {
  // Handle edge cases:
  // 1. empty inputs
  if (searchTerm === undefined || colors === undefined || colors.length === 0) return [];
  let result = [];
  for (let color of colors) { // O(l)
    if (isConvertable(searchTerm, color)) result.push(color);
  }

  return result;
}

/**
 * Given two words word1 and word2, find if it is possible to convert word1 to word2.
 * 
 * @param {string} word1 
 * @param {string} word2 
 */
var isConvertable = function(word1, word2) {
  let m = word1.length;
  let n = word2.length;

  let dp = new Array(m+1);
  for (let i = 0; i < m + 1; i += 1) {
    dp[i] = new Array(n+1);
  }

  for (let i = 0; i < m+1; i += 1) {
    dp[i][0] = i;
  }

  for (let j = 0; j < n+1; j += 1) {
    dp[0][j] = j;
  }

  // O(m*n)
  for (let i = 1; i < m+1; i += 1) {
    for (let j = 1; j < n+1; j += 1) {
      if (word1[i-1] === word2[j-1]) {
        dp[i][j] = dp[i-1][j-1];
      } else {
        dp[i][j] = Math.min(dp[i-1][j-1], dp[i][j-1]) + 1;
      }
    }
  }

  return dp[m][n] === n - m;
};

let test1a = findColor('ua', colors)
let test2a = findColor2('ua', colors)
console.log(test1a.toString() === test2a.toString());
// [ 'aqua', 'aquamarine', 'fuchsia', 'mediumaquamarine', 'mediumseagreen', 'mediumslateblue' ]
let test1b = findColor('uqi', colors)
let test2b = findColor2('uqi', colors)
console.log(test1b.toString() === test2b.toString());
// [ 'darkturquoise', 'mediumaquamarine', 'mediumturquoise', 'paleturquoise', 'turquoise' ]

let test1c = findColor('zre', colors)
let test2c = findColor2('zre', colors)
console.log(test1c.toString() === test2c.toString());
// [ 'azure' ]

let test1d = findColor('gold', colors)
let test2d =findColor2('gold', colors)
console.log(test1d.toString() === test2d.toString());
// [ 'darkgoldenrod', 'gold', 'goldenrod', 'lightgoldenrodyellow', 'palegoldenrod' ]

