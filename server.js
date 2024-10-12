// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static('public'));

// Listen for connections
io.on('connection', (socket) => {
    console.log('New user connected');

    // Listen for chat messages
    socket.on('chatMessage', (msg) => {
        // Broadcast the message to all connected clients
        io.emit('chatMessage', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
