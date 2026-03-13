import { getRandomWords } from './wordList.js';

class GameRoom {
  constructor(roomId) {
    this.roomId = roomId;
    this.players = [];
    this.gameState = 'lobby'; // lobby, wordSelection, playing, roundEnd
    this.currentDrawerId = null;
    this.currentWord = null;
    this.currentWordOptions = [];
    this.roundStartTime = null;
    this.roundDuration = 80; // 80 seconds
    this.guessedPlayers = new Set();
    this.drawingData = [];
    this.chatMessages = [];
    this.roundNumber = 0;
    this.totalRounds = 3;
  }

  addPlayer(playerId, playerName) {
    const player = {
      id: playerId,
      name: playerName,
      score: 0,
      isDrawer: false,
      hasGuessed: false,
    };
    this.players.push(player);
    return player;
  }

  removePlayer(playerId) {
    this.players = this.players.filter((p) => p.id !== playerId);
  }

  getPlayer(playerId) {
    return this.players.find((p) => p.id === playerId);
  }

  startGame() {
    if (this.players.length < 2) return false;
    this.gameState = 'wordSelection';
    this.roundNumber = 1;
    this.selectDrawer();
    return true;
  }

  selectDrawer() {
    // Find a player who hasn't drawn yet in this cycle
    const undrawnPlayers = this.players.filter((p) => !p.hasDrawn);
    let drawer;

    if (undrawnPlayers.length > 0) {
      drawer = undrawnPlayers[Math.floor(Math.random() * undrawnPlayers.length)];
    } else {
      // Reset all and select randomly
      this.players.forEach((p) => (p.hasDrawn = false));
      drawer = this.players[Math.floor(Math.random() * this.players.length)];
    }

    // Reset previous drawer
    const prevDrawer = this.players.find((p) => p.isDrawer);
    if (prevDrawer) prevDrawer.isDrawer = false;

    this.currentDrawerId = drawer.id;
    drawer.isDrawer = true;
    drawer.hasDrawn = true;

    // Reset guessing
    this.players.forEach((p) => (p.hasGuessed = false));
    this.guessedPlayers.clear();

    // Generate word options
    this.currentWordOptions = getRandomWords(3);
    this.currentWord = null; // Drawer will select one
    this.drawingData = [];

    return drawer;
  }

  selectWord(wordIndex) {
    if (wordIndex >= 0 && wordIndex < this.currentWordOptions.length) {
      this.currentWord = this.currentWordOptions[wordIndex];
      this.gameState = 'playing';
      this.roundStartTime = Date.now();
      return true;
    }
    return false;
  }

  makeGuess(playerId, guess) {
    const player = this.getPlayer(playerId);
    if (!player || player.id === this.currentDrawerId || player.hasGuessed) {
      return { correct: false, message: 'Invalid guess' };
    }

    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedWord = this.currentWord.toLowerCase().trim();

    if (normalizedGuess === normalizedWord) {
      player.hasGuessed = true;
      this.guessedPlayers.add(playerId);

      // Calculate points based on time
      const elapsedTime = (Date.now() - this.roundStartTime) / 1000;
      const points = Math.max(50 - Math.floor(elapsedTime / 2), 10); // 50 points to 10 points
      player.score += points;

      // Give drawer points too
      const drawer = this.getPlayer(this.currentDrawerId);
      if (drawer) {
        drawer.score += Math.floor(points / 2);
      }

      return { correct: true, points, playerName: player.name };
    }

    return { correct: false, message: 'Wrong guess' };
  }

  addChatMessage(playerId, message) {
    const player = this.getPlayer(playerId);
    if (player) {
      this.chatMessages.push({
        playerId,
        playerName: player.name,
        message,
        timestamp: Date.now(),
      });
      return true;
    }
    return false;
  }

  addDrawingData(data) {
    this.drawingData.push(data);
  }

  checkRoundEnd() {
    // Round ends if everyone guessed or time is up
    const activePlayers = this.players.filter((p) => p.id !== this.currentDrawerId);
    const allGuessed = activePlayers.every((p) => p.hasGuessed);

    const elapsedTime = (Date.now() - this.roundStartTime) / 1000;
    const timeUp = elapsedTime >= this.roundDuration;

    return allGuessed || timeUp;
  }

  endRound() {
    this.gameState = 'roundEnd';
    if (this.roundNumber < this.totalRounds) {
      this.roundNumber++;
      return 'nextRound';
    } else {
      this.gameState = 'gameEnd';
      return 'gameEnd';
    }
  }

  getLeaderboard() {
    return this.players
      .map((p) => ({ name: p.name, score: p.score }))
      .sort((a, b) => b.score - a.score);
  }

  getGameState() {
    return {
      roomId: this.roomId,
      gameState: this.gameState,
      players: this.players,
      currentDrawerId: this.currentDrawerId,
      currentWordOptions: this.currentWordOptions,
      currentWord: this.currentWord,
      roundNumber: this.roundNumber,
      totalRounds: this.totalRounds,
      drawingData: this.drawingData,
      chatMessages: this.chatMessages,
      roundStartTime: this.roundStartTime,
      roundDuration: this.roundDuration,
    };
  }
}

class GameManager {
  constructor() {
    this.rooms = new Map();
  }

  createRoom(roomId) {
    const room = new GameRoom(roomId);
    this.rooms.set(roomId, room);
    return room;
  }

  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  deleteRoom(roomId) {
    this.rooms.delete(roomId);
  }

  getRoomOrCreate(roomId) {
    let room = this.getRoom(roomId);
    if (!room) {
      room = this.createRoom(roomId);
    }
    return room;
  }
}

export { GameManager, GameRoom };
