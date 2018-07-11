/**
Given a non-negative integer represented as non-empty a singly linked list of digits, 
plus one to the integer.

You may assume the integer do not contain any leading zero, except the number 0 itself.

The digits are stored such that the most significant digit is at the head of the list.

Example:
Input:
1->2->3

Output:
1->2->4
 */
/**
 * Algorithm: Fast and slow pointers
 * 0. If head == null: return new ListNode(1)
 * 1. Declare dummy.next = head, fast = dummy, slow = dummy
 * 2. Find last non-9 node, move slow to the node (There is possible multiple 9 nodes after slow)
 * 3. Fast now is the last node, if fast.val != null, fast.val += 1, return dummy.next
 * 4. Else: slow.val += 1 and slow = slow.next
 * 5. Change all the value starting from slow to the last node to 0
 * 6. If dummy.val == 1, return dummy, else return dummy.next
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const plusOne = function(head) {
    if (head === null) return new ListNode(1);

    let dummy = new ListNode(0);
    dummy.next = head;
    let slow = dummy;
    let fast = dummy;

    // Find last non-9 node and move slow to the node and move fast to the last node
    while (fast.next !== null) {
        if (fast.val !== 9) {
            slow = fast;
        }
        fast = fast.next;
    }

    // If fast.val != 9, increment fast.val and return dummy.next; otherwise, increment 
    // slow.val and change all the values after slow to the last node to 0
    if (fast.val !== 9) {
        fast.val += 1;
        return dummy.next;
    } else {
        slow.val += 1;
        slow = slow.next;
    }

    while (slow !== null) {
        slow.val = 0;
        slow = slow.next;
    }

    return dummy.val === 1 ? dummy : dummy.next;
}