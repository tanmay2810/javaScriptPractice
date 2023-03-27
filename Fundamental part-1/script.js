let js = "amazing";

if (js === "amazing") {
  console.log("java script is amazing");
}

console.log(40 + 8 + 23 - 10);

let firstName = "Jonas";
console.log(firstName);

firstName = "Tanmay";
console.log(firstName);

// number or integers
let age = 23;

// string
let fullName = "Tanmay Kabade";

// boolen
let value = true;

// undefined
let children; // if u do not define a value for an variable it is undefined

console.log(typeof children + " children");
console.log(typeof age + " age");
console.log(typeof fullName + " full name");

// let const var declaration of variables

// let is used whaen we change type of variable dynamically
// const is used when we don't want to change the value of variable , we should always initalize the varibles
// var is used to declare a variable it is the old type of varibale declaration

const birthYear = 2000;

// birthYear = 1999; // Uncaught TypeError: invalid assignment to const 'birthYear'

// basic operators in java script
// + - / *
//  ** power

//  > < >= <= == ===

//coding Challenge 1

let markWeight = 78;
let jhonWeight = 92;
let markHeight = 1.69;
let jhonHeight = 1.88;
let markBmi = markWeight / markHeight ** 2;
let jhonBmi = jhonWeight / jhonHeight ** 2;

let markHigherBMI = markBmi > jhonBmi;

console.log('1st case : '+markHigherBMI);

markWeight = 95;
jhonWeight = 85;
markHeight = 1.88;
jhonHeight = 1.76;
markBmi = markWeight / markHeight ** 2;
jhonBmi = jhonWeight / jhonHeight ** 2;

markHigherBMI = markBmi > jhonBmi;
console.log('2nd case : '+markHigherBMI);

// coding Challenge 2

markWeight = 78;
jhonWeight = 92;
markHeight = 1.69;
jhonHeight = 1.88;
markBmi = markWeight / markHeight ** 2;
jhonBmi = jhonWeight / jhonHeight ** 2;

markHigherBMI = markBmi > jhonBmi;

if(markHigherBMI){
    console.log(`Mark's BMI (${markBmi}) is higher than Jhon's BMI (${jhonBmi})`);
}else{
    console.log(`Mark's BMI (${markBmi}) is lower than Jhon's BMI (${jhonBmi})`);
}

markWeight = 95;
jhonWeight = 85;
markHeight = 1.88;
jhonHeight = 1.76;
markBmi = markWeight / markHeight ** 2;
jhonBmi = jhonWeight / jhonHeight ** 2;

markHigherBMI = markBmi > jhonBmi;

if(markHigherBMI){
    console.log(`Mark's BMI (${markBmi}) is higher than Jhon's BMI (${jhonBmi})`);
}else{
    console.log(`Mark's BMI (${markBmi}) is lower than Jhon's BMI (${jhonBmi})`);
}

// coding challenge 3

