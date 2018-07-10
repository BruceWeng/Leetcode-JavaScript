'use strict';
/*
Reverse a singly linked list.

Example:

Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
Follow up:

A linked list can be reversed either iteratively or recursively. Could you implement both? 
*/
class ListNode {
    constuctor(x) {
        this.val = x;
        this.next = null;
    }
}
/**
 * Algorithm1: Iterative
 * 1. Declare a newHead = null
 * 2. While head !== null, move head.next = newHead, newHead = head, head = next(head.next)
 * 3. Return newHead
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reversedList = function(head) {
    let newHead = null;
    while (head !== null) {
        let next = head.next;
        head.next = newHead;
        newHead = head;
        head = next;
    }

    return newHead;
}

/**
 * Algorithm2: Recursive
 * 1. Write a helper function(head, newHead), and pass next as head and head as newHead
 * 2. Termination condition: if head === null: return newHead
 * 3. Recursive condition: next = head.next, head.next = newHead, return helper(next, head)
 */
/**
 * @param {ListNode} head
 * @param {ListNode} 
 */
const reverseList2 = function(head) {
    return helper(head, null);
}

/**
 * Recursive helper function
 * @param {ListNode} head 
 * @param {ListNode} newHead 
 */
const helper = function(head, newHead) {
    // Termination condition
    if (head === null) {
        return newHead;
    }

    // Recursive condition
    next = head.next;
    head.next = newHead;
    return helper(next, head);
}