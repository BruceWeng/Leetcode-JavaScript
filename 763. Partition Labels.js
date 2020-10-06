/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function (S) {
  if (S === undefined || S.length === 0) return [];
  let result = [];
  let lastIndex = new Map();
  for (let i = 0; i < S.length; i++) lastIndex.set(S[i], i);

  let end = 0;
  let start = 0;
  for (let i = 0; i < S.length; i++) {
    end = Math.max(end, lastIndex.get(S[i]));
    if (i === end) {
      result.push(end - start + 1);
      start = end + 1;
    }
  }
  return result;
};