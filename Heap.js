'use strict';

class Heap {
    constructor(length) {
        this.data = new Array(length + 1);
        this.tail = 0;
    }

    push(value) {
        this.tail += 1;
        let child = this.tail;
        let parent = Math.floor(child / 2);
        while (parent >= 1) {
            if (this.data[parent] < value) {
                this.data[child] = this.data[parent];
                child = parent;
                parent = Math.floor(parent / 2);
            } else {
                this.data[child] = value;
                break;
            }
        }

        if (parent < 1) {
            this.data[child] = value;
        }
    }

    pop() {
        let parent = 1;
        let child = 2;
        let rootValue = this.data[1];
        let tailValue = this.data[this.tail];

        delete this.data[1];
        delete this.data[this.tail];
        this.tail -= 1;
        while (child <= this.tail) {
            if (this.data[child] < this.data[child + 1]) {
                child += 1;
            }

            if (this.data[child] > tailValue) {
                this.data[parent] = this.data[child];
                parent = child;
                child = child * 2;
            } else {
                this.data[parent] = tailValue;
                break;
            }
        }

        if (child > this.tail) {
            this.data[parent] = tailValue;
        }

        return rootValue;
    }
}

let heap = new Heap(5);
heap.push(2);
heap.push(1);
heap.push(3);
heap.push(5);
heap.push(4);

console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.size);
