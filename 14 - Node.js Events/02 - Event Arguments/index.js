/*
===========================================
EVENT ARGUMENTS IN NODE.JS (My Notes)
===========================================

Goal:
Understand how to pass data with events.

Important rule (don't forget):
→ Listener MUST be registered before emitting
→ Otherwise the event is lost
===========================================
*/

const EventEmitter = require("events");
const emitter = new EventEmitter();


/*
===========================================
BASIC ARGUMENT PASSING
===========================================

We can pass data when emitting an event
and receive it inside the listener.
*/

// Step 1: Register listener
emitter.on("messageLogged", (arg) => {
  console.log("Received:", arg);
});

// Step 2: Emit event with data
emitter.emit("messageLogged", 1);


/*
===========================================
BEST PRACTICE → USE OBJECTS
===========================================

Instead of passing multiple values,
use a single object.

Why?
- Cleaner
- More readable
- Easy to extend later
*/

emitter.on("messageLoggedWithData", (arg) => {
  console.log("ID:", arg.id);
  console.log("URL:", arg.url);
});

emitter.emit("messageLoggedWithData", {
  id: 1,
  url: "http://example.com",
});


/*
===========================================
MULTIPLE ARGUMENTS (NOT IDEAL)
===========================================

Possible, but not recommended
because order matters and gets confusing
*/

emitter.on("multiArgsEvent", (id, url) => {
  console.log("ID:", id);
  console.log("URL:", url);
});

emitter.emit("multiArgsEvent", 1, "http://example.com");


/*
===========================================
MENTAL MODEL
===========================================

emit() → sends data
on()   → receives data

Event = signal + data (payload)

No data → limited use
===========================================
*/