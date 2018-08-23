(function() {
  let a = b = 0; // b is a global variable
})();
console.log(a); // ReferenceError: a is not defined
console.log(b); // 0