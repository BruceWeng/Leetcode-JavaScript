/**
Reverse a linked list from position m to n. Do it in one-pass.

Note: 1 ≤ m ≤ n ≤ length of list.

Example:

Input: 1->2->3->4->5->NULL, m = 2, n = 4
Output: 1->4->3->2->5->NULL
 */
/**
 * Algorithm: Four pointers dummy, pre, start, then
 * 0. if head == null: return head
 * 1. dummy = new ListNode(0), dummy.next = head, pre = dummy
 * 2. find starting reverse node by moving pre = pre.next for m-1 steps
 * 3. start = pre.next, then = start.next
 * 4. Reverse start, then, and pre for n-m steps
 *      start.next = then.next
 *      then.next = pre.next
 *      pre.next = then
 *      then = start.next
 * 5. return dummy.next (Preserve head)
 */

/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
const reverseBetween = function(head, m, n) {
    if (head === null) {
        return head;
    }

    let dummy = new ListNode(0);
    dummy.next = head;
    let pre = dummy;

    // Find starting node
    for (let i = 0; i < m-1; i += 1) {
        pre = pre.next;
    }

    let start = pre.next;
    let then = start.next;

    // Start to reverse
    for (let i = 0; i < n-m; i += 1) {
        start.next = then.next;
        then.next = pre.next;
        pre.next = then;
        then = start.next;
    }

    return dummy.next;
}
