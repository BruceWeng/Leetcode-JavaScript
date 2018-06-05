/**
 * @param {number[]} tickets
 * @param {number} p
 * @return {number}
 */
function waitingTime(tickets, p) {
    if (tickets.length === 0 || tickets === undefined || p < 0 ||
        p > tickets.length || p === undefined) {
            return 0;
        }

    let result = 0;
    while (tickets[p] !== 0) {
        for (let j = 0; j < tickets.length; j += 1) {
            if (tickets[p] === 0) {
                return result;
            }
            if (tickets[j] !== 0) {
                tickets[j] -= 1;
                result += 1;
            }
        }
    }

    return result;
}

let input1 = [2, 6, 3, 4, 5];
let p1 = 2;
let input2 = [1, 1, 1, 10];
let p2 = 3
console.log(waitingTime(input1, p1)); // 12
console.log(waitingTime(input2, p2)); // 13
