/*
Sync API - This will allow us to run our code synchronously

Promise API - This will allow us to run our code asynchronously
*/

import * as fs from "fs";

// Creating Directory
fs.mkdirSync("D:\\Courses\\test\\demo", { recursive: true });

// Removing Directory:
fs.rmdirSync("D:\\Courses\\test\\demo");
