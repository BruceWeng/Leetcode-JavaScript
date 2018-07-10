/**
Given a linked list, swap every two adjacent nodes and return its head.

Example:

Given 1->2->3->4, you should return the list as 2->1->4->3.
Note:

Your algorithm should use only constant extra space.
You may not modify the values in the list's nodes, only nodes itself may be changed.
 */
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
/**
 * Algorithm1: Recursive
 * 1. swapPairs itself is a recursive function
 * 2. Termination condition:
 *      if head == null or head.next == null: return head
 * 3. Recursive condition:
 *      newHead = swapPairs(head.next.next)
 *      next = head.next
 *      next.next = head
 *      head.next = newHead
 *      return next
 */
const swapPairs = function(head) {
    if (head === null || head.next === null) {
        return head;
    }

    newHead = swapPairs(head.next.next);
    next = head.next;
    next.next = head;
    head.next = newHead;
    return next;
}

/**
 * Algorithm2: Iterative
 * 1. Declare a dummy node and dummy.next = head, pre = dummy
 * 2. while head != null and head.next != null:
 *      next = head.next
 *      head.next = next.next
 *      next.next = head
 *      pre.next = next
 *      pre = head
 *      head = head.next
 * 3. Return dummy.next
 */
const swapPairs2 = function(head) {
    let dummy = new ListNode(0);
    dummy.next = head;
    pre = dummy;

    while (head != null && head.next != null) {
        next = head.next;
        head.next = next.next;
        next.next = head;
        pre.next = next;
        pre = head;
        head = head.next;
    }

    return dummy.next;
}

