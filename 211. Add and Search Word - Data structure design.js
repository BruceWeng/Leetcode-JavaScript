/**
Design a data structure that supports the following two operations:

void addWord(word)
bool search(word)
search(word) can search a literal word or a regular expression string containing only 
letters a-z or .. A . means it can represent any one letter.
 */
/**
 * Data Structure: Trie Tree
 * addWord - O(m) - m is the length of the new word
 * search - O(n) - n is the total number of characters in all words
 */
class TrieNode {
  constructor() {
    this.isWord = false;
    this.children = {}; //(char, TrieNode)
  }
}

class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }
  /**
   * Adds a word into the data structure. 
   * @param {string} word
   * @return {void}
   */
  addWord(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isWord = true;
  }
  
  /**
   * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter. 
   * @param {string} word
   * @return {boolean}
   */
  search(word) {
    const stack = [{ i: 0, node: this.root }];
    
    while (stack.length) {
      const { i, node } = stack.pop();

      if (i === word.length) {
        if (node.isWord) return true;
        continue;
      }
      
      const char = word[i];
      if (char === '.') {
        if (!node.children) continue;

        for (const c in node.children) {
          const sub = node.children[c];
          stack.push({ i: i + 1, node: sub });
        }
      } else {
        if (!node.children[char]) continue;

        stack.push({ i: i + 1, node: node.children[char] });
      }
    }
    
    return false;
  }
}

let dict = new WordDictionary();
dict.addWord("bad");
dict.addWord("dad");
dict.addWord("mad");
console.log(dict.search("pad")); // false
console.log(dict.search("bad")); // true
console.log(dict.search(".ad")); // true
console.log(dict.search("b..")); // true