/**
Given a singly linked list, determine if it is a palindrome.

Example 1:

Input: 1->2
Output: false
Example 2:

Input: 1->2->2->1
Output: true
Follow up:
Could you do it in O(n) time and O(1) space?
 */
/**
 * Algorithm: Fast and slow pointers
 * 1. User fast and slow pointers to find the mid node
 * 2. Reverse the first half of the list while finding the mid node
 * 3. Compare the first half with the second half
 * 
 * T: O(n)
 * S: O(1)
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
const isPalindrome = function(head) {
    if (head === null) return true;
    
    let reverseHead = null;
    let fast = head;
    let slow = head;

    // 1. and 2. Find mid node and reverse first half
    while (fast !== null && fast.next !== null) {
        let temp = reverseHead;
        reverseHead = slow;
        slow = slow.next;
        fast = fast.next.next;
        reverseHead.next = temp;
    }

    // Odd number list, let right half be smaller
    if (fast !== null) {
        slow = slow.next;
    }
    
    // 3. Compare first half and second half
    while (reverseHead !== null) {
        if (reverseHead.val !== slow.val) return false;
        slow = slow.next;
        reverseHead = reverseHead.next;
    }

    // Finish comparing the both half of lists and not returning false
    return true;
}
