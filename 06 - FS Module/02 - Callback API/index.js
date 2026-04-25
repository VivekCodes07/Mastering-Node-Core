import * as fs from "fs";

fs.writeFile("hey.txt", "Hello", function(err) {
  if (err) return console.log(err);

  fs.appendFile("hey.txt", " World", function(err) {
    if (err) return console.log(err);

    fs.rename("hey.txt", "hello.txt", function(err) {
      if (err) return console.log(err);

      console.log("All done");
    });
  });
});