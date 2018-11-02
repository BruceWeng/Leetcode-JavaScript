function Heap(compareFunc) {
  const nums = [];
  const compare = compareFunc || function(a, b) { a - b };
  
  const peek = () => nums[0] || null;
  
  const push = (node) => {
    nums.push(node);
    bubbleUp(nums.length - 1);
  }
  
  const pop = () => {
    if (nums.length === 0) return null;
    let root = nums[0];
    nums[0] = nums[nums.length-1];
    nums.pop();
    sinkDown(0);
    return root;
  }
  
  const size = () => nums.length;
  
  const remove = (val) => {
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
    while (currIndex > 0) {
      let parentIndex = Math.floor((currIndex + 1) / 2) - 1;

      if (shouldSwap(nums[parentIndex], nums[currIndex])) break;
      swap(nums, parentIndex, currIndex);
      currIndex = parentIndex;
    }
  }
  
  const sinkDown = (currIndex) => {
    while (true) {
      let swapIndex = null;
      let RChildIndex = (currIndex + 1) * 2;
      let LChildIndex = RChildIndex - 1;

      if (LChildIndex < nums.length && 
          shouldSwap(nums[LChildIndex], nums[currIndex])) swapIndex = LChildIndex;

      if (RChildIndex < nums.length && 
          shouldSwap(nums[RChildIndex], nums[currIndex]) && 
          shouldSwap(nums[RChildIndex], nums[LChildIndex])) swapIndex = RChildIndex;

      if (swapIndex === null) break;

      swap(nums, currIndex, swapIndex);
      currIndex = swapIndex;
    }
  }

  const shouldSwap = (a, b) => compareFunc(a, b) < 0;

  return {
    peek,
    push,
    pop,
    size,
    remove
  }
}