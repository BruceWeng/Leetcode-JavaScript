/**
Design a logger system that receive stream of messages along with its timestamps, each message 
should be printed if and only if it is not printed in the last 10 seconds.

Given a message and a timestamp (in seconds granularity), return true if the message should be 
printed in the given timestamp, otherwise returns false.

It is possible that several messages arrive roughly at the same time.

Example:

Logger logger = new Logger();

// logging string "foo" at timestamp 1
logger.shouldPrintMessage(1, "foo"); returns true; 

// logging string "bar" at timestamp 2
logger.shouldPrintMessage(2,"bar"); returns true;

// logging string "foo" at timestamp 3
logger.shouldPrintMessage(3,"foo"); returns false;

// logging string "bar" at timestamp 8
logger.shouldPrintMessage(8,"bar"); returns false;

// logging string "foo" at timestamp 10
logger.shouldPrintMessage(10,"foo"); returns false;

// logging string "foo" at timestamp 11
logger.shouldPrintMessage(11,"foo"); returns true;
 */
/**
 * Algorithm: HashMap
 * 1. Declare a map(message, timestamp)
 * 2. if message in this.map and timestamp < this.map[message]: return false
 * 3. otherwise, either initate this.map[message] = timestamp + 10 or update the this.map[message]
 * 4. return true
 */
class Logger {
    constructor() {
        this.map = {};
    }

    /**
     * Returns true if the message should be printed in the given timestamp, otherwise returns false.
            If this method returns false, the message will not be printed.
            The timestamp is in seconds granularity. 
     * @param {number} timestamp 
     * @param {string} message
     * @return {boolean}
     */
    shouldPrintMessage(timestamp, message) {
        if (message in this.map) {
            if (timestamp < this.map[message]) return false;
        }
        this.map[message] = timestamp + 10;
        return true;
    }
}

let logger = new Logger();

console.log(logger.shouldPrintMessage(1, "foo"));//  returns true; 

console.log(logger.shouldPrintMessage(2,"bar")); // returns true;

console.log(logger.shouldPrintMessage(3,"foo")); // returns false;

console.log(logger.shouldPrintMessage(8,"bar")); // returns false;

console.log(logger.shouldPrintMessage(10,"foo"));//  returns false;

console.log(logger.shouldPrintMessage(11,"foo"));//  returns true;
