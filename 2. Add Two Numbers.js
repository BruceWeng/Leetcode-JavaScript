/**
You are given two non-empty linked lists representing two non-negative integers. 
The digits are stored in reverse order and each of their nodes contain a single digit. 
Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
 */
/**
 * Algorithm: Two pointer
 * 0. Declare dummy = new ListNode(0); current = dummy;
 * 1. Declare two pointers val1 and val2 to track values for l1 and l2
 * 2. Declare carry to store the tenth digit of sum(val1 + val2 + carry)
 * 3. Move current.next = new ListNode(sum % 10)
 * 4. Move current = current.next
 * 5. return dummy.next
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    if (l1 === null || l2 === null) {
        return null;
    }

    let dummy = new ListNode(0);
    let current = dummy;
    let val1 = 0;
    let val2 = 0;
    let carry = 0;

    while (l1 !== null || l2 !== null) {
        if (l1 !== null) {
            val1 = l1.val;
            l1 = l1.next;
        } else {
            val1 = 0;
        }

        if (l2 !== null) {
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

    return dummy.next;
}
