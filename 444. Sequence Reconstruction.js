/**
 * @param {number[]} org
 * @param {number[][]} seqs
 * @return {boolean}
 */
 var sequenceReconstruction = function(org, seqs) {
	const edges = createGraph(seqs)
	const indegrees = createIndegrees(edges)
	const result = topologicalSort(edges, indegrees)
	if(result===false) return false
	return result.join()===org.join()
};
      
function topologicalSort(edges, indegrees) {
	const result = []
	let candidate = []
	// find root
	for(let key in indegrees) {
	  if(indegrees[key]===0) candidate.push(key)
	}
      
	while(candidate.length!==0) {
	  if(candidate.length>1) return false
	  let src_key = candidate.shift()
	  // find dest_key
	  for(let key in edges) {
	    if(key==src_key) { // loose comparison to pass '1'==1
	      for(let dest_key of edges[src_key]) {
					indegrees[dest_key]--
					if(indegrees[dest_key]===0) candidate.push(dest_key)
				}
			}
		}
		result.push(src_key)
	}
	return result  
}
      
function createGraph(seqs) {
	const edges = {}
	for(let seq of seqs) {
	  if(seq.length===1 && !(seq[0] in edges)) edges[seq[0]] = new Set() 
	  for(let i=0; i<seq.length-1; i++) {
	    let src_key = seq[i]
	    let dest_key = seq[i+1]
	    if(!(src_key in edges)) edges[src_key] = new Set()
	    edges[src_key].add(dest_key)
	  }
	}
	return edges
}
	
function createIndegrees(edges) {
	const in_degrees = {}
	for(let src_key in edges) {
	  for(let dest_key of edges[src_key]) {
	    if(!(dest_key in in_degrees)) in_degrees[dest_key] = 0
	    in_degrees[dest_key]++
	  }
	  if(!(src_key in in_degrees)) in_degrees[src_key] = 0
	}
	return in_degrees
}