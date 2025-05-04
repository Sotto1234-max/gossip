const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.static('public')); // <-- serve HTML & assets

io.on('connection', socket => {
  console.log('User connected:', socket.id);
  // your socket logic here
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
