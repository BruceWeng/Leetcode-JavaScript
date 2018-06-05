/**
 *
Given a string s1, we may represent it as a binary tree by partitioning it to
two non-empty substrings recursively.

Below is one possible representation of s1 = "great":

    great
   /    \
  gr    eat
 / \    /  \
g   r  e   at
           / \
          a   t
To scramble the string, we may choose any non-leaf node and swap its two children.

For example, if we choose the node "gr" and swap its two children, it produces a
scrambled string "rgeat".

    rgeat
   /    \
  rg    eat
 / \    /  \
r   g  e   at
           / \
          a   t
We say that "rgeat" is a scrambled string of "great".

Similarly, if we continue to swap the children of nodes "eat" and "at", it produces
a scrambled string "rgtae".

    rgtae
   /    \
  rg    tae
 / \    /  \
r   g  ta  e
       / \
      t   a
We say that "rgtae" is a scrambled string of "great".

Given two strings s1 and s2 of the same length, determine if s2 is a scrambled
string of s1.

Example 1:

Input: s1 = "great", s2 = "rgeat"
Output: true
Example 2:

Input: s1 = "abcde", s2 = "caebd"
Output: false
 */
/**
 * Algorithm:
 * Recursively call isScramble(s1[:i], s2[:i]) and isScramble(s1[i:], s2[i:]),
 *                  if both true, return true
                    isScramble(s1[:i], s2[s2.length - i:]) and isScramble(s1[s1.length - i:], s2[:i]),
 *                  if both true, return true
 * Else: return false
 * Declare a map letter[26] to memorize counts of letters in s1 and s2.
 * If character shows in s1, letter[int(s1[i]) - int('a')] += 1
                         s2, letter[int(s2[i]) - int('a')] -= 1
 * Check all the characters in letter[26], if letter[i] != 0: return false
 */
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
 function isScramble(s1, s2) {
     if (s1 === s2) {
         return true;
     }

     let letters = new Array(26).fill(0);
     console.log(letters);
     for (let i = 0; i < s1.length; i += 1) {
         letters[s1.charCodeAt(i) - "a".charCodeAt(0)] += 1;
         console.log(s1.charCodeAt(i));
         console.log("a".charCodeAt(0));
         console.log(letters);
         letters[s2.charCodeAt(i) - "a".charCodeAt(0)] -= 1;
     }

     for (let i = 0; i < 26; i += 1) {
         if (letters[i] !== 0) {
             return false;
         }
     }

     for (let i = 0; i < s1.length; i += 1) {
         if ( isScramble(s1.slice(0, i), s2.slice(0, i)) && isScramble(s1.slice(i), s2.slice(i)) ) {
             return true;
         }

         if ( isScramble(s1.slice(0, i), s2.slice(s2.length - i)) && isScramble(s1.slice(s1.length - i), isScramble(s2.slice(0, i))) ) {
             return true;
         }
     }

     return false;
 }

const s1 = "great";
const s2 = "rgeat";

console.log(isScramble(s1, s2));
