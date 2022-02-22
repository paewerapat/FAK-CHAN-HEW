let users = [];

const EditData = (data, id, call) => {
    const newData = data.map(item => 
        item.id === id ? {...item, call} : item    
    )
    return newData
}

const SocketServer = (socket) => {

    // Connect - Disconnect
    socket.on('joinUser', user => {
        users.push({id: user.villagers_id, socketId: socket.id})
    })

    socket.on('disconnect', () => {
        const data = users.find(user => user.socketId === socket.id)
        if(users.length > 1){
            users.forEach(client => {
                socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
            })
        }
        users = users.filter(user => user.socketId !== socket.id)
    })


    // Check User Online / Offline
    socket.on('checkUserOnline', data => {
        socket.emit('checkUserOnlineToMe', users)
        
        if(users.length > 1) {
            users.forEach(client => {
                socket.to(`${client.socketId}`).emit('checkUserOnlineToClient', data.villagers_id)
            })
        }
    })


    // Notification
    socket.on('createNotify', msg => {
        const client = users.find(user => msg.recipients.includes(user.id))
        client && socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)
    })

    socket.on('removeNotify', msg => {
        const client = users.find(user => msg.recipients.includes(user.id))
        client && socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg)
    })
}

module.exports = SocketServer