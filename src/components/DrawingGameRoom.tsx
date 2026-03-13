import { useState, useEffect } from 'react';
import type { DrawingEvent } from './DrawingCanvas';
import { Socket } from 'socket.io-client';
import DrawingCanvas from './DrawingCanvas';

interface DrawingGameRoomProps {
  socket: Socket;
  roomId: string;
  playerName: string;
  onBack: () => void;
}

interface Player {
  id: string;
  name: string;
  score: number;
  isDrawer: boolean;
  hasGuessed: boolean;
}

interface Message {
  playerName: string;
  message: string;
  timestamp: number;
  isCorrect?: boolean;
}

export default function DrawingGameRoom({
  socket,
  roomId,
  onBack,
}: DrawingGameRoomProps) {
  const [gameState, setGameState] = useState<string>('lobby');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentDrawerId, setCurrentDrawerId] = useState<string>('');
  const [wordOptions, setWordOptions] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [drawingEvents, setDrawingEvents] = useState<DrawingEvent[]>([]);
  const [timer, setTimer] = useState(80);
  const [roundNumber, setRoundNumber] = useState(0);
  const [totalRounds, setTotalRounds] = useState(3);
  const [leaderboard, setLeaderboard] = useState<Array<{ name: string; score: number }>>([]);
  const [gameEnded, setGameEnded] = useState(false);

  const isDrawer = currentDrawerId === socket.id;
  const isPlaying = gameState === 'playing';

  // Handle room state updates
  useEffect(() => {
    socket.on('roomState', (state) => {
      setGameState(state.gameState);
      setPlayers(state.players);
      setCurrentDrawerId(state.currentDrawerId);
      setRoundNumber(state.roundNumber);
      setTotalRounds(state.totalRounds);
    });

    socket.on('playerJoined', (data) => {
      setPlayers(data.players);
    });

    socket.on('playerLeft', (data) => {
      setPlayers(data.players);
    });

    socket.on('gameStarted', (data) => {
      setCurrentDrawerId(data.drawer.id);
      setRoundNumber(data.roundNumber);
      setTotalRounds(data.totalRounds);
      setGameState('wordSelection');
      setTimer(80);
      setDrawingEvents([]);
      setMessages([]);
    });

    socket.on('selectWord', (data) => {
      setWordOptions(data.options);
    });

    socket.on('wordSelected', (data) => {
      setGameState(data.gameState);
      setTimer(80);
      setDrawingEvents([]);
    });

    socket.on('draw', (drawData) => {
      setDrawingEvents((prev) => [...prev, drawData]);
    });

    socket.on('canvasCleared', () => {
      setDrawingEvents([]);
    });

    socket.on('newMessage', (data) => {
      setMessages((prev) => [
        ...prev,
        {
          playerName: data.playerName,
          message: data.message,
          timestamp: data.timestamp,
        },
      ]);
    });

    socket.on('correctGuess', (data) => {
      setMessages((prev) => [
        ...prev,
        {
          playerName: data.playerName,
          message: '✓ Guessed correctly!',
          timestamp: Date.now(),
          isCorrect: true,
        },
      ]);
      setPlayers(data.players);
    });

    socket.on('roundEnded', (data) => {
      setGameState('roundEnd');
      setMessages((prev) => [
        ...prev,
        {
          playerName: 'System',
          message: `Word was: ${data.word}`,
          timestamp: Date.now(),
        },
      ]);
      setLeaderboard(data.leaderboard);
    });

    socket.on('nextRound', (data) => {
      setCurrentDrawerId(data.drawer.id);
      setRoundNumber((prev) => prev + 1);
      setGameState('wordSelection');
      setTimer(80);
      setDrawingEvents([]);
      setMessages([]);
      setWordOptions(data.wordOptions);
    });

    socket.on('gameEnded', (data) => {
      setGameState('gameEnd');
      setLeaderboard(data.leaderboard);
      setGameEnded(true);
    });

    return () => {
      socket.off('roomState');
      socket.off('playerJoined');
      socket.off('playerLeft');
      socket.off('gameStarted');
      socket.off('selectWord');
      socket.off('wordSelected');
      socket.off('draw');
      socket.off('canvasCleared');
      socket.off('newMessage');
      socket.off('correctGuess');
      socket.off('roundEnded');
      socket.off('nextRound');
      socket.off('gameEnded');
    };
  }, [socket]);

  // Timer countdown
  useEffect(() => {
    if (!isPlaying && gameState !== 'roundEnd') return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, gameState]);

  const handleStartGame = () => {
    socket.emit('startGame', roomId);
  };

  const handleSelectWord = (index: number) => {
    socket.emit('selectWord', { roomId, wordIndex: index });
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      socket.emit('sendMessage', { roomId, message: messageInput });
      setMessageInput('');
    }
  };

  const handleDraw = (drawData: DrawingEvent) => {
    if (isDrawer && isPlaying) {
      socket.emit('draw', { roomId, drawData });
    }
  };

  const drawer = players.find((p) => p.isDrawer);

  return (
    <div className="w-full h-screen bg-gray-950 flex flex-col overflow-hidden">
      <div className="absolute w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl -top-20 -right-20" />

      {/* Header */}
      <div className="flex justify-between items-center px-2 sm:px-4 py-2 sm:py-4 border-b border-gray-800 relative z-10 flex-shrink-0">
        <h1 className="text-lg sm:text-2xl font-bold text-white">🎨 Skribbl</h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-gray-400 text-xs sm:text-sm">Room: <span className="text-indigo-400 font-semibold">{roomId}</span></span>
          <button
            onClick={onBack}
            className="px-2 sm:px-4 py-1 sm:py-2 bg-gray-800 hover:bg-gray-700 text-white rounded text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Leave
          </button>
        </div>
      </div>

      {/* Game Lobby */}
      {gameState === 'lobby' && (
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-8 max-w-xs sm:max-w-sm w-full text-center mx-4">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Waiting for Players</h2>
            <div className="space-y-2 mb-4 sm:mb-6 max-h-40 overflow-y-auto">
              {players.map((player) => (
                <div key={player.id} className="px-3 py-2 bg-gray-800 rounded text-gray-300 text-xs sm:text-sm">
                  {player.name}
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">{players.length} player{players.length !== 1 ? 's' : ''} (need 2+)</p>
            {players.length >= 2 && (
              <button
                onClick={handleStartGame}
                className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded transition-colors cursor-pointer text-xs sm:text-sm"
              >
                Start Game
              </button>
            )}
          </div>
        </div>
      )}

      {/* Word Selection */}
      {gameState === 'wordSelection' && isDrawer && (
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-8 max-w-xs sm:max-w-sm w-full text-center mx-4">
            <h2 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Choose a Word</h2>
            <div className="space-y-2">
              {wordOptions.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectWord(index)}
                  className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition-colors cursor-pointer text-xs sm:text-sm capitalize"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Playing State - Responsive Grid */}
      {isPlaying && (
        <div className="flex-1 flex flex-col lg:flex-row gap-2 sm:gap-3 relative z-10 overflow-hidden px-2 sm:px-4 py-2 sm:py-3">
          {/* Canvas - Full Width on Mobile, Left Side on Desktop */}
          <div className="flex-1 flex flex-col gap-2 sm:gap-3 min-h-0">
            {/* Top Info Bar */}
            <div className="flex justify-between items-center bg-gray-900 border border-gray-800 rounded-lg p-2 sm:p-3 flex-shrink-0">
              <div className="text-xs sm:text-sm">
                <p className="text-gray-400 text-xs">{isDrawer ? '🎨 Drawing' : '👀 Guessing'}</p>
                <p className="text-white font-semibold text-sm sm:text-base truncate">{drawer?.name}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs">Round {roundNumber}/{totalRounds}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">Time</p>
                <p className={`text-xl sm:text-2xl font-bold ${timer <= 10 ? 'text-red-500' : 'text-indigo-400'}`}>
                  {timer}s
                </p>
              </div>
            </div>

            {/* Canvas - Takes remaining space */}
            <div className="flex-1 min-h-0">
              <DrawingCanvas 
                isDrawer={isDrawer} 
                onDraw={handleDraw} 
                drawingEvents={drawingEvents} 
                isPlaying={isPlaying} 
              />
            </div>
          </div>

          {/* Right Sidebar - Responsive Width */}
          <div className="w-full lg:w-56 xl:w-64 flex flex-col gap-2 sm:gap-3 min-h-0">
            {/* Scoreboard */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-2 sm:p-4">
              <h3 className="text-white font-bold text-xs sm:text-sm mb-2 sm:mb-3">Scores</h3>
              <div className="space-y-1 sm:space-y-2 max-h-24 sm:max-h-32 overflow-y-auto">
                {players
                  .sort((a, b) => b.score - a.score)
                  .map((player, idx) => (
                    <div key={player.id} className="flex justify-between items-center text-xs">
                      <span className="text-gray-300 truncate">
                        {idx + 1}. {player.name.substring(0, 15)}
                      </span>
                      <span className="text-white font-bold flex-shrink-0 ml-2">{player.score}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Chat */}
            <div className="flex-1 bg-gray-900 border border-gray-800 rounded-lg p-2 sm:p-4 flex flex-col min-h-0">
              <h3 className="text-white font-bold text-xs sm:text-sm mb-1 sm:mb-2">Guesses</h3>
              <div className="flex-1 overflow-y-auto space-y-0.5 sm:space-y-1 mb-2 sm:mb-3">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`text-xs line-clamp-2 ${msg.isCorrect ? 'text-green-400 font-semibold' : 'text-gray-400'}`}>
                    <span className="text-gray-500">{msg.playerName}:</span> {msg.message}
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              {!isDrawer && (
                <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Guess..."
                    className="flex-1 px-2 sm:px-3 py-1 sm:py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-xs sm:text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-2 sm:px-3 py-1 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors cursor-pointer text-xs sm:text-sm font-semibold"
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Round End State */}
      {gameState === 'roundEnd' && (
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-8 max-w-xs sm:max-w-sm w-full text-center mx-4">
            <h2 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Round {roundNumber} Results</h2>
            <div className="space-y-2 mb-4 sm:mb-6 max-h-40 overflow-y-auto">
              {leaderboard.map((player, idx) => (
                <div key={idx} className="flex justify-between items-center px-3 py-2 bg-gray-800 rounded text-xs sm:text-sm">
                  <span className="text-gray-300 truncate">{idx + 1}. {player.name}</span>
                  <span className="text-white font-bold flex-shrink-0 ml-2">{player.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Game End State */}
      {gameEnded && (
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-8 max-w-xs sm:max-w-sm w-full text-center mx-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">🏆 Game Over!</h2>
            <div className="space-y-2 mb-4 sm:mb-6 mt-4 sm:mt-6 max-h-40 overflow-y-auto">
              {leaderboard.map((player, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-2 rounded text-xs sm:text-sm font-semibold flex justify-between items-center ${
                    idx === 0
                      ? 'bg-yellow-600/20 text-yellow-400'
                      : idx === 1
                        ? 'bg-gray-600/20 text-gray-300'
                        : 'bg-orange-600/20 text-orange-400'
                  }`}
                >
                  <span>{idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'} {player.name}</span>
                  <span>{player.score}</span>
                </div>
              ))}
            </div>
            <button
              onClick={onBack}
              className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded transition-colors cursor-pointer text-sm"
            >
              Back to Lobby
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
