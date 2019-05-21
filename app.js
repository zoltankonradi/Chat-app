const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
users = [];
connections = [];

// server.listen(process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, 'public')));
server.listen(process.env.PORT || 8081);
console.log('Server running...');

//Connect
io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log(`Number of sockets connected: ${connections.length}`);
    //Disconnect
    socket.on('disconnect', (data) => {
        users.splice(users.indexOf(socket.username), 1);
        updateUserNames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Socket disconnected.');
    });
    //Send message
    socket.on('send message', (data) => {
        io.sockets.emit('new message', { message : data, user : socket.username })
    });
    //New user
    socket.on('new user', (data, callback) => {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUserNames();
    });
    function updateUserNames() {
        io.sockets.emit('get users', users);
    }
});

module.exports = app;
