/**
Remove all elements from a linked list of integers that have value val.

Example:

Input:  1->2->6->3->4->5->6, val = 6
Output: 1->2->3->4->5
 */
/**
 * Algorithm: Recursive
 * 1. Recursive move to next node by call itself(head.next, val)
 * 2. if head.val == val:
 *      return head.next
 *    else:
 *      return head
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
const removeElements = function(head, val) {
    if (head === null) return head;

    head.next = removeElements(head.next, val);

    if (head.val === val) {
        return head.next;
    } else {
        return head;
    }
}