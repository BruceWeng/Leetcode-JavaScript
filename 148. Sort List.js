/**
 * Note:
 * 1. merge function
 * 2. use fast and slow pointer finding middle Node
 * 3. sort right half ListNode them set mid.next = null for left ListNode
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
    if (head === null || head.next === null) {
        return head;
    }

    let mid = findMiddle(head);
    let right = sortList(mid.next);
    mid.next = null;
    let left = sortList(head);
    return merge(left, right);

    /**
     * @param {ListNode} head
     * @return {ListNode} mid
     */
    function findMiddle(head) {
        let slow = head;
        let fast = head.next;
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    /**
     * @param {ListNode} head1
     * @param {ListNode} head2
     * @reurn {ListNode}
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
};
