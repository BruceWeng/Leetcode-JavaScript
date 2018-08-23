/**
 * Flatten Array
 * 
 * @param {[]} arr 
 * @return {[]}
 */
function flattenArray(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
  }, []);
}

flattenArray([[1, 2, 3], [4, 5]]); // [1, 2, 3, 4, 5]
flattenArray([[[1, [1.1]], 2, 3], [4, 5]]); // [1, 1.1, 2, 3, 4, 5]

/**
 * Flatten Object
 * 
 * @param {{}} object 
 * @param {string} prefix 
 * @return {{}}
 */
const flatten = (object, prefix = '') =>
  Object.keys(object).reduce(
    (prev, element) =>
      typeof object[element] === 'object' && object[element] !== null &&
      !Array.isArray(object[element])
        ? { ...prev, ...flatten(object[element], `${prefix}${element}.`) }
        : { ...prev, ...{ [`${prefix}${element}`]: object[element] } },
    {},
  );

// Test Case
const realDeepObject = {
  level1: {
    level2: {
      level3: {
        more: 'stuff', //duplicate key
        other: 'stuff',
        level4: {
          the: 'end',
        },
      },
    },
    level2still: {
      last: ['one', 'two', 'three'],
    },
    am: 'bored',
  },
  more: 'stuff', //duplicate key
  ipsum: {
    lorem: 'latin',
  },
};

console.log(flatten(realDeepObject));
/**
 * Output
 * 
 * { 'level1.level2.level3.more': 'stuff',
  'level1.level2.level3.other': 'stuff',
  'level1.level2.level3.level4.the': 'end',
  'level1.level2still.last': [ 'one', 'two', 'three' ],
  'level1.am': 'bored',
  more: 'stuff',
  'ipsum.lorem': 'latin' }
 */