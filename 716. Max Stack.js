/**
Design a max stack that supports push, pop, top, peekMax and popMax.

push(x) -- Push element x onto stack.
pop() -- Remove the element on top of the stack and return it.
top() -- Get the element on the top.
peekMax() -- Retrieve the maximum element in the stack.
popMax() -- Retrieve the maximum element in the stack, and remove it. If you find more than one maximum elements, only remove the top-most one.
Example 1:
MaxStack stack = new MaxStack();
stack.push(5); 
stack.push(1);
stack.push(5);
stack.top(); -> 5
stack.popMax(); -> 5
stack.top(); -> 1
stack.peekMax(); -> 5
stack.pop(); -> 1
stack.top(); -> 5
Note:
-1e7 <= x <= 1e7
Number of operations won't exceed 10000.
The last four operations won't be called when stack is empty.
 */
/**
 * Leetcode Fundamental: 1/24/2019 Update
 */
function MaxStack() {
  this.max = Number.MIN_SAFE_INTEGER;
  this.stack = [];
  
  // Push, Pop, Top and PeekMax operations implementation are the same as Min Stack
  this.push = (num) => {
    let stack = this.stack;
    
    // Handle empty case, set max
    if (stack.length === 0) this.max = num;
    
    if (num >= this.max) {
      stack.push(this.max);
      this.max = num;
    }
    stack.push(num);
  }
  
  this.pop = () => {
    let stack = this.stack;
    let val = stack.pop();
    
    if (val === this.max) {
      this.max = stack.pop();
    }
    return val;
  }
  
  this.top = () => {
    let stack = this.stack;
    let lastIdx = stack.length - 1;
    return stack[lastIdx];
  }
  
  this.peekMax = () => {
    return this.max;
  }
  
  this.popMax = () => {
    let stack = this.stack;
    // Use another stack to store all elements , which pushed after max
    let tempStack = [];
    let lastIdx = stack.length - 1;
    while (stack.length !== 0 && stack[lastIdx] !== this.max) 
      tempStack.push(stack.pop());
    
    let result = this.max;

    this.pop(); // Here we use MaxStack pop
    
    // Push elements in temp Stack back to stack using MaxStack push
    while (tempStack.length !== 0) 
      this.push(tempStack.pop());
    
    return result;
  }
}