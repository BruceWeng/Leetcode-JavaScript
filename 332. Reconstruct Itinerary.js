/**
Given a list of airline tickets represented by pairs of departure and arrival airports [from, to], 
reconstruct the itinerary in order. All of the tickets belong to a man who departs from JFK. 
Thus, the itinerary must begin with JFK.

Note:

If there are multiple valid itineraries, you should return the itinerary that has the smallest 
lexical order when read as a single string. For example, the itinerary ["JFK", "LGA"] has a 
smaller lexical order than ["JFK", "LGB"].
All airports are represented by three capital letters (IATA code).
You may assume all tickets form at least one valid itinerary.
 */
/**
 * Algorithm: Graph: Hash table + PriorityQueue
 * HuaHua: 
 * Greedy: Sort neighbors(choose smallest possible neighbor) + post order traversal
 * 1. All the airports are vertices and tickets are directed edges. Then all these tickets form a directed graph.
 * 2. The graph must be Eulerian (a finite graph which visits every edge exactly once.) since we know that a Eulerian path exists.
 * 3. To get lexical order smallest solution, we can put the neighbors in a min-heap. In this way, we always visit 
 *    the smallest possible neighbor first in our trip.
 * 4. To prevent visit same neighbor again: delete the neighbor after traverse (equavilent to mmin-heap.pop())
 *    since, the neighbor no longer in the heap
 * 5. Post order traversal: construct tree first then put nodes in result array after recursively dfs 
 *    -> the result array contains the path in reversed order
 */
class Heap {
  constructor(compareFunc) {
      this.array = [];
      // Default Min Heap
      this.compareFunc = compareFunc || function(a, b) {return a - b};
  }

  peek() {
      return this.array[0] || null;
  }

  push(node) {
      let arr = this.array;
      arr.push(node);
      // Bubble up start from last index
      this.bubbleUp(arr.length - 1);
  }

  pop() {
      let arr = this.array;
      let len = arr.length;

      if(len === 0) {
          return null;
      }

      let min = arr[0];
      arr[0] = arr[len - 1] // swap the last value with min value

      arr.pop();

      // Sink Down start from root
      this.sinkDown(0);

      return min;
  }

  size() {
      return this.array.length;
  }

  remove(val) {
      let arr = this.array;
      let removeIdx = null;

      // Linear time approach
      for (let i = 0; i < arr.length; i += 1) {
          if (this.compareFunc(arr[i], val) === 0) removeIdx = i;
      }

      if (removeIdx === null) return;

      this.swap(removeIdx, arr.length - 1);
      let result = arr.pop();

      // Handle if the removeIdx is the last index
      if (removeIdx < arr.length) {
          this.bubbleUp(removeIdx);
          this.sinkDown(removeIdx);
      }

      return result;
  }

  /**
   * Swap function 
   * Swap values in array must pass indecies in, because values are copied after passed in
   * 
   * @param {number} i
   * @param {number} j
   */
  swap(i, j) {
      let arr = this.array;
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  /**
   * To fix bubbleUp and sinkDown
   * 
   */
  bubbleUp(currIdx) {
      let arr = this.array;

      while(currIdx > 0) {
          /**
           * [1,2,3] 1 as root 2 as left child and 3 as right child      
           * 2 has idx = 1 and 3 has idx = 2    
           * 1/2 will result in parent idx = 0 and 2/2 will result in parent idx = 1. 
           * So we need to add one to them and -1 at the end
           */
          let parentIdx = Math.floor((currIdx + 1) / 2) - 1; 
          if(this.compareFunc(arr[parentIdx], arr[currIdx]) <= 0) {
              break;
          }

          this.swap(currIdx, parentIdx);
          currIdx = parentIdx;
      } 
  }

  sinkDown(currIdx) {
      let arr = this.array;
      let len = arr.length;
      let val = arr[currIdx]

      while(true) {
          let swapIdx = null;
          let childRIdx = (currIdx + 1) * 2; // root = 0 right child idx is (0 + 1)*2 = 2
          let childLIdx = childRIdx - 1; // right child idx - 1 = 1 for root's left child

          // Swap the parent node with smaller child node
          if(childLIdx < len && this.compareFunc(arr[childLIdx], val) < 0) {
              swapIdx = childLIdx;
          }

          if(childRIdx < len && this.compareFunc(arr[childRIdx], val) < 0 && this.compareFunc(arr[childRIdx], arr[childLIdx]) < 0) {
              swapIdx = childRIdx;
          }

          if(swapIdx === null) {
              break;
          }

          this.swap(currIdx, swapIdx);
          currIdx = swapIdx;
      }  
  }
}

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
const findItinerary = function(tickets) {
  let map = new Map();
  map.getOrDefault = function(key, defaultVal) {
    if (map.has(key)) return map.get(key);
    else {
      map.set(key, defaultVal);
      return defaultVal;
    }
  }

  let path = [];

  // Construct graph
  for (let ticket of tickets) {
    map.getOrDefault(ticket[0], new Heap((a, b) => {
      for (let i = 0; i < a.length && i < b.length; i += 1) {
        if (a.charCodeAt(i) === b.charCodeAt(i)) {
          continue;
        } else {
          return a.charCodeAt(i) - b.charCodeAt(i);
        }
      }

      // No case that a.legnth !== b.length and a === b, but if there there is:
      if (a.length < b.length) return -1;
      else if (a.length > b.length) return 1;
      else return 0;

    })); // Pass a compare func that comparing string in lexical order in Heap

    map.get(ticket[0]).push(ticket[1]);
  }

  // Start station must be "JFK", pass the departure name, map and path in helper function to add next neighbor in path
  helper("JFK", map, path);

  return path;
};

const helper = function(departure, map, path) {
  // Get the neighbor heap contains all the neighbors of "departure"
  let arrivalsHeap = map.get(departure); // Type: Heap<string>

  // Pop the smallest neighbor in arrivalsHeap and recursive call the helper func
  while (arrivalsHeap && arrivalsHeap.size() !== 0) {
    helper(arrivalsHeap.pop(), map, path);
  }

  // Put departure in path in postorder
  path.unshift(departure);
};

 let input1 = [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]];
 console.log(findItinerary(input1)); // ["JFK", "MUC", "LHR", "SFO", "SJC"]
 /**
  * "JFK" -> "MUC" -> "LHR" -> "SFO" -> "SJC"
  */

 let input2 = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]];
 console.log(findItinerary(input2)); // ["JFK","ATL","JFK","SFO","ATL","SFO"]
 /**
  * "JFK" -> "ATL" -> "JFK" -> "SFO" -> "ATL" -> "SFO"
  */
 /**
  * Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"].
             But it is larger in lexical order.
  */