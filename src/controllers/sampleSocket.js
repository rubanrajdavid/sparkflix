let controller = {
    connected: (socket) => {
        socket.on('time', (data) => {
            socket.emit('ack', { status: "Recieved Successfully" })
            console.log(data)
        })
        socket.emit('')
    }
}

module.exports = controller