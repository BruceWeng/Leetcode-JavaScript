
/**
 * Note:
 * 1. Double Linked List: ListNode(key, val, prev, next)
 * 2. LRUCache(head, tail, size, capacity, map, attachToHead, moveToHead, removeLast)
 * 3. Check empty node: typeof node !== 'undefined'
 */
'use strict';
function ListNode(key, val) {
  this.key = key;
  this.val = val;
  this.prev = null;
  this.next = null;
}

/**
 * @constructor
 */
var LRUCache = function(capacity) {
  this.head = new ListNode(-1, -1);
  this.tail = new ListNode(-1, -1);
  this.head.next = this.tail;
  this.tail.prev = this.head;
  this.size = 0;
  this.capacity = capacity;
  this.map = new Map();

  this.attachToHead = function (node) {
    node.next = this.head.next;
    node.next.prev = node;
    this.head.next = node;
    node.prev = this.head;
  }

  this.moveToHead = function (node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.attachToHead(node);
  }

  this.removeLast = function () {
    let last = this.tail.prev;
    last.prev.next = this.tail;
    this.tail.prev = last.prev;
    this.map.delete(last.key);
  }

};

/**
 * @param {number} key
 * @returns {number}
 */
LRUCache.prototype.get = function(key) {
  let node = this.map.get(key);
  if (typeof node !== 'undefined') {
    this.moveToHead(node);
    return node.val;
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @returns {void}
 */
LRUCache.prototype.set = function(key, value) {
  let node = this.map.get(key);
  if (typeof node === 'undefined') {
    node = new ListNode(key, value);
    this.attachToHead(node);
    this.size++;
  } else {
    node.val = value;
    this.moveToHead(node);
  }

  if (this.size > this.capacity) {
    this.removeLast();
    this.size--;
  }
  this.map.set(key, node);
};

let cache = new LRUCache(10);
cache.set(10, 13);
cache.set(3, 17);
cache.set(6, 11);
cache.set(10, 5);
cache.set(9, 10);
console.log(cache.get(13));
cache.set(2, 19);
console.log(cache.get(2));
console.log(cache.get(13));
