/**
Design a data structure that supports all following operations in average O(1) time.

Note: Duplicate elements are allowed.
insert(val): Inserts an item val to the collection.
remove(val): Removes an item val from the collection if present.
getRandom: Returns a random element from current collection of elements. The probability of 
each element being returned is linearly related to the number of same value the collection contains.
 */
/**
 * Algorithm: 
 * 1. Use array to store values, and use map to store <key: val:number, value: indices in array: set()>
 * 2. When removing the val:
 *    a. Get arbitary index of the Array that contains val
 *    b. Obtain the set of the number in the last place of the Array
 *    c. Replace val at arbitary index with very last number
 *    d. Remove appropriate index
 *    e. Remove map entry if set is now empty, then return
 */
class RandomizedCollection {
  constructor() {
    this.array = [];
    this.map = new Map();
  }

  insert(val) {
    let existed = this.map.has(val);
    if (!existed) {
      this.map.set(val, new Set());
    } 
    
    this.map.get(val).add(this.array.length);
    this.array.push(val);
    return !existed;
  }

  remove(val) {
    if (!this.map.has(val)) {
      return false;
    }
    
    let valSet = this.map.get(val);
    let indexToReplace = valSet.values().next().value;
    
    let lastVal = this.array[this.array.length - 1];
    let lastValSet = this.map.get(lastVal);

    this.array[indexToReplace] = lastVal;

    valSet.delete(indexToReplace);

    if (indexToReplace !== this.array.length - 1) {
      lastValSet.delete(this.array.length - 1);
      lastValSet.add(indexToReplace);
    }

    this.array.pop();

    if (valSet.size === 0) {
      this.map.delete(val);
    }

    return true;
  }

  getRandom() {
    let randomIndex = Math.floor(Math.random() * this.array.length);
    return this.array[randomIndex];
  }
}

let random = new RandomizedCollection();
console.log(random.insert(1));
console.log(random.remove(2));
console.log(random.insert(2));
console.log(random.getRandom());
console.log(random.remove(1));
console.log(random.insert(2));
console.log(random.getRandom());