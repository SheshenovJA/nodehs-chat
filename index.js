const express = require('express');
const socket = require('socket.io');

//server congif
const app = express();

const server = app.listen(3000, () => {
  console.log('hi, app running on port 3000');
});

//static files

app.use(express.static('public'));

//include socket

const io = socket(server);

// listen connection events via socket
io.attach(server);
io.on('connection', (socket) => {
  console.log('socket connection is ok', socket.id);

  socket.on('chat', (data)=> {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data)
  })

});
