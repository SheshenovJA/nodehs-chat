//init connection
const socket = io('ws://192.168.88.254:3000', {transports: ['websocket']});

//var socket = io('ws://localhost:3000', {transports: ['websocket']});
//socket.on('connect', function () {
  //console.log('connected!');
  //socket.emit('greet', { message: 'Hello Mr.Server!' });
//});

socket.on('respond', function (data) {
  console.log(data);
});
//selectom dom element
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let status = document.getElementById('status');

//emit via socket
btn.addEventListener('click', (e) => {
  //if (e.keyCode === 13) {
  e.preventDefault();
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
    message.value = '';
//}
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);

})

socket.on('chat', (data) => {
  status.innerHTML = '';
  output.innerHTML += "<p><strong>" + data.handle +
  ": </strong>" + data.message + "</p>";

});

socket.on('typing', (data) => {
  status.innerHTML = '<p><em>' + data + ' typing message</em></p>';
})
