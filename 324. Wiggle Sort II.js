/**
 * Naive solution
 * T: O(nlogn)
 * S: O(n)
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var wiggleSort = function (nums) {
  nums.sort((a, b) => a - b);
  // when even: [small, small], [big, big]
  // when odd: [small, small, small], [big, big]
  // mid += nums.length % 2 === 0 ? 0 : 1; 
  const middle = Math.ceil(nums.length / 2);
  const [small, big] = [nums.slice(0, middle), nums.slice(middle)];
  for (let i = 0; i < nums.length; i++) {
    if (i % 2 === 0) nums[i] = small.pop();
    else nums[i] = big.pop();
  }
}

/**
 * Better solution
 * T: O(n)
 * S: O(1)
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function wiggleSort(nums) {
  if (nums.length <= 1) return;
  let median = findKthLargest(nums, Math.floor(nums.length / 2));
  // move numbers other than median into the right positions
  // small number moves to even index and large number moves to odd index
  let left = 0, right = nums.length - 1, i = 0, n = nums.length;
  while (i <= right) {
    if (nums[wiggleIndex(i, n)] > median) {
      swap(nums, wiggleIndex(i, n), wiggleIndex(left, n));
      left++;
      i++;
    } else if (nums[wiggleIndex(i, n)] < median) {
      swap(nums, wiggleIndex(i, n), wiggleIndex(right, n));
      right--;
    } else {
      i++;
    }
  }
};

function wiggleIndex(i, n) {
  // when i is even, return (i * 2 + 1) % (n + 1)
  // when i is odd, return (i * 2 + 1) % n
  return (i * 2 + 1) % (n | 1);
}

function findKthLargest(nums, k) {
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

function partition(nums, pivot, left, right) {
  let pivotValue = nums[pivot];
  let partitionIndex = left;
  for (let i = left; i < right; i++) {
    if (nums[i] < pivotValue) {
      swap(nums, i, partitionIndex);
      partitionIndex++;
    }
  }
  swap(nums, right, partitionIndex);
  return partitionIndex;
}

function swap(nums, a, b) {
  [nums[a], nums[b]] = [nums[b], nums[a]];
}

function shuffle(nums) {
  if (nums.length < 2) return nums;
  for (let j = 1; j < nums.length; j++) {
    let i = Math.floor(Math.random() * (j + 1));
    swap(nums, i, j);
  }
  return nums;
}