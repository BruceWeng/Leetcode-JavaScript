/**
 * If there are keys in object with same contents, get the string
 */
var object= {
    1: "d",
    "1": "a",
    2: "b",
    3: "c"
}
console.log(object);

var map = new Map();
map.set(1, "a");
map.set(2, "b");
map.set(3, "c");
map.set("1", "d");

for (let key in object) {
    console.log(typeof(key));
    console.log(object[key]);
}

for (let i = 1; i < 4; i += 1) {
    console.log(typeof(i));
    console.log(map.get(i));
}

class Bruce1 {
    consturctor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class Bruce2 extends Bruce1 {
    constructor(name, age) {
        super(name, age)
    }
}

var bruce1 = new Bruce1("Bruce", 1);
var bruce2 = new Bruce2("Bruce", 2);
console.log(Bruce1.prototype.isPrototypeOf(bruce1));
console.log(Bruce2.prototype);

function Bruce(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.name = function() {
        return this.firstName + this.lastName;
    }
}

var bruce = new Bruce("Bruce", "Weng");
console.log(bruce.name());
