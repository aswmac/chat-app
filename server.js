const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));

let chat1Claimed = false;
let chat2Claimed = false;

io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for claim and release events
  socket.on('claimChatWindow', (chatId) => {
    if ((chatId === 'chat1' && !chat1Claimed) || (chatId === 'chat2' && !chat2Claimed)) {
      if (chatId === 'chat1') chat1Claimed = true;
      else if (chatId === 'chat2') chat2Claimed = true;

      io.emit('chatWindowClaimed', { chatId, claimedBy: socket.id });
      console.log(`Chat window ${chatId} claimed by user ${socket.id}`);
    } else {
      socket.emit('claimFailed', { chatId });
    }
  });

  socket.on('releaseChatWindow', (chatId) => {
    if ((chatId === 'chat1' && chat1Claimed) || (chatId === 'chat2' && chat2Claimed)) {
      if (chatId === 'chat1') chat1Claimed = false;
      else if (chatId === 'chat2') chat2Claimed = false;

      io.emit('chatWindowReleased', { chatId });
      console.log(`Chat window ${chatId} released by user ${socket.id}`);
    }
  });

  // Listen for chat messages
  socket.on('chatMessage', ({ chatId, message }) => {
    io.emit('newMessage', { chatId, message });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    if (chat1Claimed && io.sockets.adapter.rooms.get(chat1Claimed)) chat1Claimed = false;
    if (chat2Claimed && io.sockets.adapter.rooms.get(chat2Claimed)) chat2Claimed = false;

    io.emit('chatWindowReleased', { chatId: 'chat1' });
    io.emit('chatWindowReleased', { chatId: 'chat2' });
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

