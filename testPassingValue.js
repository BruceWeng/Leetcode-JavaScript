//Primitive type
let test1 = 1;
let test2 = test1;
test2 = 2;
console.log(test1); //1

//Object type: pass by copy of reference
let test3 = {name: 'Bruce', id: 0};
let test4 = test3;
test4 = {};
console.log(test3); //{name: 'Bruce', id: 0}

let test5 = {name: 'Gloria', id: 1};
let test6 = test5;
test6.id += 1;
console.log(test5.id);
