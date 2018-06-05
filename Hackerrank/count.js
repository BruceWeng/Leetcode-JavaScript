function count(a, b) {
    var x = a;
    var y = b;
    while (x > y) {
        x = x - y;
        while (y > x) {
            y = y - x;
        }
    }
    return y;
}

console.log(count(2437, 875));
