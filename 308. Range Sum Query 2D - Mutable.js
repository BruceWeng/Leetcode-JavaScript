class NumMatrix {
  /**
   * @param {number[][]} matrix
   */
  constructor(matrix) {
    this.matrix = matrix;
    // Modify each row to prefix sum row
    for (let row of matrix) {
      for (let col = 1; col < row.length; col++) {
        row[col] += row[col - 1];
      }
    }
  }

  /** 
   * let n = matrix[0].length
   * T: O(n)
   * @param {number} row 
   * @param {number} col 
   * @param {number} val
   * @return {void}
   */
  update(row, col, val) {
    let old_val = this.matrix[row][col];
    if (col !== 0) old_val -= this.matrix[row][col - 1];
    for (let c = col; c < this.matrix[0].length; c++) {
      this.matrix[row][c] -= old_val;
      this.matrix[row][c] += val;
    }
  }

  /** 
   * let m = matrix.length
   * T: O(m)
   * @param {number} row1 
   * @param {number} col1 
   * @param {number} row2 
   * @param {number} col2
   * @return {number}
   */
  sumRegion(row1, col1, row2, col2) {
    let sum = 0;
    for (let r = row1; r <= row2; r++) {
      sum += this.matrix[r][col2];
      if (col1 !== 0) sum -= this.matrix[r][col1 - 1];
    }
    return sum;
  }
}

/** 
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * obj.update(row,col,val)
 * var param_2 = obj.sumRegion(row1,col1,row2,col2)
 */