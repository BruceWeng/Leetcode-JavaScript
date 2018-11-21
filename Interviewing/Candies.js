const sol = (T) => {
  return Math.min(Math.floor(T.length / 2), new Set(T).size);
};

let test1 = [3, 5, 6, 6, 7, 7];
console.log(sol(test1)); // 3;
console.log("-----");
let test2 = [80, 80, 1000, 80, 80, 80, 80, 80, 80, 12345];
console.log(sol(test2)); // 3