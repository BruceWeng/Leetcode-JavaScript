/**
 * Note:
 * Solution A:
 * 1. mergeTwoLists
 * 2. MergeHelper-Divide and Conquer
 * Solution B:
 * 1. Min Heap-60 lines implementation
 * 2. Put every first ListNode in heap and create a dummy head for result
 * 3. Connect dummy head to Heap.pop() and push Heap.pop().next ListNode into the Heap
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists) {
    if (lists.length === 0) {
        return null;
    }

    return mergeHelper(lists, 0, lists.length - 1);

    /**
     * @param {ListNode[]} lists
     * @param {integer} start
     * @param {integer} end
     */
     function mergeHelper(lists, start, end) {
         if (start === end) {
             return lists[start];
         }

         let mid = start + Math.floor((end - start) / 2);
         let left = mergeHelper(lists, start, mid);
         let right = mergeHelper(lists, mid + 1, end);
         return merge(left, right);
     }

    /**
     * @param {ListNode} head1
     * @param {ListNode} head2
     * @return {ListNode}
     */
     function merge(head1, head2) {
         let result = new ListNode(0);
         let curr = result;
         while (head1 && head2) {
             if (head1.val < head2.val) {
                 curr.next = head1;
                 head1 = head1.next;
             } else {
                 curr.next = head2;
                 head2 = head2.next;
             }
             curr = curr.next;
         }

         if (head1) {
             curr.next = head1;
         } else {
             curr.next = head2;
         }

         return result.next;
     }
}
