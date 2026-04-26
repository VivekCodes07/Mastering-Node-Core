import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === '/about') {

        // Set response header
        res.writeHead(200, { 'Content-Type': 'text/plain' });

        res.write('About Page');
    } else {

        res.writeHead(404, { 'Content-Type': 'text/plain' });

        res.write('Page Not Found');
    }

    res.end();
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});

/*
/*
==================== NODE.JS REQUEST FLOW ====================

        🧑 User (Browser)
                │
                │  types URL
                ▼
     http://localhost:3000/about
                │
                │  HTTP Request
                ▼
        📡 GET /about
                │
                ▼
        🖥️ Node.js Server
                │
                │  runs on every request
                ▼
     (req, res) => { ... }
                │
                │
                ▼
        🔍 Routing Logic
        ----------------
        if (req.url === '/about')
                │
                ▼
        📤 Response Sent
        ----------------
        res.write("About Page")
        res.end()
                │
                ▼
        🌐 Browser Receives Response
                │
                ▼
        🎉 Displays:
        "About Page"

===============================================================
*/
