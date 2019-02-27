/**
Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

Example:

Input: S = "ADOBECODEBANC", T = "ABC"
Output: "BANC"
Note:

If there is no such window in S that covers all characters in T, return the empty string "".
If there is such window, you are guaranteed that there will always be only one unique minimum window in S.
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  if (t.length > s.length) return "";

  let end = 0;
  let start = 0;
  let map = new Map();
  for (let char of t) {
    if (!map.has(char)) map.set(char, 1);
    else map.set(char, map.get(char) + 1);
  }

  let counter = map.size;
  let length = s.length + 1;
  let head = 0;

  while (end < s.length) {
    let endChar = s[end];
    if (map.has(endChar)) {
      map.set(endChar, map.get(endChar) - 1);
      if (map.get(endChar) === 0) counter -= 1;
    }

    // end += 1; not to increase end here
    // end only moves when find at least one candidate answer

    while (counter === 0) {
      if (end - start + 1 < length) {
        length = end - start + 1;
        head = start;
      }
      let startChar = s[start];
      map.set(startChar, map.get(startChar) + 1);
      if (map.get(startChar) > 0) counter += 1;

      start += 1;
    }
    end += 1;
  }

  if (length === s.length + 1) return "";
  return s.slice(head, head + length);
};
