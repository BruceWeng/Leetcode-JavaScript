/**
Design a Phone Directory which supports the following operations:

get: Provide a number which is not assigned to anyone.
check: Check if a number is available or not.
release: Recycle or release a number.
Example:

// Init a phone directory containing a total of 3 numbers: 0, 1, and 2.
PhoneDirectory directory = new PhoneDirectory(3);

// It can return any available phone number. Here we assume it returns 0.
directory.get();

// Assume it returns 1.
directory.get();

// The number 2 is available, so return true.
directory.check(2);

// It returns 2, the only number that is left.
directory.get();

// The number 2 is no longer available, so return false.
directory.check(2);

// Release number 2 back to the pool.
directory.release(2);

// Number 2 is available again, return true.
directory.check(2);
 */
/**
 * Algorithm: Set + Queue
 * 1. Declare a set numUsed to store used number
 * 2. Declare a array as queue to store available numbers
 * 3. Declare a variable max to store maxNumbers
 */
class PhoneDirectory {
    constructor(maxNumbers) {
        this.set = new Set();
        this.queue = [];
        this.max = maxNumbers;

        for (let i = 0; i < maxNumbers; i += 1) {
            this.queue.push(i);
        }
    }

    /**
     * Provide a number which is not assigned to anyone.
            @return - Return an available number. Return -1 if none is available.
     * @return {number}
     */
    get() {
        if (this.queue.length === 0) return -1;
        let result = this.queue.shift();
        this.set.add(result);
        return result;
    }

    /**
     * Check if a number is available or not. 
     * @param {number} number
     * @return {boolean}
     */
    check(number) {
        if (number >= this.max || number < 0) {
            return false;
        }

        return !this.set.has(number);
    }

    /**
     * Recycle or release a number. 
     * @param {number} number
     * @return {void}
     */
    release(number) {
        if (this.set.delete(number)) {
            this.queue.push(number);
        }
    }
}