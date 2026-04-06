/*
Q. What are Modules..?
    -> Modules are a way to pass over code from one file to another file.
    -> So, it will allow us to reuse our code.
    -> So, that we don't have to write our code again and again in different kind of files.
*/

/*
This will allow us to use that function from (greet.js) file, and we can use it right here.
*/
const greet = require("./greet");
// const person1 = require("./people");

// Importing more than one thing we use curly braces:
const { person1, person2, person3 } = require("./people");

console.log("First Person:", person1);
console.log("Second Person:", person2);
console.log("Third Person:", person3);

greet(person1);
greet(person2);
greet(person3);
 

/*
4. Execution Flow

1. index. js runs
2. require("./greet")
    -> loads and executes greet . js
3. require("./people")
    -> loads and executes people. js
4. Values are returned and stored
5. Functions are called

*/