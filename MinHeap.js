'use strict';

class MinHeap {
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

/**
 * Algorithm2
 */
class MinHeap {
    constructor() {
        this.arr = [];
    }
  
    peek() {
        return this.arr[0] || null;
    }
  
    size() {
        return this.arr.length;
    }
  
    pop() {
        var arr = this.arr;
        var len = arr.length;
  
        if(len === 0) {
            return null;
        }
  
        var min = arr[0];
        arr[0] = arr[len - 1] // swap the last value with min value
  
        arr.pop();
  
        this.sinkDown(0);
  
        return min;
    }
  
    add(val) {
        var arr = this.arr;
        arr.push(val);
        this.bubbleUp(arr.length - 1);
    }
  
    bubbleUp(n) {
        var arr = this.arr;
  
        while(n > 0) {
            var parentN = Math.floor((n + 1)/2) - 1; // [1,2,3] 1 as root 2 as left child and 3 as right child      2 has idx = 1 and 3 has idx = 2    1/2 will result in parent idx = 0 and 2/2 will result in parent idx = 1. So we need to add one to them and -1 at the end
  
            if(arr[parentN] <= arr[n]) {
            break;
            }
  
            var tmp = arr[n];
            arr[n] = arr[parentN];
            arr[parentN] = tmp;
            n = parentN;
        } 
    }
  
    sinkDown(n) {
        var arr = this.arr;
        var len = arr.length;
        var val = arr[n]
  
        while(true) {
            var swap = null;
            var child2N = (n+1)*2; // root = 0 right child idx is (0 + 1)*2 = 2
            var child1N = child2N - 1; // right child idx - 1 = 1 for root's left child
            if(child1N < len && arr[child1N] < val) {
                swap = child1N;
            }
  
            if(child2N < len && arr[child2N] < val && arr[child2N] <= arr[child1N]) {
                swap = child2N;
            }
  
            if(swap === null) {
                break;
            }
  
            var tmp = arr[n];
            arr[n] = arr[swap];
            arr[swap] = tmp;
            n = swap;
        }  
    }
}
  