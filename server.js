const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.static('public')); // serve HTML, CSS, JS from /public

const users = {}; // socket.id => user info

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  // User Registration
  socket.on('register-user', (userInfo) => {
    users[socket.id] = { id: socket.id, ...userInfo };
    console.log('Registered:', users[socket.id]);
    sendUserList();
  });

  // Private Message
  socket.on('private-message', ({ to, message }) => {
    const fromUser = users[socket.id];
    if (io.sockets.sockets.get(to)) {
      io.to(to).emit('private-message', {
        from: socket.id,
        fromName: fromUser.name,
        message
      });
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    delete users[socket.id];
    sendUserList();
  });

  function sendUserList() {
    const userList = Object.values(users).map(u => ({
      id: u.id,
      name: u.name
    }));
    io.emit('user-list', userList);
  }
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
