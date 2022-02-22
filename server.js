const express = require('express');
// เอาไว้ cmd แสดง log ต่างๆ res req 
const morgan = require('morgan');
// เอาไว้รับส่งข้อมูล client -> server
const bodyParser = require('body-parser');
// เอาไว้รับส่งข้อมูลเหมือนกัน
const cors = require('cors');
require('dotenv').config();
const { readdirSync } = require('fs');
const SocketServer = require('./socketServer')
const { ExpressPeerServer } = require('peer')

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());

// Socket Io connection
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    SocketServer(socket)
})

// Create peer server
ExpressPeerServer(http, { path: '/' })


// Auto Routes
readdirSync('./routes')
.map((r) => app.use('/api', require('./routes/' + r)));


const port = process.env.PORT || 5000;
http.listen(port, () => {
    console.log('Server is running... on port ' + port);
})