/**
 * FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
 */
let test = [1];

for (let i = 0; i < test.length; i += 1) {
    test.push(2);
}

console.log(test);