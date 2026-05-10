const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  /*
  =================================
  HOME ROUTE
  =================================
  */

  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(`
      <html>
        <body>
          <form action="/submit-data" method="POST">

            <label>Username:</label><br>
            <input
              type="text"
              name="username"
              placeholder="John_Doe"
            >

            <br><br>

            <label>Email:</label><br>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
            >

            <br><br>

            <button type="submit">
              Submit
            </button>

          </form>
        </body>
      </html>
    `);
  } else if (req.url === "/submit-data" && req.method === "POST") {

  /*
  =================================
  FORM SUBMISSION ROUTE
  =================================
  */
    /*
    Stores complete incoming request data
    */

    let body = "";

    /*
    Converts Buffer chunks into strings
    automatically
    */

    /*
    =================================
    "data" EVENT
    =================================

    Request data arrives in chunks.

    This callback runs every time
    a chunk arrives.

    Small requests:
    -> usually one chunk

    Large requests:
    -> multiple chunks
    */

    req.on("data", (chunk) => {
      console.log("\nChunk Received:");
      console.log(chunk);

      /*
      Append incoming chunk
      into body string
      */

      body += chunk;
    });

    /*
    =================================
    "end" EVENT
    =================================

    Fires after ALL chunks arrive.

    body now contains complete
    request data.

    Example:

    username=harsh&email=test@gmail.com
    */

    req.on("end", () => {
      console.log("\nRaw Body:");
      console.log(body);

      /*
      =================================
      URLSearchParams
      =================================

      Parses URL encoded string.

      Example:

      username=harsh&email=test@gmail.com

      Gives helper methods like:

      .get()
      .has()
      .entries()
      */

      const params = new URLSearchParams(body);
      console.log(params);
      console.log(params.get("username"));

      console.log(params.get("email"));

      /*
      =================================
      Object.fromEntries()
      =================================

      Converts key-value pairs
      into normal JavaScript object.
      */

      const bodyObj = Object.fromEntries(params);

      console.log("\nParsed Object:");
      console.log(bodyObj);

      fs.writeFileSync("data.txt", JSON.stringify(bodyObj));
 
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });

      /*
      Sends response and ends
      request-response cycle
      */
      
      res.end("Form submitted successfully!");
    });
  } else {

  /*
  =================================
  404 ROUTE
  =================================
  */
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });

    res.end("404 Route Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on PORT 3000");
});

/*
========================================
COMPLETE REQUEST FLOW
========================================

1. Browser sends POST request
                 ↓

2. Form data becomes string

   username=harsh&email=test@gmail.com

                 ↓

3. Request data arrives in chunks
                 ↓

4. req.on("data")
   runs for every chunk
                 ↓

5. Chunks get appended into body
                 ↓

6. req.on("end")
   fires after all chunks arrive
                 ↓

7. URLSearchParams parses string
                 ↓

8. Object.fromEntries converts
   parsed data into normal object

   Final Object:

   {
     username: "harsh",
     email: "test@gmail.com"
   }

                 ↓

9. res.end() sends response
   and completes request cycle

========================================
*/
