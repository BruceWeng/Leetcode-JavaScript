/**
There are N students in a class. Some of them are friends, while some are not. 
Their friendship is transitive in nature. For example, if A is a direct friend 
of B, and B is a direct friend of C, then A is an indirect friend of C. And we 
defined a friend circle is a group of students who are direct or indirect friends.

Given a N*N matrix M representing the friend relationship between students in 
the class. If M[i][j] = 1, then the ith and jth students are direct friends with 
each other, otherwise not. And you have to output the total number of friend 
circles among all the students.
 */
/**
 * Algorithm: Union Find
 */
class UnionFindSet {
  constructor(n) {
    this._parents = new Array(n);
    this._ranks = new Array(n);
    for (let i = 0; i < this._parents.length; i += 1) {
      this._parents[i] = i;
      this._ranks[i] = i;
    }
  }

  /**
   * Find u and set u's parent to root of the set
   * 
   * @param {number} u 
   */
  find(u) {
    while (this._parents[u] !== u) {
      this._parents[u] = this._parents[this._parents[u]];
      u = this._parents[u];
    }

    return u;
  }

  /**
   * If u and v are connected, return true, else return false 
   * 
   * @param {number} u 
   * @param {number} v 
   * @return {boolean}
   */
  union(u, v) {
    let parent_u = this.find(u);
    let parent_v = this.find(v);

    if (parent_u === parent_v) return true;

    if (this._ranks[parent_v] > this._ranks[parent_u])
      this._parents[parent_u] = parent_v;
    else if (this._ranks[parent_u] > this._ranks[parent_v])
      this._parents[parent_v] = parent_u;
    else {
      this._parents[parent_v] = parent_u;
      this._ranks[parent_u] += 1;
    }

    return false;
  }
}

/**
 * @param {number[][]} M
 * @return {number}
 */

const findCircleNum = function(M) {
  let n = M.length;
  let ufs = new UnionFindSet(n);
  for (let i = 0; i < n; i += 1)
    for (let j = i + 1; j < n; j += 1)
      if (M[i][j] === 1) ufs.union(i, j);

  let circles = new Set();
  for (let i = 0; i < n; i += 1)
    circles.add(ufs.find(i));

  return circles.size;
};

let m1 = [[1,1,0],
          [1,1,0],
          [0,0,1]];
console.log(findCircleNum(m1)); // 2

let m2 = [[1,1,0],
          [1,1,1],
          [0,1,1]];
console.log(findCircleNum(m2)); // 1

/**
 * Leetcode Fundamental: 11/27 Update
 * Failure:
 * Fail to implement Union Find, need to practice
 * 
 * Runtime: 72 ms
 */
function Group(n) {
  var groups = new Array(n);
  var ranks = new Array(n);
  
  for (let i = 0; i < groups.length; i += 1) {
    groups[i] = i;
    ranks[i] = i;
  }

  const find = (index) => {
    // Isolated
    if (groups[index] === index) return index;

    // Group
    return find(groups[index]);
  }

  const union = (index1, index2) => {
    let root1 = find(index1);
    let root2 = find(index2);

    // Already unioned
    if (root1 === root2) return;

    // rank1 > rank2: swap roots
    if (ranks[root1] > ranks[root2]) [[root1, root2] = [root2, root1]];

    // Union by Rank
    groups[root1] = root2;
    ranks[root2] += ranks[root1];
  }

  return {
    find,
    union
  }
}

const findCircleNum = function(M) {
  let n = M.length;
  let groups = new Group(n);
  for (let i = 0; i < n; i += 1)
    for (let j = i + 1; j < n; j += 1)
      if (M[i][j] === 1) groups.union(i, j);

  let circles = new Set();
  for (let i = 0; i < n; i += 1)
    circles.add(groups.find(i));

  return circles.size;
};