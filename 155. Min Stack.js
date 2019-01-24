/**
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
getMin() -- Retrieve the minimum element in the stack.
Example:
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> Returns -3.
minStack.pop();
minStack.top();      --> Returns 0.
minStack.getMin();   --> Returns -2.
 */
/**
 * Leetcode Fundamental: 1/24/2019 Update
 */
function MinStack() {
  this.min = Number.MAX_SAFE_INTEGER;
  this.stack = [];
  
  this.push = (num) => {
    let stack = this.stack;
    if (stack.length === 0) this.min = num;
    
    // Push old min again if num <= min, reassign min, then push num
    if (num <= this.min) {
      stack.push(this.min);
      this.min = num;
    }
    stack.push(num);
  }
  
  this.pop = () => {
    let stack = this.stack;
    // evaluate value of stack.pop
    // if stack.pop() === min: pop again and reassign min
    let val = stack.pop();
    if (val === this.min) {
      this.min = stack.pop(); // reassign min
    }
    return val;
  }
  
  this.top = () => {
    let stack = this.stack;
    let lastIdx = stack.length - 1;
    return stack[lastIdx];
  }
  
  this.getMin = () => {
    return this.min;
  }
}