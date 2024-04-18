const express = require('express')
const { Socket } = require('socket.io')
const app = express()

const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () =>{
    console.log(`listning on port number ${PORT}`)
})

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/'))

app.get('/',(req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

// Socket io

const io = require('socket.io')(http)

io.on('connection', (Socket) =>{
    console.log("Its connected")
    Socket.on('message', (msg) =>{
        // console.log(msg)
        Socket.broadcast.emit('message',msg)

    })
})