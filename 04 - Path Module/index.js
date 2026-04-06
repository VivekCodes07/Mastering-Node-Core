import path from "path";

let examplePath = "C:\\node.js\\index.js";
console.log(`Example Path: ${examplePath}`);

// path.basename() -> Gives the last portion of the specified path
let baseName = path.basename(examplePath);
console.log(`Basename: ${baseName}`);
/*
So, now let's see how can we omit the last portion, that extension 
*/
let omitLastPortion = path.basename("C:\\node.js\\index.js", ".js");
console.log(`Omitted the extension from basename: ${omitLastPortion}`);

let directoryName = path.dirname("C:\\node.js\\index.js");
console.log(`Directory name: ${directoryName}`);

let extensionName = path.extname(examplePath);
console.log(`Extension name: ${extensionName}`);

// path.join() -> It will generate a path based on what we provide inside .join()

let newPath = path.join("C:", "Node-js course", "01-Path Modules", "index.js");
console.log(`New path: ${newPath}`);

let omitOneLevel = path.join(
  "C:",
  "Node-js course",
  "01-Path Modules",
  "index.js",
  "..",
);

// Omitted one level from new path:
console.log(omitOneLevel);

let omitTwoLevel = path.join(
  "C:",
  "Node-js course",
  "01-Path Modules",
  "index.js",
  "..",
  "..",
);
//
// Omitted two levels from new path:
console.log(omitTwoLevel);

// path.normalize() -> Cleans messy slashes
console.log(path.normalize("C:\\Courses\\\Redux\\\\store\\features"));

// path.parse() -> This method returns an object whose properties represent a signigicant elements of that path.
let pathElementObject = path.parse(examplePath);
console.log(pathElementObject);


 