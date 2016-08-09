var server = require('express')();
var http = require('http').Server(server);

server.get('/',function () {
  res.send("<p>Hey get outta here!</p>");
});

http.listen(3001, function () {
  console.log("Server is definitely not evil on port 3001");
});