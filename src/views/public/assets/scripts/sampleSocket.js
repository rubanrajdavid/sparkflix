var io = io();
io.on('connection', socket => {
    socket.emit("joinRoom", (screenID)=>{
        var 
    })
    socket.to(screenID).emit("joinedScreen", { time: new Date().toJSON() });
    socket.on("joinedRoom", (data) => {
        console.log(data)
    })
});

// Send current time to all connected clients

socket.emit('time', { time: new Date().toJSON() });



