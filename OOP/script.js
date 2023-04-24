"use strict";
// Abstraction
/*
We can hide few details from the user 
*/
// Polymorphism
/*
One name many uses
*/

//The class use
// class Person {
//     constructor(firstName, birthYear) {
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//         console.log(this.firstName + " " + this.birthYear);
//     }
// }

//this is the parametrize constructor
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
  console.log(this.firstName + " " + this.birthYear);

  // never do this insted use prototype
  //   this.ShowAge = () => {
  //     console.log(2023 - this.birthYear);
  //   };
};

//constructor call
const tanmay = new Person("Tanmay", 2000);
const ram = new Person("ram", 2000);

// prototypes
Person.prototype.showAge = function () {
  console.log(2023 - this.birthYear);
};

console.log(Person);

tanmay.showAge();

console.log(tanmay.__proto__);
ram.showAge();

// coding challeng 1

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.acceleration = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const merc = new Car("Mercedes", 95);
const bmw = new Car("BMW", 120);

merc.acceleration();
bmw.brake();
merc.brake();
bmw.acceleration();

// Es 6  classes
//class expression
// const PersonEx = class{}

//class declration
class PersonCl {
  firstName;
  lastName;

  // constructor(){
  //     console.log('default constructor')
  // }

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    console.log(this.firstName + "   " + this.lastName);
  }

  fullName() {
    console.log(`My full name is ${this.firstName} ${this.lastName}`);
  }
}

// const personCl = new PersonCl()
// u can have on one type of constructor either parameterized or default constructor
const TanmayKabade = new PersonCl("Tanmay", "Kabade");
TanmayKabade.fullName();

// setter getter in JS
class Account {
  owner = "Tanmay";
  movments = [100, 200, 300];

  get latest() {
    return this.movments;
  }

  set latest(movments) {
    this.movments = movments;
  }
}
// getter call
console.log(new Account().latest);
// setter call
const acc = (new Account().latest = [300, 400, 500]);
console.log(acc);

// static methods

class AccountStatic {
  owner = "Tanmay";
  movments = [100, 200, 300];

  get latest() {
    return this.movments;
  }

  set latest(movments) {
    this.movments = movments;
  }

  static returnOwnerAndMovments() {
    console.log(`static fun`);
  }
}
AccountStatic.returnOwnerAndMovments();

// Inheritance
/*
It is a parent child relation-ship the child can inherit its features form it's parent.
*/
class StudentCl extends PersonCl {
  constructor(firstName, lastName, course) {
    super(firstName, lastName);
    this.course = course;
    console.log(this.course);
  }
}

console.log(new StudentCl("Tanmay", "Kabade", "CS"));
const Ram = new StudentCl("Ram", "Kabade", "CS").fullName();

// Encapsulation
/*
We can combine two or more properties
or we can make some methods be private
Js does not support data privecy but can be optaied using _ convention 
*/

// public normal declaration
// private #variable/fun name  - not currently implemented
// protected _variable/fun name

class Bank {
  name = "";
  _balance = 0;
  constructor(owner, curry, pin) {
    this.owner = owner;
    this.curry = curry;
    this.pin = pin;
    // this.movments = []
    // this does not make propert private it is convention this is called protected property
    this.movments = [];
    this.locale = navigator.language;
  }

  deposite(ammount) {
    this.movments.push(ammount);
    return this
  }

  withdraw(ammount) {
    this.deposite(-ammount);
    return this
  }

  approveLoan(ammount) {
    return true;
  }

  requestLoan(ammount) {
    if (this.approveLoan(ammount)) {
      this.deposite(ammount);
      console.log("loan approved");
    }
    return this
  }

  getBalance() {
    this.movments.forEach((mov) => (this._balance += mov));
    console.log(this._balance);
    return this
  }
}

const acc1 = new Bank("Tanmay", "rupee", 2810);
console.log(acc1)

// chaining methods
// to use chaining we must return the object so add return this to the fuction u want to chain

acc1.deposite(20000).deposite(100).getBalance().requestLoan(1000).getBalance().deposite(20000)
