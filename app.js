// // const express = require("express");
// // const app = express();
// // const http = require("http");
// // const socketio = require("socket.io");
// // const server = http.createServer(app);

// // const io = socketio(server);



// // app.set("view engine","ejs");
// // app.set(express.static(path.join(__dirname,"public"))); //ye apan images aur css us kar pae is liye

// // io.on("connection",funtion (socket){
// //     console.log("connected");
// // });

// // app.get("/",function(req,res){
// //     res.send("hey")
// // })
// // app.listen(3000);
// const express = require("express");
// const app = express();
// const path = require("path");
// const http = require("http");
// const socketio = require("socket.io");
// const server = http.createServer(app);

// const io = socketio(server);

// app.set("view engine","ejs");
// app.set(express.static(path.join(__dirname,"public"))); //ye apan images aur css us kar pae is liye

// io.on("connection", funtion (socket) {
//     console.log("connected");
// });

// app.get("/",function(req,res){
//     res.send("hey")
// })
// app.listen(3000);















// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const path = require("path");
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(express.static('public')); // Assuming you have static assets in a "public" folder

// app.set("view engine","ejs");
// app.set(express.static(path.join(__dirname,"public"))); //ye apan images aur css us kar pae is liye

// io.on("connection", function (socket) {
//   console.log("A user connected");

// //   socket.on('send-location', function (socket)  { //receiving location from one
// //     io.emit("receive-location",{ id: socket.id, ...data}); // sending location to forntend all can see
// //     // console.log('User disconnected');
// //   });
//  socket.on('send-location', function (socket)  { //receiving location from one
//     io.emit("receive-location",{ id: socket.id, ...data}); // sending location to forntend all can see
//     // console.log('User disconnected');
//   });


// //   socket.on('chat message', (msg) => {
// //     console.log('message: ' + msg);
// //     io.emit('chat message', msg); // Broadcast the message to everyone
// //   });
// });


// app.get("/",function(req,res){
//     res.render("index")
// })

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });















const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set the views directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serve static assets from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for location data from a client
  socket.on('send-location', (data) => {
    io.emit("receive-location", { id: socket.id, ...data }); // Broadcast location data to all clients
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    io.emit("user-disconnected", socket.id); // Notify all clients about the disconnection
  });
});

// Define routes
app.get("/", (req, res) => {
  res.render("index"); // Render the "index.ejs" template
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
















// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const path = require("path");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // ------------------------Added code to setup EJS engine---------------------------------
//  // Set the view engine to ejs
//  app.set('view engine', 'ejs');

//  // Set the views directory (where your EJS files are located)
//  app.set('views', path.join(__dirname)); // Assuming EJS files are in same folder
// //------------------------------------------------------------------------------------------

// app.use(express.static('public')); // Assuming you have static assets in a "public" folder

// io.on("connection", function (socket) {
//   console.log("A user connected");

// //   socket.on('disconnect', () => {
// //     console.log('User disconnected');
// //   });

// //   socket.on('chat message', (msg) => {
// //     console.log('message: ' + msg);
// //     io.emit('chat message', msg); // Broadcast the message to everyone
// //   });
// });


// app.get("/",function(req,res){
//    res.render("index")
// })

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });