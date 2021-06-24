/*
 * Complete the 'closestStraightCity' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY c
 *  2. INTEGER_ARRAY x
 *  3. INTEGER_ARRAY y
 *  4. STRING_ARRAY q
 */
/**
 * 
 * @param {string[]} c 
 * @param {number[]} x 
 * @param {number[]} y 
 * @param {string[]} q 
 * @returns 
 */
function closestStraightCity(c, x, y, q) {
    // Write your code here
    const xToPoint = {}
    const yToPoint = {}
    const pointToIdx = {}
    
    for(let i=0; i<c.length; i++) {
        if(!(x[i] in xToPoint)) xToPoint[x[i]] = []
        xToPoint[x[i]].push(c[i])
        if(!(y[i] in yToPoint)) yToPoint[y[i]] = []
        yToPoint[y[i]].push(c[i])
        pointToIdx[c[i]] = i
    }
    const result = new Array(q.length).fill('NONE')
    for(let i=0; i<result.length; i++) {
        let query = q[i]
        let qIdx = pointToIdx[query]
        let nbors = [...new Set([...xToPoint[x[qIdx]] ,...yToPoint[y[qIdx]]])]
        // let xNbors = xToPoint[x[qIdx]]
        // let yNbors = yToPoint[y[qIdx]]
        // if(xNbors.length===1 && yNbors.length===1) continue
        let minDist = Infinity
        let min = 'NONE'
        let cache = {}
        for(let string of nbors) {
            if(string===query) continue
            let key = `${query}-${string}`
            let dist = (key in cache) 
                ? cache[key]
                : getDist(query, string, pointToIdx, x, y)
            if(dist<minDist) {
                minDist = dist
                min = string
            }
        }
        // for(let string of yNbors) {
        //     if(string===query) continue
        //     let key = `${query}-${string}`
        //     let dist = (key in cache) 
        //         ? cache[key]
        //         : getDist(query, string, pointToIdx, x, y)            
        //     if(dist<minDist) {
        //         minDist = dist
        //         min = string
        //     }
        // }
        result[i] = min
    }
    return result
}

function getDist(query, string, pointToIdx, x, y) {
    let qIdx = pointToIdx[query]
    let stIdx = pointToIdx[string]
    return Math.abs(x[qIdx]-x[stIdx])+Math.abs(y[qIdx]-y[stIdx])
}

console.log(closestStraightCity(["p1","p2","p3"], [30, 20, 10], [30, 20, 30], ["p3", "p2", "p1"]))
// ["p1", NONE, "p3"]
console.log(closestStraightCity(["p1", "p2","p3", "p4", "p5"], [10, 20, 30, 40, 50], [10, 20, 30, 40, 50], ["p1", "p2", "p3", "p4", "p5"]))
// [NONE, NONE, NONE, NONE, NONE]