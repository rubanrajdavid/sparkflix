var socket = io();
socket.on('ack', data => {
    console.log(data)
})
// Send current time to all connected clients
function sendTime() {
    socket.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 2000);
