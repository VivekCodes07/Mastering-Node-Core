/*
The Node.js URL module is a built-in utility used to split a web address into readable parts or construct new URLs. In modern Node.js, the WHATWG URL API is the preferred standard as it is compatible with web browsers
*/
import { URL } from "url";

const myURL = new URL("https://www.example.com:8080/p/a/t/h?query=string#hash");

console.log(myURL);
