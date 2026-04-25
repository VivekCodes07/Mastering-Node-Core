/*
npm init -> package.json() -> lekha jokha of the project

How to use any module..?

    1. To use the promise-based APIs:
        -> const fs = require('node:fs/promises');

    2. To use the callback and sync APIs:
        -> const fs = require('node:fs');
*/

const fs = require("fs/promises");

async function run() {
  try {
    await fs.writeFile("hey.txt", "Hey yo!, I'm learning abt modules.");
    console.log("Created file");

    await fs.appendFile("hey.txt", " This is the text that I'm appending");
    console.log("Text appended");

    await fs.rename("hey.txt", "hello.txt");
    console.log("File renamed");

    await fs.copyFile("hello.txt", "copy.txt");
    console.log("File copied");

    await fs.unlink("hello.txt"); // ✅ correct
    console.log("File removed");

    await fs.rmdir("./copy");
    console.log("Removed");
  } catch (err) {
    console.log(err.message);
  }
}

run();
