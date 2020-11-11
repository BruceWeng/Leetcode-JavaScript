class DLListNode {
  constructor(key, value, freq) {
    this.key = key;
    this.value = value;
    this.freq = freq;
    this.prev = null;
    this.next = null;
  }
}

class DLList {
  constructor(freq) {
    this.head = new DLListNode(-1, -1, freq);
    this.tail = new DLListNode(-1, -1, freq);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  addToHead(node) {
    node.next = this.head.next;
    node.next.prev = node;
    this.head.next = node;
    node.prev = this.head;
    this.size++;
  }

  delete(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
  }

  popFromTail() {
    if (this.isEmpty()) return null;
    let node = this.tail.prev;
    this.delete(node);
    return node;
  }
}

class LFUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.min_freq = 1;
    this.key_map = new Map(); // (key, DLListNode)
    this.freq_map = new Map(); // (freq, DLList)
    this.freq_map.set(1, new DLList(1));
  }

  _update(node) {
    let freq = node.freq;
    this.freq_map.get(freq).delete(node);
    if (this.min_freq === freq && this.freq_map.get(freq).isEmpty()) this.min_freq++;
    node.freq++;
    if (!this.freq_map.has(node.freq)) {
      let new_list = new DLList(node.freq);
      new_list.addToHead(node);
      this.freq_map.set(node.freq, new_list);
    } else {
      this.freq_map.get(node.freq).addToHead(node);
    }
    return node.value;
  }

  /** 
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (!this.key_map.has(key)) return -1;
    let node = this.key_map.get(key);
    return this._update(node);
  }

  /** 
   * @param {number} key 
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.capacity === 0) return;
    if (this.key_map.has(key)) {
      let node = this.key_map.get(key);
      node.value = value;
      this._update(node);
      return;
    }
    if (this.size === this.capacity) {
      let old_node = this.freq_map.get(this.min_freq).popFromTail();
      this.key_map.delete(old_node.key);
      this.size--;
    }
    let node = new DLListNode(key, value, 1);
    this.freq_map.get(1).addToHead(node);
    this.key_map.set(key, node);
    this.min_freq = 1;
    this.size++;
  }
}

/** 
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
let cache = new LFUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // returns 1
cache.put(3, 3); // evicts key 2
console.log(cache.get(2)); // returns -1 (not found)
console.log(cache.get(3)); // returns 3
cache.put(4, 4); // evicts key 1
console.log(cache.get(1)); // returns -1 (not found)
console.log(cache.get(3)); // returns 3
console.log(cache.get(4)); // returns 4

let cache2 = new LFUCache(1);
cache2.put(2, 1);
console.log(cache2.get(2)); // returns 1
cache2.put(3, 2); // evicts key 2
console.log(cache2.get(2)); // returns -1 (not found)
console.log(cache2.get(3)); // returns 2
