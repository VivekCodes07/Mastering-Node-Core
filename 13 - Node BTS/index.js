// ==========================================================
// 🧠 NODE.JS INTERNAL FLOW — MY UNDERSTANDING (NOTES)
// ==========================================================
// Goal:
// I want to clearly understand how Node executes code step by step:
// - Call Stack
// - Microtasks (Promises)
// - Macrotasks (setTimeout)
// - Event Loop
// - libuv
//
// Rule I’m testing here:
// 👉 Sync → Microtasks → Timers (Callback Queue)
// ==========================================================



/*
==========================================================
🟢 STEP 1: START (GLOBAL EXECUTION)
==========================================================

Okay so first:
- Entire file is loaded into V8
- Global Execution Context is created
- Pushed into Call Stack

Anything synchronous runs immediately
*/

console.log("1. Start");

/*
Expectation:
→ This goes straight to Call Stack
→ Executes immediately
→ Output: 1. Start
*/



/*
==========================================================
🟡 STEP 2: FIRST setTimeout
==========================================================

Important:
setTimeout does NOT go to Call Stack for execution

What actually happens:
1. JS sees setTimeout
2. Hands it over to libuv
3. libuv registers timer (0ms)
4. Timer runs outside JS execution

JS DOES NOT WAIT — keeps going
*/

setTimeout(() => {
  console.log("4. setTimeout callback");
});

/*
Note to self:
Even if delay = 0
→ it still won’t run immediately
→ it has to wait for Event Loop turn
*/



/*
==========================================================
🔵 STEP 3: PROMISE (MICROTASK)
==========================================================

This is different from setTimeout

Flow:
1. Promise resolves immediately
2. .then() goes to Microtask Queue
3. Microtask Queue = HIGH PRIORITY

Important:
→ This will run BEFORE setTimeout
*/

Promise.resolve().then(() => {
  console.log("3. Promise callback");
});



/*
==========================================================
🟡 STEP 4: SECOND setTimeout
==========================================================

Same as first one:
→ goes to libuv
→ timer registered
→ will later go to timers phase

Order matters:
→ first timeout will execute before second
*/

setTimeout(() => {
  console.log("5. Second setTimeout");
});



/*
==========================================================
🟢 STEP 5: CONTINUE SYNC CODE
==========================================================

Still inside Call Stack
Nothing async has executed yet
*/

console.log("2. End");

/*
Output so far:
1. Start
2. End

Now:
👉 Call Stack becomes EMPTY
This is the moment Event Loop starts doing its job
*/



/*
==========================================================
🔁 STEP 6: EVENT LOOP TAKES OVER
==========================================================

Event Loop keeps checking:

👉 "Is Call Stack empty?"

Now it is → YES
So it starts processing queues
*/



/*
==========================================================
⚡ STEP 7: MICROTASK QUEUE (ALWAYS FIRST)
==========================================================

Golden rule:
👉 Before anything else, clear ALL microtasks

So:
→ Promise callback runs NOW
*/

/// Output:
/// 3. Promise callback



/*
==========================================================
🐢 STEP 8: TIMERS (CALLBACK QUEUE)
==========================================================

Now Event Loop moves to timers phase

Important:
- These were handled by libuv earlier
- Now they are ready to execute

Execution order:
→ First setTimeout
→ Then second setTimeout
*/

/// Output:
/// 4. setTimeout callback
/// 5. Second setTimeout



/*
==========================================================
🏁 FINAL OUTPUT (CONFIRMED)
==========================================================

1. Start
2. End
3. Promise callback
4. setTimeout callback
5. Second setTimeout

✔ Matches expectation
*/



/*
==========================================================
🧠 WHAT I SHOULD REMEMBER (IMPORTANT)
==========================================================

1. JS runs sync code FIRST (Call Stack)

2. After stack is empty:
   → ALL microtasks run (Promises)

3. Then:
   → timers (setTimeout) execute

4. Event Loop keeps repeating this cycle



🔥 UPGRADED RULE (more accurate):

→ After every phase:
   run ALL microtasks
   then continue Event Loop
*/



/*
==========================================================
⚙️ INTERNAL ARCHITECTURE (MENTAL MODEL)
==========================================================

V8 Engine:
→ Executes JS

Call Stack:
→ Runs sync code

libuv:
→ Handles async work (timers, fs, network)

Event Loop:
→ Decides WHAT runs and WHEN

Queues:
→ Microtask Queue (high priority)
→ Timer Queue (setTimeout)

---------------Full System Flow----------------------


                    ┌──────────────────────┐
                    │   Your JS Code       │
                    └─────────┬────────────┘
                              ↓
                    ┌──────────────────────┐
                    │     Call Stack 🧵     │
                    │ (Sync Execution)     │
                    └─────────┬────────────┘
                              ↓
                ┌──────── Async Task? ────────┐
                │                             │
                │ NO                          │ YES
                │                             ↓
                │                  ┌──────────────────────┐
                │                  │       libuv ⚙️        │
                │                  │ (Async Manager)      │
                │                  └─────────┬────────────┘
                │                            ↓
                │          ┌──────────────────────────────┐
                │          │   How to handle task?        │
                │          └─────────┬─────────┬──────────┘
                │                    │         │
                │                    │         │
                │         ┌──────────▼───┐   ┌─▼──────────────┐
                │         │ Thread Pool  │   │ OS Async APIs  │
                │         │     🧵        │   │      🌐         │
                │         └──────┬───────┘   └──────┬─────────┘
                │                ↓                  ↓
                │        (fs, crypto, DNS)     (HTTP, sockets)
                │                ↓                  ↓
                │          └──────────┬─────────────┘
                │                     ↓
                │          ┌──────────────────────┐
                │          │     Queues 📬        │
                │          │ ───────────────────  │
                │          │ Microtask ⚡         │
                │          │ Macrotasks 🐢       │
                │          └─────────┬────────────┘
                │                    ↓
                │          ┌──────────────────────┐
                │          │    Event Loop 🔁      │
                │          └─────────┬────────────┘
                │                    ↓
                └───────────────┬────┘
                                ↓
                    ┌──────────────────────┐
                    │   Call Stack 🧵       │
                    │ (Execute callback)   │
                    └──────────────────────┘


 ===================Event Loop Priority=====================
1. Run synchronous code 🧵
2. Run ALL Microtasks ⚡ (Promises)
3. Run ONE Macrotask 🐢 (Timers / I/O)
4. Repeat 🔁




================NODE PHASES (MACROTASK BREAKDOWN)======================

          ┌───────────────┐
        │ Timers Phase  │  ← setTimeout
        └──────┬────────┘
               ↓
        ┌───────────────┐
        │ Poll Phase    │  ← fs, http (MOST IMPORTANT)
        └──────┬────────┘
               ↓
        ┌───────────────┐
        │ Check Phase   │  ← setImmediate
        └──────┬────────┘
               ↓
        ┌───────────────┐
        │ Close Phase   │
        └───────────────┘

⚡ Microtasks run between every phase




🧠 FINAL THOUGHT:

Node is NOT just JS

It is:
→ JS engine (V8)
→ Async engine (libuv)
→ Event coordinator (Event Loop)
*/