/**
Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example 1:

Input: [3,2,1,5,6,4] and k = 2
Output: 5
Example 2:

Input: [3,2,3,1,2,4,5,5,6] and k = 4
Output: 4
Note: 
You may assume k is always valid, 1 ≤ k ≤ array's length.
 */
/**
 * Leetcode Fundamentals: 11/1 Update
 * Failure:
 * 1. Fail to let kth = nums.length - k (kth position)
 * 2. Failt to think of using partition func to find the actual value at kth position
 * 3. Fail to think of comparing k and partitionIndex in binary search
 * 
 * Without shuffle nums: T: O(n^2), S: O(1)
 * With shuffle nums: T: O(n), O(1)
 * 384. Shuffle an Array: Reservoir Sampling
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  nums = shuffle(nums);
  let kth = nums.length - k;
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    let pivot = right;
    let partitionIndex = partition(nums, pivot, left, right);
    if (partitionIndex < kth) left = partitionIndex + 1;
    else if (partitionIndex > kth) right = partitionIndex - 1
    else break;
  }
  
  return nums[kth];
};

const partition = (nums, pivot, left, right) => {
  let pivotValue = nums[pivot];
  let partitionIndex = left;
  
  for (let i = left; i < right; i += 1) {
    if (nums[i] < pivotValue) {
      swap(nums, i, partitionIndex);
      partitionIndex += 1;
    }
  }
  
  swap(nums, pivot, partitionIndex);
  return partitionIndex;
};

const swap = (nums, a, b) => {
  [ nums[a], nums[b] ] = [ nums[b], nums[a]];
};

const shuffle = (nums) => {
  if (nums.length < 2) return nums;
  for (let j = 1; j < nums.length; j += 1) {
    let i = Math.floor(Math.random() * (j+1));
    swap(nums, i, j);
  }

  return nums;
}

/**
 * Leetcode Fundamental: 11/1 Update
 * 
 * Heap solution:
 * T: O(nlogk), O(k)
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  let minHeap = Heap();
  for (let num of nums) {
    minHeap.push(num);
    if (minHeap.size() > k) minHeap.pop();
  }
  
  return minHeap.peek();
};

function Heap(compareFunc) {
  const nums = [];
  const compare = compareFunc || function(a, b) { return a - b };
  
  const peek = () => nums[0];
  
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

      if (moreProper(nums[parentIndex], nums[currIndex])) break;
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

/**
 * Leetcode Fundamental: 1/14/2019 Update
 * T: O(n)
 * S: O(1)
 * Runtime: 72ms
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  if (nums === undefined || nums.length === 0 || k < 0 || k > nums.length) return 0;

  nums = shuffle(nums);
  // Partition nums in range [start...end] (include end)  
  // Every time derive partition index and:
  // 1. return nums[partitionIdx] if partitionIdx = k-1
  // 2. end = partitionIdx - 1 if partitionIdx > k-1
  // 3. start = partitionIdx + 1 if partitionIdx < k-1
  
  let start = 0;
  let end = nums.length - 1;
  while (true) {
    let pivot = end;
    let partitionIdx = partition(nums, pivot, start, end);
    if (partitionIdx === k-1) return nums[partitionIdx];
    else if (partitionIdx > k-1) end = partitionIdx - 1;
    else if (partitionIdx < k-1) start = partitionIdx + 1;
  }
};

const partition = (nums, pivot, start, end) => {
  let pivotVal = nums[pivot];
  let partitionIdx = start;
  
  for (let i = start; i < end; i += 1) {
    if (nums[i] > pivotVal) {
      swap(nums, i, partitionIdx);
      partitionIdx += 1;
    }
  }
  
  swap(nums, end, partitionIdx);
  return partitionIdx;
};

// To shuffle array evenly:
// Swap nums[i] with nums[j] within selecting nums[i] in range [0...j] within P = 1/ (1+j)
// Two cases:
// 1. select i === j, P = 1/(1+j), no need to swap
// 2. select i !== j, P = j/(1+j), choose another value in range[0...j-1]: P = 1/j
//    Total P = j/(1+j) * 1/j = 1 / (1+j)
// Each value in array have equal probability at any position.
const shuffle = (nums) => {
  if (nums.length < 2) return nums;
  for (let j = 1; j < nums.length; j += 1) {
    let i = Math.floor(Math.random() * (1/1+j));
    swap(nums, i, j);
  }
  
  return nums;
};

const swap = (nums, i, j) => {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
};

// Easy typo with i and j
// const swap = (nums, i, j) => {
//   [nums[i], nums[j]] = [nums[j], nums[i]];
// };
