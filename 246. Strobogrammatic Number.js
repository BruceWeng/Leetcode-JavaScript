/**
 * @param {string} num
 * @return {boolean}
 */
var isStrobogrammatic = function(num) {
  if (num === null || num.length === 0) {
    return false;
  }

  for (let i = 0; i < num.length/2; i++) {
    if (num[i] === '1') {
      if (num[num.length - 1 - i] === '1') {
        continue;
      }
    }

    if (num[i] === '0') {
      if (num[num.length - 1 - i] === '0') {
        continue;
      }
    }

    if (num[i] === '6') {
      if (num[num.length - 1 - i] === '9') {
        continue;
      }
    }

    if (num[i] === '9') {
      if (num[num.length - 1 - i] === '6') {
        continue;
      }
    }

    if (num[i] === '8') {
      if (num[num.length - 1 - i] === '8') {
        continue;
      }
    }

    return false;;
  }

  return true;
};
