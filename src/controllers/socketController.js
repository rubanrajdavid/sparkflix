
let controller = {
    // userJoin: (id, room) => {
    //     const users = [];
    //     const user = { id, room };
    //     users.push(user);
    //     return user;
    // },
    connection: (io) => {
        io.on('connection', (socket) => {
            socket.emit("greetMsg", "Welcome to SparkFlix")
            socket.on("joinRoom", (data) => {
                socket.join(data)
                socket.broadcast.to(data).emit("newUserConnectMsg", "A new User Connected in room " + data)
            })
            socket.on("screenCom", (data) => {
                var screenID = data.id
                var type = data.type
                socket.broadcast.to(screenID).emit("controls", type)
                console.log(data, screenID, type)
            })
            // socket.on("disconnect", () => { io.emit("userDisconnectMsg", "A User Disconnected") })
        })
    }
}

module.exports = controller