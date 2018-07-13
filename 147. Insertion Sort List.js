/**
Sort a linked list using insertion sort.


A graphical example of insertion sort. The partial sorted list (black) initially contains only the first element in the list.
With each iteration one element (red) is removed from the input data and inserted in-place into the sorted list
 

Algorithm of Insertion Sort:

Insertion sort iterates, consuming one input element each repetition, and growing a sorted output list.
At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there.
It repeats until no input elements remain.

Example 1:

Input: 4->2->1->3
Output: 1->2->3->4
Example 2:

Input: -1->5->3->4->0
Output: -1->0->3->4->5
 */
/**
 * Algorithm: Insertion Sort
 * 1. Declare a dummy node, pre = dummy, cur = head, next = null
 * 2. while cur not the end of list:
 *      Find the right place for cur to insert (pre.next != null and pre.next.val < cur.val): move pre = pre.next
 * 3. Insert between pre and pre.next
 * 4. return dummy.next
 * 
 * T: O(n^2)
 * S: (1)
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const insertionSortList = function(head) {
    if (head === null) return null;

    let newStart = new ListNode(0); // New starter of the sorted list
    cur = head; // the node will be inserted
    pre = newStart; // insert node between pre and pre.next
    next = null; // the next node will be inserted

    // not the end of list
    while (cur !== null) {
        next = cur.next;

        // Find the right place to insert
        while (pre.next !== null && pre.next.val < cur.val) {
            pre = pre.next;
        }

        // insert between pre and pre.next
        cur.next = pre.next;
        pre.next = cur;
        pre = newStart;
        cur = next;
    }

    return newStart.next;
}
