/**
Design a data structure that supports all following operations in average O(1) time.

insert(val): Inserts an item val to the set if not already present.
remove(val): Removes an item val from the set if present.
getRandom: Returns a random element from current set of elements. Each element must have 
the same probability of being returned.

// Init an empty set.
RandomizedSet randomSet = new RandomizedSet();

// Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomSet.insert(1);

// Returns false as 2 does not exist in the set.
randomSet.remove(2);

// Inserts 2 to the set, returns true. Set now contains [1,2].
randomSet.insert(2);

// getRandom should return either 1 or 2 randomly.
randomSet.getRandom();

// Removes 1 from the set, returns true. Set now contains [2].
randomSet.remove(1);

// 2 was already in the set, so return false.
randomSet.insert(2);

// Since 2 is the only number in the set, getRandom always return 2.
randomSet.getRandom();
 */
/**
 * Algorithm:
 * 1. Use array to store values, and use map to store <key: val, value: index in array>
 * 2. insert(val):
 *      if val in map:
 *        return false
 *      else:
 *        array.push(val)
 *        map[val] = array.length - 1
 *        return true
 * 3. remove(val):
 *      if val in map:
 *        index = map[val]
 *        update: map[lastVal] = index
 *        swap(num, index, lastIndex)
 *        array.pop()
 *        delete map[val]
 *        return true
 *      else:
 *        return false
 * 4. getRandom():
 *      randomIndex = Math.floor(Math.random() * array.length)
 *      return array[randomIndex]
 */
class RandomizedSet {
  constructor() {
    this.array = [];
    this.map = {};
  }

  /**
   * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
   * @param {number} val
   * @return {boolean}
   */
  insert(val) {
    if (val in this.map) {
      return false;
    } else {
      this.array.push(val);
      this.map[val] = this.array.length - 1;
      return true;
    }
  }

  /**
   * Removes a value from the set. Returns true if the set contained the specified element. 
   * @param {number} val
   * @return {boolean}
   */
  remove(val) {
    if (val in this.map) {
      let index = this.map[val];
      let lastVal = this.array[this.array.length - 1];

      // update map to change lastVal from length - 1 to index
      this.map[lastVal] = index;

      // swap val and lastVal
      this.swap(this.array, index, this.array.length - 1);
      this.array.pop();
      delete this.map[val];
      return true;
    } 
    else return false;
  }

  /**
   * Get a random element from the set.
   * @return {number}
   */
  getRandom() {
    let randomIndex = Math.floor(Math.random() * this.array.length);
    return this.array[randomIndex];
  }
    
  swap(num, i, j) {
      [ num[i], num[j] ] = [ num[j], num[i] ];
  }
}