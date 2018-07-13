/**
Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

k is a positive integer and is less than or equal to the length of the linked list. 

If the number of nodes is not a multiple of k then left-out nodes in the end should remain as it is.

Example:

Given this linked list: 1->2->3->4->5

For k = 2, you should return: 2->1->4->3->5

For k = 3, you should return: 3->2->1->4->5

Note:

Only constant extra memory is allowed.
You may not alter the values in the list's nodes, only nodes itself may be changed.
 */
/**
 * Algorithm: Recursive
 * 1. Recursively find the next k+1th node and start to reverse the group
 * 2. Recursive call return the k+1th node
 * 3. if count != k, return head
 * 
 * T: O(n)
 * S: O(1)
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const reverseKGroup = function(head, k) {
    let curr = head;
    let count = 0;

    // Find the k+1th node
    while (curr !== null && count != k) {
        curr = curr.next;
        count += 1
    }

    // If the k+1 th node is found, start to reverse the list
    if (count === k) {
        curr = reverseKGroup(curr, k);

        // head: head-pointer to forward part
        // curr: head-pointer to reversd part
        while (count > 0) {
            let temp = head.next;
            head.next = curr;
            curr = head;
            head = temp;
            count -= 1;
        }
        head = curr;
    }

    return head;
}