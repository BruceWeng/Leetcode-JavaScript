function outer() {
  let bruce = {name: 'Bruce', id: 0};
  let gloria = {name: 'Gloria', id: 1};
  let jeff = {name: 'Jeff', id: 2};
  let jasmine = {name: 'Jasmine', id: 3};
  let test1 = 1;
  let test2 = 2;
  function inner(test, object, object2) {
    let count = 100;
    test1 += count;
    test += count;
    bruce = {};
    object = {};
    jeff.id += count;
    object2.id += count;
    console.log(`test1: ${test1}, test2: ${test2}`);
    console.log(`bruce: ${JSON.stringify(bruce)}, gloria: ${JSON.stringify(gloria)}`);
    console.log(`jeff: ${JSON.stringify(jeff)}, jasmine: ${JSON.stringify(jasmine)}`);
  }
  return inner(test2, gloria, jasmine);

}

outer();
