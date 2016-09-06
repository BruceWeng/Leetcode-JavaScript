function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}

console.log("foo1 returns:");
console.log(foo1());
console.log("foo2 returns:");
console.log(foo2());

//foo1 returns:
// { bar: 'hello' }
// foo2 returns:
// undefined

//The reason for this has to do with the fact that semicolons are technically optional in JavaScript.
//As a result, when the line containing the return statement is encountered in foo2(), a semicolon is
//automatically inserted immediately after the return statement.
