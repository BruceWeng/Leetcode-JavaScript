let users = [
  {id: 2, name: 'Gloria'},
  {id: 5, name: 'Olivia'},
  {id: 3, name: 'Bruce'}
]

function compareById(obj1, obj2) {
  return obj1.id - obj2.id
}

function compareByName(obj1, obj2) {
  if (obj1.name > obj2.name) {
    return 1
  } else if (obj1.name < obj2.name) {
    return -1
  } else return 0
}

console.log(JSON.stringify(users)) //2, 5, 3

usersById = [...users.sort(compareById)]
usersByName = [...users.sort(compareByName)]

console.log(`Sort By Id: ${JSON.stringify(usersById)}`) //2, 3, 5
console.log(`Sort By Name: ${JSON.stringify(usersByName)}`) //3, 2, 5
