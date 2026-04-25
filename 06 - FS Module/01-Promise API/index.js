import * as fs from "fs/promises";

// Creating Directory:
/*
try {
  await fs.mkdir("D:\\Courses\\redux", {recursive: true});
  console.log("Folder created...");
} catch (err) {
  console.log(err);
}
*/

// Read the content of the Folder:
/*
try {
  const files = await fs.readdir("D:\\Courses");
  for (const file of files) {
    console.log(file);
  }
} catch (err) {
  console.log(err);
}
*/

// Removing Folder/Directory
/*
try {
  await fs.rmdir("D:\\Courses\\redux")
} catch (error) {
  console.log(error);
}
*/

// Create and Write Files:
/*
try {
  await fs.writeFile("README.md", "Hello World!");
  console.log("README.md created and data added")
} catch (error) {
  console.log(error);
}
*/

// Reading a File:
/*
try {
  const data = await fs.readFile("README.md", 'utf-8');
  console.log(data)
} catch (error) {
  console.log(error);
}
*/

// Appending Data to a File:
/*
try {
  await fs.appendFile("README.md", "I am the best");
  console.log("Appended data to a file");
} catch (error) {
  console.log(error);
}
*/


// Copy File:
/*
try {
  await fs.copyFile("README.md", "info.txt");
} catch (error) {
  console.log(error);
}
*/

// Get File Information:
try {
  const info = await fs.stat("info.txt");
  console.log(info);
  console.log(`Is it a directory: ${info.isDirectory()}`);
  console.log(`Is it a File: ${info.isFile()}`);
} catch (error) {
  console.log(error);
}
