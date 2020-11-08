/**
 * Solution 1: Prefix sum
 * update: T: O(n)
 * sumRange: T: O(1)
 */
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.nums = nums;
  for (let i = 1; i < nums.length; i++) {
    nums[i] += nums[i - 1];
  }
};

/** 
 * @param {number} i 
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function (i, val) {
  let old = i === 0 ? this.nums[i] : this.nums[i] - this.nums[i - 1];
  for (let x = i; x < this.nums.length; x++) {
    this.nums[x] -= old;
    this.nums[x] += val;
  }
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function (i, j) {
  if (i === 0) return this.nums[j];
  return this.nums[j] - this.nums[i - 1];
};

/** 
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(i,val)
 * var param_2 = obj.sumRange(i,j)
 */

/**
 * Solution 2: Binary index tree
 * update: T: O(logn)
 * sumRange: T: O(logn)
 */

class NumArray {
  /**
   * @param {number[]} nums
   */
  constructor(nums) {
    this.nums = nums;
    this.bit = new BIT(nums);
    for (let i = 0; i < nums.length; i++) {
      this.bit.update(i + 1, nums[i]);
    }
  }

  /** 
   * @param {number} i 
   * @param {number} val
   * @return {void}
   */
  update(i, val) {
    this.bit.update(i + 1, val - this.nums[i]);
    this.nums[i] = val;
  };

  /** 
   * @param {number} i 
   * @param {number} j
   * @return {number}
   */
  sumRange(i, j) {
    return this.bit.query(j + 1) - this.bit.query(i);
  };
}

class BIT {
  constructor(nums) {
    this.sum = new Array(nums.length + 1).fill(0);
  }

  update(i, val) {
    while (i < this.sum.length) {
      this.sum[i] += val;
      i += this.lowbit(i);
    }
  }

  query(i) {
    let sum = 0;
    while (i > 0) {
      sum += this.sum[i];
      i -= this.lowbit(i);
    }
    return sum;
  }

  lowbit(i) {
    return i & (-i);
  }
}
/** 
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(i,val)
 * var param_2 = obj.sumRange(i,j)
 */

/**
 * Solution 3: Segment tree
 * @param {number} start 
 * @param {number} end 
 * @param {number} val 
 */
function SegmentTreeNode(start, end, val) {
  this.start = start;
  this.end = end;
  this.sum = val;
  this.left = null;
  this.right = null;
}

class NumArray {
  constructor(nums) {
    this.nums = nums;
    this.root = nums.length === 0 ? null : this.build(0, nums.length - 1, nums);
  }

  build(start, end, nums) {
    if (start === end) return new SegmentTreeNode(start, end, nums[start]);
    let root = new SegmentTreeNode(start, end, 0);

    let mid = start + Math.trunc((end - start) / 2);
    // Topdowm process
    root.left = this.build(start, mid, nums); // end = mid (boundary inclusive)
    root.right = this.build(mid + 1, end, nums);

    // Bottomup process (curr.sum = left.sum + right.sum)
    root.sum = root.left.sum + root.right.sum;
    return root;
  }

  update(i, val) {
    return this.updateNode(this.root, i, val);
  }

  updateNode(root, i, val) {
    if (root.start === root.end && root.start === i) {
      root.sum = val;
      return;
    }

    let mid = root.start + Math.trunc((root.end - root.start) / 2);
    // Topdown process
    if (i <= mid) this.updateNode(root.left, i, val);
    else this.updateNode(root.right, i, val);

    // Bottomup process: Update sum for each node
    root.sum = root.left.sum + root.right.sum;
  }

  sumRange(i, j) {
    return this.rangeQuery(this.root, i, j);
  }

  rangeQuery(root, start, end) {
    // leaf node and inner nodes happen to match the range
    if (root.start === start && root.end === end) return root.sum;

    let mid = root.start + Math.trunc((root.end - root.start) / 2);
    // Topdown process
    if (end <= mid) return this.rangeQuery(root.left, start, end);
    else if (start > mid) return this.rangeQuery(root.right, start, end);

    // Bottomup process: rangeSum = left rangeSum(start, mid) + right rangeSum(mid+1, end)
    else return this.rangeQuery(root.left, start, mid) + this.rangeQuery(root.right, mid + 1, end);
  }
}