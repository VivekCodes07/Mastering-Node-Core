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

    let data = [];

    // STEP 1: collect chunks
    req.on("data", (chunk) => {
      console.log("Chunk received:", chunk);
      data.push(chunk);
    });

    // STEP 2: all chunks received
    req.on("end", () => {

      // combine all chunks
      const finalData = Buffer.concat(data).toString();

      console.log("Final Data:", finalData);

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
-----------------------------------------
HOW REQUEST DATA IS HANDLED IN NODE.JS
-----------------------------------------

1. req is a readable stream.
2. Incoming form data arrives in small chunks (buffers).
3. Each chunk is collected inside the 'data' array.
4. When all chunks are received, the 'end' event fires.
5. Buffer.concat(data) merges all chunks into one buffer.
6. toString() converts the buffer into readable text.

Example Output:
username=John&email=test@gmail.com

NOTE:
Using data.toString() directly is not reliable because
'data' is an array of buffers, not a single buffer.
Always use:

Buffer.concat(data).toString()

for correct results.
*/