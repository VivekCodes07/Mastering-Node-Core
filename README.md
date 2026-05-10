# 🚀 Node.js Core Mastery — Understanding the Runtime from the Inside Out

> A comprehensive backend engineering repository dedicated to mastering **core Node.js internals** using pure Vanilla Node.js — without hiding complexity behind frameworks.

This repository focuses on building a strong understanding of:

- The Event Loop
- Non-blocking I/O
- Runtime internals
- Streams & memory management
- Asynchronous architecture
- Core backend system design

---

# 📖 About This Repository

Most developers learn frameworks.

This repository focuses on learning **how Node.js actually works under the hood**.

The objective is to deeply understand the runtime mechanics that power scalable backend applications before moving into higher-level abstractions like Express.js or databases like MongoDB.

Instead of relying heavily on external libraries, this repository emphasizes:

✅ Core Node.js APIs  
✅ Runtime behavior  
✅ Event-driven architecture  
✅ Memory-efficient programming  
✅ Asynchronous execution  
✅ Backend fundamentals from first principles

---

# 🎯 Repository Goals

- Understand how Node.js handles concurrency
- Master asynchronous JavaScript patterns
- Learn how the Event Loop schedules operations
- Build backend utilities without frameworks
- Explore streams, buffers, and memory handling
- Create scalable and efficient server-side applications
- Develop production-oriented backend engineering fundamentals

---

# 🧠 Core Concepts Mastered

## Runtime & Architecture

- Event Loop
- Call Stack
- Callback Queue
- Microtasks & Macrotasks
- libuv Internals
- Single-threaded Concurrency Model
- Non-blocking I/O

---

## Modules & System APIs

- CommonJS Modules
- ES Modules (ESM)
- `path` Module
- `os` Module
- `process` Object
- Environment Variables

---

## File System & Data Handling

- File System (`fs`)
- Synchronous vs Asynchronous Operations
- Buffers
- Streams
- Pipes
- Large File Processing

---

## Backend Development

- HTTP Module
- Creating Servers
- Routing Basics
- Request/Response Lifecycle
- Status Codes
- Headers
- JSON Handling

---

## Asynchronous JavaScript

- Callbacks
- Callback Hell
- Promises
- Promise Chaining
- Async/Await
- Error Handling Patterns

---

## Event-Driven Programming

- EventEmitter
- Custom Events
- Event Listeners
- Pub/Sub Concepts

---

## Performance & Optimization

- Memory-efficient Processing
- Stream-based Data Transfer
- Avoiding Blocking Operations
- Efficient Async Patterns

---

# ⚙️ Conceptual Deep-Dive

## 🔄 Event Loop & Non-Blocking I/O

- Node.js executes JavaScript on a **single thread**, but delegates expensive operations like file handling and networking to background worker threads powered by `libuv`.
- Instead of waiting for operations to complete, Node.js continues executing other tasks, making it highly efficient for I/O-heavy applications.
- Completed asynchronous tasks are pushed into queues and processed by the Event Loop, enabling high concurrency with minimal resource usage.

---

## 🧩 Why Streams Matter

Streams allow Node.js to process data **piece-by-piece** instead of loading everything into memory at once.

This makes streams ideal for:

- Large file processing
- Video streaming
- Real-time data transfer
- High-performance backend systems

---

# 📚 Node.js Knowledge Base

---

<details>
<summary><strong>📂 File System (fs) Module</strong></summary>

## Reading Files

```js
const fs = require("fs");

fs.readFile("./sample.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});
```

---

## Writing Files

```js
const fs = require("fs");

fs.writeFile("./output.txt", "Hello Node.js", (err) => {
  if (err) throw err;

  console.log("File created successfully");
});
```

---

## Appending Data

```js
fs.appendFile("./log.txt", "\nNew Log Entry", (err) => {
  if (err) throw err;
});
```

</details>

---

<details>
<summary><strong>🌐 HTTP Module — Basic Server</strong></summary>

## Creating a Server

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      success: true,
      message: "Server Running",
    })
  );
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```

---

## Basic Routing

```js
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home Page");
  } else if (req.url === "/about") {
    res.end("About Page");
  } else {
    res.statusCode = 404;
    res.end("Route Not Found");
  }
});
```

</details>

---

<details>
<summary><strong>🌊 Streams & Buffers</strong></summary>

## Read Stream

```js
const fs = require("fs");

const stream = fs.createReadStream("./largeFile.txt", {
  encoding: "utf8",
});

stream.on("data", (chunk) => {
  console.log(chunk);
});
```

---

## Write Stream

```js
const writeStream = fs.createWriteStream("./output.txt");

writeStream.write("First Line\n");
writeStream.write("Second Line");
writeStream.end();
```

---

## Pipe Streams

```js
const readStream = fs.createReadStream("./input.txt");
const writeStream = fs.createWriteStream("./copy.txt");

readStream.pipe(writeStream);
```

---

## Buffers

```js
const buffer = Buffer.from("Node.js");

console.log(buffer);
console.log(buffer.toString());
```

</details>

---

<details>
<summary><strong>📡 EventEmitter</strong></summary>

## Creating Custom Events

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("login", (username) => {
  console.log(`${username} logged in`);
});

emitter.emit("login", "Sourav");
```

---

## Multiple Listeners

```js
emitter.on("orderPlaced", () => {
  console.log("Order received");
});

emitter.on("orderPlaced", () => {
  console.log("Sending confirmation email");
});

emitter.emit("orderPlaced");
```

</details>

---

<details>
<summary><strong>⏳ Async/Await & Promises</strong></summary>

## Promise Example

```js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
}

fetchData().then((data) => {
  console.log(data);
});
```

---

## Async/Await Example

```js
async function getData() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

getData();
```

</details>

---

# 🗂️ Project Structure

```bash
📦 nodejs-core-mastery
 ┣ 📂 exercises
 ┃ ┣ 📜 event-loop.js
 ┃ ┣ 📜 async-patterns.js
 ┃ ┣ 📜 streams.js
 ┃ ┣ 📜 buffers.js
 ┃ ┣ 📜 fs-module.js
 ┃ ┗ 📜 http-server.js
 ┃
 ┣ 📂 mini-projects
 ┃ ┣ 📜 file-manager
 ┃ ┣ 📜 custom-server
 ┃ ┣ 📜 cli-tool
 ┃ ┗ 📜 log-analyzer
 ┃
 ┣ 📜 package.json
 ┣ 📜 README.md
 ┗ 📜 .gitignore
```

---

# ▶️ How to Run

## Install Dependencies

```bash
npm install
```

---

## Run Any File

```bash
node filename.js
```

---

## Example

```bash
node event-loop.js
```

---

# 🧪 Recommended Learning Flow

1. Understand synchronous vs asynchronous execution
2. Learn the Event Loop deeply
3. Practice callbacks, promises, and async/await
4. Work with the File System module
5. Learn Streams & Buffers
6. Build HTTP servers from scratch
7. Explore EventEmitter patterns
8. Optimize memory and performance

---

# 📈 Next Learning Roadmap

The next phase of learning will focus on backend application architecture using:

- Express.js
- MongoDB
- REST APIs
- Authentication & Authorization
- MVC Architecture
- Middleware
- Database Design
- JWT Authentication
- API Security
- Scalable Backend Systems

These topics will be explored in a **separate dedicated repository** focused on full-stack backend development.

---

# 🧠 Engineering Philosophy

Frameworks are tools.

Understanding the runtime is the real superpower.

This repository represents a deliberate effort to build deep backend engineering knowledge by mastering the underlying mechanics before relying on abstractions.

---

# 🤝 Contributions

This is primarily a personal learning repository documenting backend engineering concepts, experiments, and hands-on exploration of Node.js internals.

However, meaningful suggestions, discussions, and improvements are always appreciated.

---

# 📌 Note

This repository is intended for educational and learning purposes only.

It serves as a structured knowledge base and practical playground for mastering core Node.js concepts and backend fundamentals.

---

# ⭐ Final Outcome

By completing this repository, I aim to confidently understand:

- How Node.js works internally
- How scalable backend systems are designed
- How asynchronous architecture operates
- How to write efficient server-side JavaScript
- How backend frameworks abstract core runtime mechanics
