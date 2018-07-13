/**
Given a linked list, rotate the list to the right by k places, where k is non-negative.

Example 1:

Input: 1->2->3->4->5->NULL, k = 2
Output: 4->5->1->2->3->NULL
Explanation:
rotate 1 steps to the right: 5->1->2->3->4->NULL
rotate 2 steps to the right: 4->5->1->2->3->NULL
Example 2:

Input: 0->1->2->NULL, k = 4
Output: 2->0->1->NULL
Explanation:
rotate 1 steps to the right: 2->0->1->NULL
rotate 2 steps to the right: 1->2->0->NULL
rotate 3 steps to the right: 0->1->2->NULL
rotate 4 steps to the right: 2->0->1->NULL
 */
/**
 * Algorithm: 
 * 1. Count the list length
 * 2. The list remains the same as rotate n steps, 
 * 3. Rotate k steps from right equals retate length - (k%length) from left
 * 4. Do 3. and return head
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const rotateRight = function(head, k) {
    if (head === null) return null;
    let length = 1;
    let curr = head;
    while (curr.next !== null) {
        length += 1;
        curr = curr.next;
    }

    curr.next = head;
    steps = length - (k%length);

    while (steps > 0) {
        curr = curr.next;
        steps -= 1;
    }
    head = curr.next;
    curr.next = null;
    return head;
} 