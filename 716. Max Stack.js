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
    while (stack.length !== 0 && stack[lastIdx] !== this.max) {
      tempStack.push(stack.pop());
      lastIdx = stack.length - 1; // Gonna update lastIdx because the stack length changed
    }
    
    let result = this.max;

    this.pop(); // Here we use MaxStack pop
    
    // Push elements in temp Stack back to stack using MaxStack push
    while (tempStack.length !== 0) 
      this.push(tempStack.pop());
    
    return result;
  }
}

let maxStack = new MaxStack();
maxStack.push(5);
maxStack.push(1);
console.log(maxStack.popMax());
console.log(maxStack.peekMax());