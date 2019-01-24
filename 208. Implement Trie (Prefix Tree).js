/**
Implement a trie with insert, search, and startsWith methods.

Example:

Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // returns true
trie.search("app");     // returns false
trie.startsWith("app"); // returns true
trie.insert("app");   
trie.search("app");     // returns true
Note:

You may assume that all inputs are consist of lowercase letters a-z.
All inputs are guaranteed to be non-empty strings.
 */
/**
 * Leetcode Fundamental: 1/23/2019 Update
 * N: length of longest word
 * M: # words
 * K: # characters allowed
 * insert, search, startsWith: T: O(N), S: O(M*N*K)
 * 
 * If use hash table: T: O(logM) using height-balanced BST, S: O(M*N)
 * Worst case less likely to happen.
 */
function TrieNode() {
  this.isWord = false;
  this.childrenMap = new Map(); // key: char, value: list of TrieNodes
}

function Trie() {
  this.root = new TrieNode();

  // Inserts a word into the trie.
  this.insert = (word) => {
    let cur = this.root;
    for (let i = 0; i < word.length; i += 1) {
      let c = word[i];
      if (cur.childrenMap.get(c) === undefined) {
        // Insert a new node if the path does not exist
        cur.childrenMap.set(c, new TrieNode());
      }
      cur = cur.childrenMap.get(c);
    }
    cur.isWord = true;
  }

  // Returns if the word is in the trie.
  this.search = (word) => {
    let cur = this.root;
    for (let i = 0; i < word.length; i += 1) {
      let c = word[i];
      if (cur.childrenMap.get(c) === undefined) {
        return false;
      }
      cur = cur.childrenMap.get(c);
    }
    return cur.isWord;
  }

  // Returns if there is any word in the trie that starts with the given prefix.
  this.startsWith = (prefix) => {
    let cur = this.root;
    for (let i = 0; i < prefix.length; i += 1) {
      let c = prefix[i];
      if (cur.childrenMap.get(c) === undefined) {
        return false;
      }
      cur = cur.childrenMap.get(c);
    }
    return true;
  }
}