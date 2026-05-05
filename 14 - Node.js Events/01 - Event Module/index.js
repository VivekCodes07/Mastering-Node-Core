/*
===========================================
EVENTS IN NODE.JS (My Notes)
===========================================

Event = A signal that something has happened in the application.

Node.js follows an event-driven architecture.
A lot of its core modules (like HTTP) rely on events.

Example (important to remember):
--------------------------------
When we create a web server using the HTTP module:
- The server listens on a port
- Whenever a request comes in → an event is raised ("request")
- Our job = listen to that event and send a response

So basically:
Event happens → We react to it

--------------------------------
Node has a built-in module called "events"
which helps us create and handle our own events.
===========================================
*/


// 1. Import the EventEmitter class (blueprint)
const EventEmitter = require("events");

/*
2. Create an instance of EventEmitter

Important:
- EventEmitter (capital E) = class
- emitter (small e) = actual object we use

Think:
Class → Blueprint
Object → Real usable thing
*/
const emitter = new EventEmitter();


/*
3. Register a listener

emitter.on(eventName, callback)

- eventName → name of the event (we define it)
- callback → function that runs when event occurs

Note:
Listener should be registered BEFORE emitting the event
*/
emitter.on("messageLogged", () => {
  console.log("Listener called!");
});


/*
4. Raise (emit) an event

emitter.emit(eventName)

- This triggers the event
- All listeners attached to this event will run
*/
emitter.emit("messageLogged");


/*
===========================================
MOST USED METHODS (keep it simple)
===========================================

1. emitter.on()
   → used to listen/subscribe to an event

2. emitter.emit()
   → used to raise/trigger an event

That's 90% of what I'll use in practice.
===========================================
*/


/*
===========================================
PASSING DATA WITH EVENTS (Important concept)
===========================================

We can send data when emitting an event
and receive it inside the listener.
*/

emitter.on("messageLoggedWithData", (arg) => {
  console.log("Listener called with data:", arg);
});

emitter.emit("messageLoggedWithData", {
  id: 1,
  url: "http://example.com",
});


/*
===========================================
MENTAL MODEL (helps a lot)
===========================================

emitter.on()   → "Hey, notify me when this happens"
emitter.emit() → "Hey, this just happened!"

It's like:
Subscribe → Notify

===========================================
*/