var a = 10;
var a = 20; //re-declaration
console.log(a);
console.log(a);
// var b = 10; // let does not all re-declaration not possible
let b = 20;
for (var i = 0; i < 100; i++) {
}
console.log(i);
for (var j = 0; j < 100; j++) {
}
// console.log(j); //we cant access j variable.
var c = 100; // to declare the const value
// c =200; // cant assign. cant re-assign 
