// Node.js Module Wrapper Explained
// This file explains how Node.js executes your code behind the scenes.

/*
---------------------------------------------
1. Basic Code Execution
---------------------------------------------
*/

console.log("Hello Node.js!");

// When you run this file using: node filename.js
// It prints: Hello Node.js!


/*
---------------------------------------------
2. What Node.js Actually Does Internally
---------------------------------------------
*/

/*
Node.js does NOT run your code directly.
Instead, it wraps your entire file inside a function like this:

(function (exports, require, module, __filename, __dirname) {
    // Your code is placed here
});
*/


/*
---------------------------------------------
3. Example of an IIFE (Immediately Invoked Function Expression)
---------------------------------------------
*/

(function (exports, require, module, __filename, __dirname) {
    console.log("Hello from IIFE");
})();

// This function runs immediately after being defined.
// Node.js uses a similar approach internally.


/*
---------------------------------------------
4. Parameters Provided by Node.js
---------------------------------------------
*/

// Because of the wrapper function, we get access to:

// exports  -> Used to export values from the file
// require  -> Used to import other modules
// module   -> Information about the current module
// __filename -> Full path of the current file
// __dirname  -> Directory path of the current file


/*
---------------------------------------------
5. Using __filename and __dirname
---------------------------------------------
*/

console.log("File name:", __filename);
console.log("Directory name:", __dirname);


/*
---------------------------------------------
6. Scope Isolation (Very Important)
---------------------------------------------
*/

let x = 10;

// This variable is NOT global.
// It exists only inside this file because of the wrapper.

// Try accessing 'x' from another file — it will not work unless exported.


/*
---------------------------------------------
7. Why Node.js Uses Module Wrapper
---------------------------------------------
*/

/*
1. Keeps variables private (no global pollution)
2. Allows use of require and exports
3. Helps organize code into modules
4. Provides useful file and directory information
*/


/*
---------------------------------------------
8. Summary
---------------------------------------------
*/

/*
- Every Node.js file is treated as a module
- Node wraps the file inside a function
- This function provides useful tools
- Your code runs inside this private scope
*/
