import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { GameManager } from './gameManager.js';
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const gameManager = new GameManager();
const PORT = process.env.PORT || 3001;

// Socket.io events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (data) => {
    const { roomId, playerName } = data;
    socket.join(roomId);

    const room = gameManager.getRoomOrCreate(roomId);
    const player = room.addPlayer(socket.id, playerName);

    // Send room state to all players
    io.to(roomId).emit('playerJoined', {
      players: room.players,
      newPlayer: player,
    });

    socket.emit('roomState', room.getGameState());
    console.log(`${playerName} joined room ${roomId}`);
  });

  socket.on('leaveRoom', (roomId) => {
    const room = gameManager.getRoom(roomId);
    if (room) {
      room.removePlayer(socket.id);
      io.to(roomId).emit('playerLeft', {
        players: room.players,
      });

      if (room.players.length === 0) {
        gameManager.deleteRoom(roomId);
      }
    }
    socket.leave(roomId);
  });

  socket.on('startGame', (roomId) => {
    const room = gameManager.getRoom(roomId);
    if (room && room.startGame()) {
      const drawer = room.players.find((p) => p.isDrawer);
      io.to(roomId).emit('gameStarted', {
        drawer: drawer,
        wordOptions: room.gameState === 'wordSelection' ? room.currentWordOptions : null,
        roundNumber: room.roundNumber,
        totalRounds: room.totalRounds,
      });

      // Only send word options to drawer
      socket.to(drawer.id).emit('selectWord', {
        options: room.currentWordOptions,
      });
    }
  });

  socket.on('selectWord', (data) => {
    const { roomId, wordIndex } = data;
    const room = gameManager.getRoom(roomId);
    if (room && room.selectWord(wordIndex)) {
      io.to(roomId).emit('wordSelected', {
        gameState: room.gameState,
        roundStartTime: room.roundStartTime,
        roundDuration: room.roundDuration,
      });
    }
  });

  socket.on('draw', (data) => {
    const { roomId, drawData } = data;
    const room = gameManager.getRoom(roomId);
    if (room) {
      room.addDrawingData(drawData);
      socket.to(roomId).emit('draw', drawData);
    }
  });

  socket.on('guess', (data) => {
    const { roomId, guess } = data;
    const room = gameManager.getRoom(roomId);
    if (room && room.gameState === 'playing') {
      const result = room.makeGuess(socket.id, guess);

      if (result.correct) {
        io.to(roomId).emit('correctGuess', {
          playerName: result.playerName,
          points: result.points,
          players: room.players,
        });

        // Check if round should end
        setTimeout(() => {
          if (room.checkRoundEnd()) {
            const nextAction = room.endRound();
            io.to(roomId).emit('roundEnded', {
              word: room.currentWord,
              leaderboard: room.getLeaderboard(),
              nextAction,
            });

            if (nextAction === 'nextRound') {
              setTimeout(() => {
                const drawer = room.selectDrawer();
                io.to(roomId).emit('nextRound', {
                  drawer: drawer,
                  wordOptions: room.currentWordOptions,
                  roundNumber: room.roundNumber,
                });
              }, 3000);
            } else {
              io.to(roomId).emit('gameEnded', {
                leaderboard: room.getLeaderboard(),
              });
            }
          }
        }, 500);
      }
    }
  });

  socket.on('sendMessage', (data) => {
    const { roomId, message } = data;
    const room = gameManager.getRoom(roomId);
    if (room && room.addChatMessage(socket.id, message)) {
      const player = room.getPlayer(socket.id);
      io.to(roomId).emit('newMessage', {
        playerName: player.name,
        message,
        timestamp: Date.now(),
      });
    }
  });

  socket.on('clearCanvas', (roomId) => {
    const room = gameManager.getRoom(roomId);
    if (room) {
      room.drawingData = [];
      io.to(roomId).emit('canvasCleared');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
