import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {

  if (req.url === "/") {
    fs.readFile("./public/home.html", (error, data) => {

      if (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Server Error");
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  else if (req.url === "/about") {
    fs.readFile("./public/about.html", (error, data) => {

      if (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Server Error");
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Page Not Found</h1>");
  }

});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});


/*
==================== 🧠 ANATOMY + FLOW NOTES ====================

🔹 1. SERVER CREATION
---------------------------------------------------------------
http.createServer((req, res) => { ... })

- Creates a server
- The callback runs EVERY time a request hits the server
- req  → contains request info (URL, method, headers)
- res  → used to send response back


🔹 2. USER REQUEST FLOW
---------------------------------------------------------------
Browser → http://localhost:5000/about

Browser sends:
GET /about


🔹 3. REQUEST HANDLING
---------------------------------------------------------------
(req, res) => { ... } runs

Server checks:
req.url === "/"        → Home page
req.url === "/about"   → About page
else                   → 404 page


🔹 4. FILE READING (SERVING HTML)
---------------------------------------------------------------
fs.readFile(path, callback)

- Reads HTML file from disk
- data → contains file content
- error → if file not found or issue


🔹 5. ERROR HANDLING
---------------------------------------------------------------
if (error) {
  res.writeHead(500)
  res.end("Server Error")
}

- Prevents server crash
- Sends proper response instead


🔹 6. RESPONSE HEADERS
---------------------------------------------------------------
res.writeHead(statusCode, headers)

Examples:
200 → success
404 → not found
500 → server error

"Content-Type": "text/html"
→ tells browser to render HTML


🔹 7. RESPONSE BODY
---------------------------------------------------------------
res.end(data)

- Sends final response to browser
- Ends the request-response cycle
- Without this → browser keeps loading


🔹 8. SERVER START
---------------------------------------------------------------
server.listen(5000)

- Opens port 5000
- Server starts listening for requests


🔹 9. COMPLETE FLOW SUMMARY
---------------------------------------------------------------
User (Browser)
      ↓
Request (GET /about)
      ↓
Node.js Server
      ↓
Routing (if/else using req.url)
      ↓
Read HTML file (fs.readFile)
      ↓
Set headers (res.writeHead)
      ↓
Send response (res.end)
      ↓
Browser renders page 🎉

===============================================================
*/