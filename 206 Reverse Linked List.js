'use strict';
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
    if (head === null || head.next === null) {
        return head;
    }

    let prev = null;
    let current = head;
    let next = null;
    while (current !== null) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}
