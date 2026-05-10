const http = require("http");

const server = http.createServer((req, res) => {

  // HOME PAGE (GET)
  if (req.url === "/" && req.method === "GET") {

    res.write(`
      <html>
        <form action="/submit-data" method="POST">

          <label>Enter Username:</label><br/>
          <input type="text" name="username" placeholder="John_Doe">

          <br/><br/>

          <label>Enter Email:</label><br/>
          <input type="email" name="email" placeholder="example@gmail.com">

          <br/><br/>

          <input type="submit" value="Submit">

        </form>
      </html>
    `);

    return res.end();
  }

  // FORM SUBMISSION (POST)
  else if (req.url === "/submit-data" && req.method === "POST") {

    let data = "";

    // STEP 1: collect chunks
    req.on("data", (chunk) => {
      console.log("Chunk received:", chunk);
      data += chunk;
      // BTS: data = data + chunk.toString();
    });

    // STEP 2: all chunks received
    req.on("end", () => {
      console.log("Final Data (string):", data);

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("Form received successfully!");
      res.end();
    });

  }

  // fallback
  else {
    res.writeHead(404);
    res.end("Route not found");
  }

});

server.listen(3000, () => {
  console.log("Server running on PORT: 3000");
});


/*
IMPORTANT BEHAVIOR OF "data" EVENT IN NODE.JS STREAMS:

- The callback inside req.on("data") runs EVERY TIME a chunk of data arrives.
- Each chunk is a part of the full request body (not the complete data).
- If the request body is small, Node may send it in a single chunk → callback runs once.
- If the request body is large, it will be split → callback runs multiple times.

So:
👉 One request ≠ one callback execution
👉 One chunk = one callback execution

This is why console.log may appear once or multiple times depending on chunk splitting.
*/