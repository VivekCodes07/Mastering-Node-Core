/*
The URL module in Node.js is a built-in tool used to parse, read,
and modify web addresses (URLs).

Node.js uses the WHATWG URL API (modern standard used in browsers too).
It helps us break a URL into parts like hostname, pathname, query params, etc.
*/

// Create a URL object
const myUrl = new URL('https://example.com:8080/path?name=vivek&id=101');

// --------------------
// Access URL parts
// --------------------
console.log(myUrl.hostname); // example.com
console.log(myUrl.pathname); // /path

// --------------------
// Read query parameters
// --------------------
console.log(myUrl.searchParams.get('name')); // vivek
console.log(myUrl.searchParams.get('id'));   // 101

// --------------------
// Modify URL
// --------------------
// Adds a new query parameter
myUrl.searchParams.append('age', '20');

// Updated full URL
console.log(myUrl.href);