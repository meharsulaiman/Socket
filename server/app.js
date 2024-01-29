import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

const port = 3000;
const app = express();

app.use(cors());

// SOCKET.IO
const server = new createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('message', (data) => {
    console.log(data);
    io.to(data.room).emit('message-one', data.message);
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
