class Solution {
	constructor(w) {
	  for(let i=1; i<w.length; i++) {
	    w[i] += w[i-1]
	  }
	  this.w = w
	}
	
	pickIndex() {
	  let index = Math.floor(Math.random()*this.w[this.w.length-1])
	  let left = 0
	  let right = this.w.length
	  while(left<right) {
	    let mid = left+((right-left)>>1)
	    if(this.w[mid]>index) right=mid
	    if(this.w[mid]<=index) left=mid+1
	  }
	  return left
	}
}
      
/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */