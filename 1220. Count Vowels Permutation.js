/**
 * @param {number} n
 * @return {number}
 */
var countVowelPermutation = function(n) {
  // let table = (n+1)*5 matrix
  // table[i][0] = valid count for 'a'
  // table[i][1] = valid count for 'e'
  // table[i][2] = valid count for 'i'
  // table[i][3] = valid count for 'o'
  // table[i][4] = valid count for 'u'
  
  // table[0][j] = 1: 0<=j<=4
  // 'ea', 'ia', 'ua': table[i+1][0] = table[i][1]+table[i][2]+table[i][4]
  // 'ae', 'ie': table[i+1][1] = table[i][0]+table[i][2]
  // 'ei', 'oi': table[i+1][2] = table[i][1]+table[i][3]
  // 'io': table[i+1][3] = table[i][2]
  // 'iu', 'ou': table[i+1][4] = table[i][2]+table[i][3]
  if(n<=0) return 0
  const MOD = 1e9+7
  const table = new Array(n)
    .fill()
    .map(() => new Array(5).fill(0))
  for(let j=0; j<table[0].length; j++) table[0][j] = 1
  
  for(let i=0; i<table.length-1; i++) {
    for(let j=0; j<table[i].length; j++) {
      table[i+1][0] = (table[i][1]+table[i][2]+table[i][4])%MOD
      table[i+1][1] = (table[i][0]+table[i][2])%MOD
      table[i+1][2] = (table[i][1]+table[i][3])%MOD
      table[i+1][3] = (table[i][2])%MOD
      table[i+1][4] = (table[i][2]+table[i][3])%MOD
    }
  }
  let result = 0
  for(let count of table[table.length-1]) result+= count
  return result%MOD
};