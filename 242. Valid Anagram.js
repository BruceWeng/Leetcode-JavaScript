/**
 * Note:
 * 1. Hash Map(char, count)
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if (s === null || t === null) {
        return false;
    }

    if (s.length !== t.length) {
        return false;
    }

    if (s.length === 0 && t.length === 0) {
        return true;
    }

    let map = new Map();
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            let count = map.get(s[i]);
            count++;
            map.set(s[i], count);
        } else {
            map.set(s[i], 1);
        }
    }

    for (let i = 0; i < t.length; i++) {
        if (!map.has(t[i]) || map.get(t[i]) === 0) {
            return false;
        }

        let count = map.get(t[i]);
        count--;
        map.set(t[i], count);
    }

    return true;
};
