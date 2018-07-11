/**
Given a linked list, remove the n-th node from the end of list and return its head.

Example:

Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.
Note:

Given n will always be valid.

Follow up:

Could you do this in one pass?
 */
/**
 * Algorithm: slow, fast pointers
 * 1. Declare dummy, slow and fast pointer
 * 2. Move sast pointer n+1 steps so there is n+1 gap between slow and fast pointers
 * 3. Move both slow and fast pointers until fast reach the end
 * 4. Skip Nth node by slow.next = slow.next.next
 * 5. return dummy.next
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function(head, n) {
    if (head === null) return head;

    let dummy = new ListNode(0);
    dummy.next = head;
    let slow = dummy;
    let fast = dummy;

    // Move fast pointer for n+1 steps
    for (let i = 1; i <= n+1; i += 1) {
        fast = fast.next;
    }

    // Move fast and slow until fast reach the end
    while (fast != null) {
        fast = fast.next;
        slow = slow.next;
    }

    // Skip Nth node
    slow.next = slow.next.next;

    return dummy.next; 
}