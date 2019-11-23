/**
 * @param {string} S
 * @return {string}
 */
var removeOuterParentheses = function (S) {
  if (S === "") return "";
  let open = 0;
  let result = "";
  for (let c of S) {
    if (c === "(" && open++ > 0) result += c;
    // if (c ==="(") open += 1;
    if (c === ')' && open-- > 1) result += c;
    // if (c === ")") open -= 1;
  }

  return result;
};