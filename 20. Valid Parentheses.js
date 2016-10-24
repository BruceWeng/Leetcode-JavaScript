var isValid = function(s) {
    if (s === null || s.length === 0) {
        return false;
    }

    let stack = [];
    let table = {};

    table[')'] = '(';
    table[']'] = '[';
    table['}'] = '{';

    for (let i = 0; i < s.length; i++) {
        if (table[s[i]] === undefined) {
            stack.push(s[i]);
        } else {
            if (stack[stack.length - 1] === table[s[i]]) {
                stack.pop();
            } else {
                return false;
            }
        }
    }
    console.log(stack);
    return stack.length === 0 ? true : false;

};

console.log(isValid('['));
