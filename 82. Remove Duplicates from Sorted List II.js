/**
Given a sorted linked list, delete all nodes that have duplicate numbers, 
leaving only distinct numbers from the original list.

Example 1:

Input: 1->2->3->3->4->4->5
Output: 1->2->5
Example 2:

Input: 1->1->1->2->3
Output: 2->3
 */
/**
 * Algorithm: Iterative
 * 1. Declare a dummy node dummy.next = head, pre = dummy
 * 2. Moving head to find duplicates, while head.next != null and head.val == head.next.val:
 *  head = head.next
 * 3. If not find duplicate: 
 *      pre.next == head: pre = pre.next
 * 4. If find duplicates: 
 *      Skip duplicates: pre.next = head.next
 * 5. Move head: head = head.next
 * 6. Return dummpy.next
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDuplicates = function(head) {
    if (head === null) return head;

    let dummy = new ListNode(0);
    dummy.next = head;
    let pre = dummy;

    while (head != null) {
        // Skip all duplicates
        while (head.next != null && head.val == head.next.val) {
            head = head.next;
        }

        // Not find duplicate
        if (pre.next === head) {
            pre = pre.next;
        }

        // Find the last node of duplicates
        else {
            pre.next = head.next;
        }

        head = head.next;
    }

    return dummy.next;
}