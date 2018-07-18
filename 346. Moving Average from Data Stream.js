/**
Given a stream of integers and a window size, calculate the moving average 
of all integers in the sliding window.

For example,
MovingAverage m = new MovingAverage(3);
m.next(1) = 1
m.next(10) = (1 + 10) / 2
m.next(3) = (1 + 10 + 3) / 3
m.next(5) = (10 + 3 + 5) / 3
 */
/**
 * Algorithm: pointer
 * 1. Declare an array window[len] to store insert val
 * 2. Declare count to store how many numbers inserted, increment until count == window.length
 * 3. Declare a pointer insert = 0 to track the position for next insert val
 * 4. next(val): sum -= window[insert], s += val, window[insert] = val
 *    insert = (insert+1) % window.length, return sum / window.length
 */
class MovingAverage {
    constructor() {
        this.window = new Array(size).fill(0);
        this.count = 0;
        this.insert = 0;
        this.sum = 0;
    }

    next(val) {
        if (this.count < this.window.length) this.count += 1;

        this.sum -= this.window[this.insert];
        this.sum += val;
        this.window[this.insert] = val;
        this.insert = (this.insert+1) % this.window.length;
        return this.sum / this.count;
    }
}