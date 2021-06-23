/**
 * @param {number} n
 * @return {number}
 */
 function countArrangement(N) {
  let count = 0;
  const used = [];
  dfs(1);
  return count;
  
  function dfs(idx) {
    if (idx > N) {
      count++;
      return;
    }
    
    for (let i = 1; i <= N; i++) {
      if (used[i]) continue;
      if (i%idx !== 0 && idx%i !== 0) continue;
      used[i] = true;
      dfs(idx+1);
      used[i] = false;
    }
  }
}

// var countArrangement = function(n) {
//   if(n<=0) return 0
//   const perms = permutations(n)
//   let count = 0
//   for(let perm of perms) {
//     let valid = true
//     for(let i=0; i<perm.length; i++) {
//       if(perm[i]%(i+1)===0 || (i+1)%perm[i]===0)
//         continue
//       else {
//         valid = false
//         break
//       }
//     }
//     if(valid) count++
//   }
//   return count
// };

// function permutations(n, way=[], result=[]) {
//   if(way.length===n) {
//     result.push([...way])
//     return
//   }
//   for(let i=0; i<n; i++) {
//     if(!way.includes(i+1)) {
//       way.push(i+1)
//       permutations(n, way, result)
//       way.pop()
//     }
//   }
//   return result
// }