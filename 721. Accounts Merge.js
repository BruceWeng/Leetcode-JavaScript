/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
 var accountsMerge = function(accounts) {
	const edges = createGraph(accounts)
	const email_name_map = createEmailNameMap(accounts)
	let set_result = []
	for(let src_key in edges) {
	  let key_in_set = false
	  for(let set of set_result) {
	    if(set.has(src_key)) {
	      key_in_set = true
	      break
	    }
	  }
	  if(key_in_set) continue
	  let account = new Set()
	  dfs(src_key, edges, account)
	  set_result.push(account)
	}
	let result = []
	for(let emails of set_result) {
	  emails = [...emails]
	  emails.sort()
	  let email = emails[0]
	  emails.unshift(email_name_map[email])
	  result.push(emails)
	}
	return result
};
      
function dfs(src_key, edges, account, visited={}) {
	if(visited[src_key]) return false
	if(!(src_key in edges)) return false
	// do something
	account.add(src_key)
	visited[src_key] = true
	for(let dest_key of edges[src_key]) {
	  dfs(dest_key, edges, account, visited)
	}
}
      
function createGraph(accounts) {
	const edges = {}
	for(let account of accounts) {
	  if(account.length===2 && !(account[1] in edges)) edges[account[1]] = new Set()
	  for(let i=1; i<account.length-1; i++) {
	    let email = account[i]
	    let next_email = account[i+1]
	    if(!(email in edges)) edges[email] = new Set()
	    edges[email].add(next_email)
	    if(!(next_email in edges)) edges[next_email] = new Set()
	    edges[next_email].add(email)
	  }
	}
	return edges
}
      
function createEmailNameMap(accounts) {
	const email_name_map = {}
	for(let account of accounts) {
	  let name = account[0]
	  for(let i=1; i<account.length; i++) {
	    let email = account[i]
	    email_name_map[email] = name
	  }
	}
	return email_name_map
}