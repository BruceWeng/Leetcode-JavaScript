/**
 * @constructor
 */

 class Queue {
     constructor() {
         this.stack1 = [];
         this.stack2 = [];
         this.length = 0;
     }

     /**
      * @param {number} x
      * @returns {void}
      */
     push(x) {
         this.stack1.push(x);
         this.length++;
     }

     /**
      * @returns {void}
      */
     pop() {
         this.adjust();
         this.stack2.pop();
         this.length--;
     }

     /**
      * @returns {number}
      */
     peek() {
         this.adjust();
         return this.stack2[this.stack2.length - 1];
     }

     /**
      * @returns {boolean}
      */
     empty() {
         if (this.length === 0) {
           return true;
         } else {
           return false;
         }
     }

     /**
      * @returns {void}
      */
     adjust() {
         if (this.stack2.length === 0) {
             while (this.stack1.length !== 0) {
                 this.stack2.push(this.stack1.pop());
             }
         }
     }
 }


let test = new Queue();

test.push(3);
console.log(`stack1: ${test.stack1}`);
console.log(`stack2: ${test.stack2}`);
console.log(test.empty());
test.pop();
console.log(`stack1: ${test.stack1}`);
console.log(`stack2: ${test.stack2}`);
console.log(test.empty());
