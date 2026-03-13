import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import DrawingGameLobby from './DrawingGameLobby';
import DrawingGameRoom from './DrawingGameRoom';

interface DrawingGameProps {
  onBack: () => void;
}

export default function DrawingGame({ onBack }: DrawingGameProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [screen, setScreen] = useState<'lobby' | 'room'>('lobby');
  const [roomId, setRoomId] = useState('');
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    // Connect to server
    const newSocket = io('http://localhost:3001', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleJoinRoom = (room: string, name: string) => {
    if (socket && room && name) {
      setRoomId(room);
      setPlayerName(name);
      socket.emit('joinRoom', { roomId: room, playerName: name });
      setScreen('room');
    }
  };

  const handleBack = () => {
    if (socket && roomId) {
      socket.emit('leaveRoom', roomId);
    }
    setScreen('lobby');
    setRoomId('');
    setPlayerName('');
    onBack();
  };

  if (!socket) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm sm:text-base">Connecting to server...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {screen === 'lobby' ? (
        <DrawingGameLobby socket={socket} onJoinRoom={handleJoinRoom} onBack={onBack} />
      ) : (
        <DrawingGameRoom socket={socket} roomId={roomId} playerName={playerName} onBack={handleBack} />
      )}
    </>
  );
}
