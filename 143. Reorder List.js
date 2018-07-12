/**
Given a singly linked list L: L0→L1→…→Ln-1→Ln,
reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

You may not modify the values in the list's nodes, only nodes itself may be changed.

Example 1:

Given 1->2->3->4, reorder it to 1->4->2->3.
Example 2:

Given 1->2->3->4->5, reorder it to 1->5->2->4->3.
 */
/**
 * Algorithm: Fast and slow pointers
 * 1. Find the mid node with fast and slow pointers
 * 2. Reverse the half list after mid node
 * 3. Reorder one by one with first half and second half
 */
/**
 * @param {ListNode} head
 * @return {void}
 */
const reorderList = function(head) {
    if (head === null) return;

    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Reverse the half after mid node
    let mid = slow;
    let node = slow.next;
    if (node !== null) {
        let temp = node.next;
        node.next = null;
        node = temp;
    }

    while (node !== null) {
        let temp = node.next;
        node.next = mid.next;
        mid.next = node;
        node = temp;
    }

    // Reorder and merge the two lists
    first = head;
    second = mid.next;
    while (second !== null) {
        mid.next = second.next;
        second.next = first.next;
        first.next = second;
        first = second.next;
        second = mid.next;
    }
}