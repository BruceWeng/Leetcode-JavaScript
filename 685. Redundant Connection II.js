/**
 * @param {number[][]} edges
 * @return {number[]}
 */
 var findRedundantDirectedConnection = function(edges) {
	let inDegrees = createInDegrees(edges)
	let edgesObj = createGraph(edges)
	let states = createStates(edges)

	for(let i=edges.length-1; i>=0; i--) {
    let notTree = false
	  let [srcKey, destKey] = edges[i]
	  removeEdge(edgesObj, srcKey, destKey, inDegrees)
	  // detect valid tree structure
	  for(let start=1; start<=edges.length; start++) {
	    if(hasCycle(start, edgesObj, states) || hasMultipleParents(inDegrees)) {
        notTree = true
        states = createStates(edges)
        addEdge(edgesObj, srcKey, destKey, inDegrees)
        break
	    }
	  }
    if(notTree) continue
    return [srcKey, destKey]
	}
};
      
function hasCycle(start, edgesObj, states) {
	if(states[start]===-1) return false
	if(states[start]===1) return true
	states[start] = 1
	if(start in edgesObj) {
		for(let destKey of edgesObj[start]) {
			if(hasCycle(destKey, edgesObj, states)) return true
		}
	}
	states[start] = -1
	return false
}
 
function createStates(edges) {
	const states = {}
	for(let i=1; i<=edges.length; i++) {
		states[i] = 0
	}
	return states
}

function createInDegrees(edges) {
	const inDegrees = {}
	for(let [srcKey, destKey] of edges) {
	  if(!(destKey in inDegrees)) inDegrees[destKey] = 1
	  else inDegrees[destKey]++
	}
	return inDegrees
}
      
function createGraph(edges) {
	const edgesObj = {}
	for(let edge of edges) {
	  let srcKey = edge[0]
	  let destKey = edge[1]
	  if(!(srcKey in edgesObj)) edgesObj[srcKey] = new Set()
	  edgesObj[srcKey].add(destKey)
	}
	return edgesObj
}
      
function hasMultipleParents(inDegrees) {
	for(let key in inDegrees) {
	  if(inDegrees[key] > 1) return true
	}
	return false
}
      
function removeEdge(edgesObj, srcKey, destKey, inDegrees) {
	edgesObj[srcKey].delete(destKey)
	inDegrees[destKey]--
}
      
function addEdge(edgesObj, srcKey, destKey, inDegrees) {
	edgesObj[srcKey].add(destKey)
	inDegrees[destKey]++
}