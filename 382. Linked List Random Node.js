/**
Given a singly linked list, return a random node's value from the linked list. Each node must have the same probability of being chosen.

Follow up:
What if the linked list is extremely large and its length is unknown to you? Could you solve this efficiently without using extra space?

Example:

// Init a singly linked list [1,2,3].
ListNode head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
Solution solution = new Solution(head);

// getRandom() should return either 1, 2, or 3 randomly. Each element should have equal probability of returning.
solution.getRandom();
 */
/**
 * Algorithm: Reservoir Sampling
 * 0. Let k numbers in reservoir
 * 1. Let all the n numbers have the possibility k/n: P(ith) = k/(k+i)
 * 2. In this question: k = 1, P(ith) = 1/(1+i)
 * 
 * Reference: http://blog.jobbole.com/42550/
 * 
 * When we read the first node head, if the stream ListNode stops here, we can just return the head.val. The possibility is 1/1.
 * 
 * When we read the second node, we can decide if we replace the result r or not. The possibility is 1/2. So we just generate a random number between 0 and 1, and check if it is equal to 1. If it is 1, replace r as the value of the current node, otherwise we don't touch r, so its value is still the value of head.
 * 
 * When we read the third node, now the result r is one of value in the head or second node. We just decide if we replace the value of r as the value of current node(third node). The possibility of replacing it is 1/3, namely the possibility of we don't touch r is 2/3. So we just generate a random number between 0 ~ 2, and if the result is 2 we replace r.
 * 
 * We can continue to do like this until the end of stream ListNode.
 */
class Solution {
  constructor(head) {
    this.head = head;
  }

  getRandom() {
    let curr = this.head;
    let result = this.head.val;
    // If there is more than 1 node, jump into the for loop
    for (let i = 1; curr.next !== null; i += 1) {
      curr = curr.next;
      // Math.random returns [0, 1)
      // ex: there is 3 nodes, generate random number in 0, 1, 2
      // if it is 2, replace result to new node.val
      // Remember to use Math.floor since random returns a floating number
      if (Math.floor(Math.random() * (i+1)) === i) // <- the random result could be either (0 - i)
        result = curr.val;
    }
    
    return result;
  }
}