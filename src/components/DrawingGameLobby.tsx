import { useState } from 'react';
import { Socket } from 'socket.io-client';

interface DrawingGameLobbyProps {
  socket: Socket;
  onJoinRoom: (roomId: string, playerName: string) => void;
  onBack: () => void;
}

export default function DrawingGameLobby({ onJoinRoom, onBack }: Omit<DrawingGameLobbyProps, 'socket'>) {
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!roomId.trim()) {
      setError('Please enter a room ID');
      return;
    }

    setError('');
    onJoinRoom(roomId, playerName);
  };

  const generateRoomId = () => {
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(id);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJoin();
    }
  };

  return (
    <div className="w-full h-full bg-gray-950 flex flex-col items-center justify-center p-3 sm:p-4 relative overflow-hidden">
      <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/5 rounded-full blur-3xl -top-20 -right-20" />

      <button
        onClick={onBack}
        className="absolute top-3 sm:top-8 left-3 sm:left-8 text-gray-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
      >
        <span>←</span> Back
      </button>

      <div className="relative z-10 w-full max-w-xs sm:max-w-sm px-2">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-5xl sm:text-6xl mb-2 sm:mb-3">🎨</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Skribbl</h1>
          <p className="text-gray-400 text-xs sm:text-sm">Draw, guess, win points</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-8 space-y-4 sm:space-y-5">
          {/* Player Name Input */}
          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase">Your Name</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter name"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
            />
          </div>

          {/* Room ID Input */}
          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase">Room Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                placeholder="Enter code"
                maxLength={6}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors uppercase text-sm font-mono"
              />
              <button
                onClick={generateRoomId}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors cursor-pointer text-xs sm:text-sm flex-shrink-0"
              >
                Gen
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-400 text-xs bg-red-900/20 border border-red-700/30 rounded-lg p-2 sm:p-3">{error}</div>}

          {/* Join Button */}
          <button
            onClick={handleJoin}
            className="w-full px-6 py-2 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors cursor-pointer text-sm"
          >
            Join Room
          </button>

          {/* Info */}
          <div className="border-t border-gray-800 pt-3 sm:pt-5 text-left text-xs text-gray-400 space-y-0.5 sm:space-y-1">
            <p className="font-semibold text-gray-300 mb-1 sm:mb-2">How to play:</p>
            <p>✓ Generate or enter room code</p>
            <p>✓ Share code with friends</p>
            <p>✓ One player draws each round</p>
            <p>✓ Others guess word</p>
            <p>✓ Fastest guess = most points</p>
          </div>
        </div>
      </div>
    </div>
  );
}
