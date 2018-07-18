/**
An abbreviation of a word follows the form <first letter><number><last letter>. Below are some examples of word abbreviations:

a) it                      --> it    (no abbreviation)

     1
     ↓
b) d|o|g                   --> d1g

              1    1  1
     1---5----0----5--8
     ↓   ↓    ↓    ↓  ↓    
c) i|nternationalizatio|n  --> i18n

              1
     1---5----0
     ↓   ↓    ↓
d) l|ocalizatio|n          --> l10n
Assume you have a dictionary and given a word, find whether its abbreviation is unique in the dictionary. A word's abbreviation is unique if no other word from the dictionary has the same abbreviation.

Example:

Given dictionary = [ "deer", "door", "cake", "card" ]

isUnique("dear") -> false
isUnique("cart") -> true
isUnique("cane") -> false
isUnique("make") -> true

Note:
A word is abbreviation unique in a list if and only if one of the two cases is true:
1. The word is in the dictionary, then there should be no other word with the same abbr
2. If the word is not in the dictionary, then the dictionary should have no word with the given word’s abbr
 */
/**
 * Algorithm:
 * 1. Maintain a map(abbr, count) to store abbreviation(word[0] + (word.length-2) + word[len-1]): count
 * 2. isUnique(word): 
 *      a. Make abbr from word
 *      b. Check if map[abbr] === 1
 */
class ValidWordAbbr {
    /**
     * @param {string[]} dictionary
     */
    constructor(dictionary) {
        this.map = {}; // (abbr, [word])
        for (let word of dictionary) {
            let abbr = word[0] + (word.length-2) + word[word.length-1];
            if (abbr in this.map && !this.map[abbr].includes(word)) {
                this.map[abbr].push(word);
            } else {
                this.map[abbr] = [word];
            }
        }
    }

    /** 
     * @param {string} word
     * @return {boolean}
     */
    isUnique(word) {
        let abbr = word[0] + (word.length-2) + word[word.length-1];
        // it's unique when the abbreviation does not exist in the map or
        // it's the only word in the set
        if (!this.map.hasOwnProperty(abbr) || this.map[abbr].includes(word) && this.map[abbr].length === 1) return true;
        return false;
    }
}