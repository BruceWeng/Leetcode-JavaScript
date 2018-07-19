/**
Design and implement a TwoSum class. It should support the following operations: add and find.

add - Add the number to an internal data structure.
find - Find if there exists any pair of numbers which sum is equal to the value.

Example 1:

add(1); add(3); add(5);
find(4) -> true
find(7) -> false
Example 2:

add(3); add(1); add(2);
find(3) -> true
find(6) -> false
 */
/**
 * Algorithm1: Frequent add, less find (large dataset)
 * In constructor:
 * 1. Declare map(number: count) to store number and how many times it is added to 
 * In add(number): O(1)
 * 1. If number in map: map[number] += 1, else: map[number] = 1
 * In find(value): O(n)
 * 1. Use map.keys to iterate all the numbers in map as a
 * 2. let b = value - a
 * 3. If a == b: check if there is more than more count in map[a] return true
 * 4. If b in map: return true
 * 5. return false
 * 
 * Algorithm2: Frequent find, less add
 * In constructor:
 * 1. Declare nums:set(number) to store numbers added in
 * 2. Declare sum:set(number) to store valid two sum
 * In add(number): O(n^2):
 * 1. If number in nums: sum.add(num*2)
 * 2. else: iterate num in nums and sum.add(num+number)
 * In find(value): O(1):
 * 1. return value in sum
 */
// Algorithm1
class TwoSum {
    constructor() {
        this.map = {};
    }

    /**
     * Add the number to an internal data structure.. 
     * @param {number} number
     * @return {void}
     */
    add(number) {
        // Construct map(something, count) SOP!
        this.map[number] = this.map[number] || 0;
        this.map[number] += 1;
    }

    /**
     * Find if there exists any pair of numbers which sum is equal to the value. 
     * @param {number} value
     * @return {boolean}
     */
    find(value) {
        for (let key in this.map) {
            // Remember to parse key into number!
            /**
             * If not Number(key)
             * typeof key === 'string'
             * diff = 0 - '0' = 0
             */
            key = Number(key);
            let diff = value - key;
            if (key === diff && this.map[key] > 1) return true;
            if (key !== diff && this.map.hasOwnProperty(diff)) return true;
        }
        return false
    }
}

let twoSum = new TwoSum();
twoSum.add(0);
console.log(twoSum.find(0)); // false

// Algorithm2
class TwoSum2 {
    constructor() {
        this.nums = new Set();
        this.sum = new Set();
    }

        /**
     * Add the number to an internal data structure.. 
     * @param {number} number
     * @return {void}
     */
    add(number) {
        if (this.nums.has(number)) {
            this.sum.add(number*2);
        } else {
            for (let num of this.nums) {
                this.sum.add(number+num);
            }
    
            this.nums.add(number);
        }
    }

    /**
     * Find if there exists any pair of numbers which sum is equal to the value. 
     * @param {number} value
     * @return {boolean}
     */
    find(value) {
        return this.sum.has(value);
    }
}