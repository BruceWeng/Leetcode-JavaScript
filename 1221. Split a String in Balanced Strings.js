/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function (s) {
  let result = 0;
  let Lcount = 0;
  let Rcount = 0;
  for (let c of s) {
    if (c === "L") Lcount += 1;
    if (c === "R") Rcount += 1;
    if (Lcount === Rcount) result += 1;
  }

  return result;
};