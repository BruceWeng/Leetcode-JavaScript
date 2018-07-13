/**
Given a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

You should preserve the original relative order of the nodes in each of the two partitions.

Example:

Input: head = 1->4->3->2->5->2, x = 3
Output: 1->2->2->4->3->5
 */
/**
 * Algorithm:
 * 1. Declare two dummy nodes head1: head of nodes that value < x, 
 *                            head2: head of nodes that value >= x
 * 2. Declare two pointers p1 = head1, p2 = head2
 * 2. Move head, once head.val < x, p1.next = head, p1 = p1.next
 *                    head.val >= x, p2.next = head, p2 = p2.next
 * 3. When head === null, p2.next = null, p.next = head2.next
 * 4. return head1.next
 * 
 * T: O(n)
 * S: O(1)
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
const partition = function(head, x) {
    let head1 = new ListNode(0);
    let head2 = new ListNode(0);
    let p1 = head1;
    let p2 = head2;
    while (head !== null) {
        if (head.val < x) {
            p1.next = head;
            p1 = p1.next;
        } else {
            p2.next = head;
            p2 = p2.next;
        }
        head = head.next;
    }

    p2.next = null;
    p1.next = head2.next;
    return head1.next;
}