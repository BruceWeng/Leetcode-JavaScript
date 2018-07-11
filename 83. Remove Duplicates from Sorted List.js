/**
Given a sorted linked list, delete all duplicates such that each element appear only once.

Example 1:

Input: 1->1->2
Output: 1->2
Example 2:

Input: 1->1->2->3->3
Output: 1->2->3
 */
/**
 * Algorithm: Recursive
 * 1. Termination condition:
 *      if head == null or head.next == null: return head
 * 
 * Move to next node
 * 2. Recursive condition:
 *      head.next = deleteDuplicates(head.next)
 *      Check next node val
 *      if head.val == head.next.val:
 *          return head.next
 *      else:
 *          return head
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDuplicates = function(head) {
    if (head === null || head.next === null) return head;
    
    head.next = deleteDuplicates(head.next);
    
    if (head.val === head.next.val) {
        return head.next;
    } else {
        return head;
    }
}