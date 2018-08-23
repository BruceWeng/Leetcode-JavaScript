function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

flatten([[1, 2, 3], [4, 5]]); // [1, 2, 3, 4, 5]
flatten([[[1, [1.1]], 2, 3], [4, 5]]); // [1, 1.1, 2, 3, 4, 5]