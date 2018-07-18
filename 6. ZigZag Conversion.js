/**
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like
this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);
Example 1:

Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
Example 2:

Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:

P     I    N
A   L S  I G
Y A   H R
P     I
 */
/**
 * EX: s= PALPALISHIRING, nRow = 4
 * 1. Declare a 2D array zigzag[nRow][] to store Zigzag string
 * 2. while i < len:
 *      a. Vertically down append s[i] to zigzag[idx] (idx(0, nRow))
 *          [
 *              [P],
 *              [A],
 *              [Y],
 *              [P]
 *          ]
 *      b. Obliquely up append s[i] to zigzag[idx]  (idx(nRow-2, 0))
 *          [
 *              [P],
 *              [A, L],
 *              [Y, A],
 *              [P]
 *          ]
 *      a. 
 *          [
 *              [P, I],
 *              [A, L, S],
 *              [Y, A, H],
 *              [P, I]
 *          ]
 *      b. 
 *          [
 *              [P, I],
 *              [A, L, S, I],
 *              [Y, A, H, R],
 *              [P, I]
 *          ]
 *      a. 
 *          [
 *              [P, I, N],
 *              [A, L, S, I, G],
 *              [Y, A, H, R],
 *              [P, I]
 *          ]
 *  3. Return flatten zigzag array.toString
 * 
 * T: O(n)
 * S: O(n)
 */
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
const convert = function(s, numRows) {
    let len = s.length;
    let zigzag = [];

    // Construct 2D zigzag array
    for (let i = 0; i < numRows; i += 1) {
        zigzag.push(new Array());
    }

    let i = 0; // i(0, len)
    while (i < len) {
        // Vertical down
        for (let idx = 0; idx < numRows && i < len; idx += 1) {
            zigzag[idx].push(s[i]);
            i += 1;
        }

        // Obliquely up
        for (let idx = numRows-2; idx > 0 && i < len; idx -= 1) {
            zigzag[idx].push(s[i]);
            i += 1;
        }
    }

    // Flatten zigzag
    let result = "";
    for (let i = 0; i < numRows; i += 1) {
        for (let j = 0; j < zigzag[i].length; j += 1) {
            result += zigzag[i][j];
        }
    }

    return result;
}