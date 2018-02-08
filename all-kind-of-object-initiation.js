/**
 * Object Literal
 */
const Bruce = {
  name: "Bruce",
  age: 28
}

/**
 * Function, prototype and new
 */
function Person(name, age) {
  this._name = name;
  this._age = age;
}

Person.prototype.getName = function() {
  return this._name;
}

Person.prptotype.getAge = function() {
  return this._age;
}

Person.prototype.setName = function(name) {
  this._name = name;
  return this; // Method chaining
};

Person.prototype.setAge = function(age) {
  this._age = age;
  return this; // Method chaining
}

function Student(name, age, studentID) {
  Person.call(this, studentID);
  this._studentID = studentID;
}

Student.prototype.getStudentID = function() {
  return this._studentID;
}

Student.prototype.setStudentID = function(id) {
  this._studentID = id;
  return this; // Method chaining
}

// Link Student.prototype to Person.prototype
Student.prototype = Object.create(Person.prototype);

const Bruce = new Student("Bruce", 28, 101967);

/**
 * Class and new
 */
class Person {
  constructor(name, age) {
    this._name = name,
    this._age = age
  }

  get name() {
    return this._name;
  }

  get age() {
    return this._age;
  }

  set name(name) {
    this._name = name;
    return this;
  }

  set age(age) {
    this._age = age;
    return this;
  }
}

class Student extends Person {
  constructor(name, age, studentID) {
    super(name, age);
    this._studentID = studentID;
  }

  get studentID() {
    return this._studentID;
  }

  set studentID(id) {
    this._studentID = id;
    return this;
  }
}
const Bruce = new Student("Bruce", 28, 101967);

// OLOO (Object Linked Object Oriented) style
const Person = {
  init: function(name, age) {
    this._name = name;
    this._age = age;
  }
  setName: function(name) {
    this._name = name;
  }
  setAge: function(age) {
    this._age = age;
  }
}

// Link Student.prototype to Person.prototype
const Student = Object.create(Person);

// Behavior Delegation
Student.init = function(name, age, studentID) {
  Person.init.call(this, name, age);
  this._studentID = studentID;
}
Student.setStudentID = function(id) {
  this._studentID = id;
}

const Bruce = Object.create(Student);
bruce.init("Bruce", 28, 101967);

/**
 * Test delegate behaviors from multiple objects
 *
 * 1. Duplicate property name will be replace by later object
 * 2. Put base object(contains init function) in the last position, other objects
 * should be mixin objects(no init function)
 * 3. Share this!
 * 4. No Diamond Problem!
 */
 const Person = {
   init: function(name) {
     this.name = name;
   },
 }

 const Student = {
   getName: function() {
     return this.name;
   }
 }

 const Bruce = { ...Person, ...Student} // Link Bruce to global Object
 Bruce.init("Bruce");
 Bruce.getName();
