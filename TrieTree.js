class TrieNode {
  constructor(word) {
    this.word = word;
    this.isWord = false;
    this.children = new Map(); //(char, TrieNode)
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  insert(word) {
    let curr = this.root;
    let curChildren = curr.children;
    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      if (curChildren.get(char)) {
        curr = curChildren.get(char);
      } else {
        let newNode = new TrieNode(char);
        curChildren.set(char, newNode);
        curr = newNode;
      }

      curChildren = curr.children;
      if (i === word.length - 1) {
        curr.isWord = true;
      }
    }
  }

  search(word) {
    if (this.searchWordNodePos(word) === null) {
      return false;
    } else if (this.searchWordNodePos(word).isWord) {
      return true;
    } else return false;
  }

  startWith(prefix) {
    if (this.searchWordNodePos(prefix) === null) {
      return false;
    } else return true;
  }

  searchWordNodePos(word) {
    let children = this.root.children;
    let curr = null;
    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      if (children.get(char)) {
        curr = children.get(char);
        children = curr.children;
      } else {
        return null;
      }
    }

    return curr;
  }
}

let test1 = new Trie();
test1.insert('apple');
console.log(test1.root);
console.log(JSON.stringify(test1.root.children));
