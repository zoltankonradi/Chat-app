const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
users = [];
connections = [];

// server.listen(process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, 'public')));

console.log('Server running...');

app.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

//Connect
io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log(`Number of sockets connected: ${connections.length}`);
    //Disconnect
    connections.splice(connections.indexOf(socket), 1);
    console.log('Socket disconnected.');
});

module.exports = app;
