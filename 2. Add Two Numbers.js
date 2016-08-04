/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    if (l1 === null || l2 === null) {
        return null;
    }

    let result = new ListNode(0);
    let current = result;
    let val1 = 0;
    let val2 = 0;
    let carry = 0;

    while (l1 || l2) {
        if (l1) {
            val1 = l1.val;
            l1 = l1.next;
        } else {
            val1 = 0;
        }

        if (l2) {
            val2 = l2.val;
            l2 = l2.next;
        } else {
            val2 = 0;
        }

        let sum = val1 + val2 + carry;
        current.next = new ListNode(sum % 10);
        carry = Math.floor(sum / 10);
        current = current.next;
    }

    if (carry !== 0) {
        current.next = new ListNode(carry);
    }

    return result.next;

}
