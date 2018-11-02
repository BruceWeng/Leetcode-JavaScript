/**
 * 1. Construct instance variables 
 *      array
 *      compareFunc
 * 2. Initiate functions 3P + S
 *      peek()
 *      push(node)
 *      pop()
 *      size()
 * 3. Push(node): 
 *      a. push node to the array
 *      b. bubbleUp (swap currNode and parrentNode until compareFunc(parentNode, currNode) <= 0)
 * 4. Pop():
 *      a. if len == 0: return null
 *      b. get array[0] as min
 *      c. array[0] = array[len-1]
 *      d. array.pop()
 *      e. sinkDown (choose the smaller child as swapNode, swap currNode and swapNode until swapIdx == null)
 *      f. return min
 * 5. Remove(val):
 *      a. Find removeIdx
 *      b. If removeIdx == undefined: return 
 *      c. Swap(removeIdx, lastIdx)
 *      d. result = array.pop()
 *      e. bubbleUp(removeIdx)
 *      f. sinkDown(removeIdx)
 *      g. return result
 * 5. Helper functions:
 *      swap(idx1, Idx2)
 *      bubbleUp(startIdx)
 *      sinkDown(startIdx)
 * Note: 
 * 1. find parrent node index formula: 
 *      let parentIdx = Math.floor((currIdx + 1) / 2) - 1;
 * 2. Find children nodes index formula:
 *      let childRIdx = (currIdx + 1) * 2;
 *      let childLIdx = childRIdx - 1;
 */
class Heap {
    constructor(compareFunc) {
        this.array = [];
        // Default Min Heap
        this.compareFunc = compareFunc || function(a, b) {return a - b};
    }

    peek() {
        return this.array[0] || null;
    }

    push(node) {
        let arr = this.array;
        arr.push(node);
        // Bubble up start from last index
        this.bubbleUp(arr.length - 1);
    }

    pop() {
        let arr = this.array;
        let len = arr.length;
  
        if(len === 0) {
            return null;
        }
  
        let min = arr[0];
        arr[0] = arr[len - 1] // swap the last value with min value
  
        arr.pop();
  
        // Sink Down start from root
        this.sinkDown(0);
  
        return min;
    }

    size() {
        return this.array.length;
    }

    remove(val) {
        let arr = this.array;
        let removeIdx = null;

        // Linear time approach
        // Can be optimized to O(logN) by Binary Search Tree
        for (let i = 0; i < arr.length; i += 1) {
            if (this.compareFunc(arr[i], val) === 0) removeIdx = i;
        }

        if (removeIdx === null) return;

        this.swap(removeIdx, arr.length - 1);
        let result = arr.pop();

        // Handle the case if removeIndex is not the last value in the heap
        // Move new value at removeIndex to porper position by bubbleUp and sinkDown
        if (removeIdx < arr.length) {
            this.bubbleUp(removeIdx);
            this.sinkDown(removeIdx);
        }

        return result;
    }

    /**
     * Swap function 
     * Swap values in array must pass indecies in, because values are copied after passed in
     * 
     * @param {number} i
     * @param {number} j
     */
    swap(i, j) {
        let arr = this.array;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  
    /**
     * To fix bubbleUp and sinkDown
     * 
     */
    bubbleUp(currIdx) {
        let arr = this.array;

        while(currIdx > 0) {
            /**
             * [1,2,3] 1 as root 2 as left child and 3 as right child      
             * 2 has idx = 1 and 3 has idx = 2    
             * 1/2 will result in parent idx = 0 and 2/2 will result in parent idx = 1. 
             * So we need to add one to them and -1 at the end
             */
            let parentIdx = Math.floor((currIdx + 1) / 2) - 1; 
            if(this.compareFunc(arr[parentIdx], arr[currIdx]) < 0) {
                break;
            }
  
            this.swap(currIdx, parentIdx);
            currIdx = parentIdx;
        } 
    }
  
    sinkDown(currIdx) {
        let arr = this.array;
        let len = arr.length;
        let val = arr[currIdx]
  
        while(true) {
            let swapIdx = null;
            let childRIdx = (currIdx + 1) * 2; // root = 0 right child idx is (0 + 1)*2 = 2
            let childLIdx = childRIdx - 1; // right child idx - 1 = 1 for root's left child

            // Swap the parent node with more proper child node(MinHeap: smaller, MaxHeap: larger)
            // There are 3 case that need to swap:
            // 1. Only left child node < parent node (a)
            // 2. Only right child node < parent node (b)
            // 3. Both child nodes < parent node and left node is more proper (a)
            // 4. Both child nodes < parent node and right node is more proper (b)

            // (a)
            if(childLIdx < len && this.compareFunc(arr[childLIdx], val) < 0) {
                swapIdx = childLIdx;
            }

            // (b)
            if(childRIdx < len && this.compareFunc(arr[childRIdx], val) < 0 && this.compareFunc(arr[childRIdx], arr[childLIdx]) < 0) {
                swapIdx = childRIdx;
            }
  
            if(swapIdx === null) {
                break;
            }
  
            this.swap(currIdx, swapIdx);
            currIdx = swapIdx;
        }  
    }
}

/**
 * Leetcode Fundamentals: 11/1 Update
 * 1. Transform Heap from class to constructor func
 * 2. Figure out how sinkDown works
 */
function Heap(compareFunc) {
  const nums = [];
  const compare = compareFunc || function(a, b) { a - b }; // Can not use arrow func here
  
  const peek = () => nums[0] || null;
  
  const push = (node) => {
    // 1. Push node in last position in nums 
    // 2. Move node to proper position by bubbleUp(lastIndex)
    nums.push(node);
    bubbleUp(nums.length - 1);
  }
  
  const pop = () => {
    // 1. Handle empty nums case: return null
    // 2. Get root val
    // 3. Replace last value to root
    // 4. Delete last value by nums.pop()
    // 5. SinkDown(0) move root to proper position
    // 6. return root
    if (nums.length === 0) return null;
    let root = nums[0];
    nums[0] = nums[nums.length-1];
    nums.pop();
    sinkDown(0);
    return root;
  }
  
  const size = () => nums.length;
  
  const remove = (val) => {
    // 1. Linear search removeIndex
    // 2. Handle remove val not found case
    // 3. Swap nums[removeIndex] and nums[length-1]
    // 4. result = nums.pop()
    // 5. Handle the case val is not the last element in Heap
    // 5.1 Move new value to proper position by bubbleUp and sinkDown
    // 6. return result
    let removeIndex = null;
    for (let i = 0; i < nums.length; i += 1) {
      if (compare(nums[i], val) === 0) removeIndex = i;
    }
    if (removeIndex === null) return;
    swap(nums, removeIndex, nums.length-1);
    let result = nums.pop();
    if (removeIndex < nums.length) {
      bubbleUp(removeIndex);
      sinkDown(removeIndex);
    }
    return result;
  }
  
    // Helper functions
  const swap = (nums, a, b) => {
      [ nums[a], nums[b] ] = [ nums[b], nums[a] ];
  }
  
  const bubbleUp = (currIndex) => {
    // 1. Continuously(while) find parentIndex and move up currIndex until currIndex <= 0
    // 2. Find parentIndex from childIndex
    // 2.1 Equation: parentIndex = Math.floor((childIndex + 1) / 2) - 1 (Works for both left and right childIndex)
    // 3. If find the proper position:  // break while loop
    // (compareFunc(nums[parentIndex], nums[currIndex]) < 0) (compareFunc(a, b) < 0, a more proper than b)
    // 4. Swap nums[parentIndex] and nums[currIndex] in while loop
    // 5. Move currIndex to parentIndex in while loop
    while (currIndex > 0) {
      let parentIndex = Math.floor((currIndex + 1) / 2) - 1;

      if (moreProper(nums[parentIndex], nums[currIndex])) break;
      swap(nums, parentIndex, currIndex);
      currIndex = parentIndex;
    }
  }
  
  const sinkDown = (currIndex) => {
    // 1. Infinite while loop find childIndex and move down currIndex untill swapIndex === null
    // 2. Get right childIndex from parentIndex
    // 2.1 Equation: RChildIndex = (parentIndex + 1) * 2
    // 2.2 Equation: LChildIndex = RChildIndex - 1;
    // 3. Swap the parent node with the smaller child node
    // 3.1 Find more proper child node (MinHeap: smaller, MaxHeap: larger) (compareFunc(a, b) < 0, a more proper than b)
    // 4. If can not find swapIndex(=== null): break
    // 5. Swap nums[currIndex] and nums[swapIndex]
    // 6. Move currIndex to swapIndex
    while (true) {
      let swapIndex = null;
      let RChildIndex = (currIndex + 1) * 2;
      let LChildIndex = RChildIndex - 1;

      if (LChildIndex < nums.length && 
          moreProper(nums[LChildIndex], nums[currIndex])) swapIndex = LChildIndex;

      if (RChildIndex < nums.length && 
          moreProper(nums[RChildIndex], nums[currIndex]) && 
          moreProper(nums[RChildIndex], nums[LChildIndex])) swapIndex = RChildIndex;

      if (swapIndex === null) break;

      swap(nums, currIndex, swapIndex);
      currIndex = swapIndex;
    }
  }

  const moreProper = (a, b) => compare(a, b) < 0;

  return {
    peek,
    push,
    pop,
    size,
    remove
  }
}
  
let maxHeap = Heap((a, b) => b - a); // default min heap
maxHeap.push(2);
maxHeap.push(1);
maxHeap.push(3);
maxHeap.push(5);
maxHeap.push(4);

console.log(maxHeap.size()); // 5
console.log(maxHeap.peek()); // 5
console.log(maxHeap.remove(3)); // 3
console.log(maxHeap.pop()); // 5
console.log(maxHeap.pop()); // 4
console.log(maxHeap.pop()); // 2
console.log(maxHeap.pop()); // 1
console.log(maxHeap.pop()); // null
console.log(maxHeap.size()); // 0