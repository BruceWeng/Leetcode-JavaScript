/**
Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are +, -, *, /. Each operand may be an integer or another expression.

Note:

Division between two integers should truncate toward zero.
The given RPN expression is always valid. That means the expression would always evaluate to a result and there won't be any divide by zero operation.
Example 1:

Input: ["2", "1", "+", "3", "*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
Example 2:

Input: ["4", "13", "5", "/", "+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
Example 3:

Input: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
Output: 22
Explanation: 
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
 */
/**
 * Data Structure: Stack
 * use stack to store operands and pop two operands when meet operator, and push back the resutl to stack
 * 
 * Remember to use Math.trunc() to remove all fractional digits (works ofr positive and negative number)
 * Not to use Math.floor() (works only positive number)
 */
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
  // 1. Use stack to store numbers
  // 2. Whenever there is an operator, pop two operands, do calculation and push the result in stack
  // 3. The last number in stack is the answer
  let stack = [];
  
  for (let t of tokens) {
    if (t === '+') {
      let b = stack.pop();
      let a = stack.pop();
      stack.push(a + b);
    }
    else if (t === '-') {
      let b = stack.pop();
      let a = stack.pop();
      stack.push(a - b);
    }
    else if (t === '*') {
      let b = stack.pop();
      let a = stack.pop();
      stack.push(a * b);
    }
    else if (t === '/') {
      let b = stack.pop();
      let a = stack.pop();
      stack.push(Math.trunc(a / b));
    }
    else stack.push(parseInt(t));
  }
  
  return stack[0];
};