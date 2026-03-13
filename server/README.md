# Skribbl.io Multiplayer Drawing Game Setup Guide

## Project Overview

This is a complete multiplayer drawing and guessing game (similar to Skribbl.io) with both frontend and backend components.

### Features
- **Real-time multiplayer**: Up to multiple players in one room
- **Drawing canvas**: Full drawing tools with color picker, brush size, and eraser
- **Live chat system**: Players can guess in real-time
- **Scoring system**: Points awarded for correct guesses and drawing
- **Countdown timer**: 80-second rounds
- **Leaderboard**: Track points throughout the game
- **Clean UI**: Modern, responsive interface

## Prerequisites

Before running the game, make sure you have:
- Node.js (v16 or higher)
- npm (comes with Node.js)

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Game

### Option 1: Run Frontend and Server Separately

**Terminal 1 - Start the Vite development server (Frontend)**:
```bash
npm run dev
```
This will start the frontend on `http://localhost:5173`

**Terminal 2 - Start the Node server (Backend)**:
```bash
npm run dev:server
```
This will start the server on `http://localhost:3001`

### Option 2: Run Everything Together

```bash
npm run dev:all
```
This uses `concurrently` to run both the frontend and server at the same time.

## How to Play

### 1. Start the Game
- Open your browser and go to `http://localhost:5173`
- Click "Get Started" → Select "Skribbl Game"

### 2. Join a Room
- Enter your player name
- Enter or generate a room code (share this with friends)
- Click "Join Room"

### 3. Wait for Other Players
- Share the room code with friends
- Once 2+ players join, the "Start Game" button appears
- Click "Start Game" to begin

### 4. Game Flow
- **Round 1**: One player is selected as the "drawer"
- **Drawer's turn**: Choose one of 3 word options
- **Drawing phase**: Drawer has 80 seconds to draw the word
- **Guessing phase**: Other players type guesses in the chat
- **Scoring**:
  - Correct guesser: Points based on speed (50-10 points)
  - Drawer: Gets half the points from correct guesses
- **Continue**: After round ends, next player becomes drawer
- **Game End**: After 3 rounds, game ends with final leaderboard

## Server Architecture

### Main Files

**server/index.js** - Main Express/Socket.io server
- Handles room creation and management
- Manages socket connections and events
- Real-time communication with clients

**server/gameManager.js** - Game logic
- `GameRoom` class: Manages a single game room
- `GameManager` class: Manages all rooms
- Word selection and guessing logic
- Scoring calculations

**server/wordList.js** - Word database
- Contains 200+ words across various categories
- `getRandomWords()`: Returns 3 random words for drawer to choose from

### Socket Events

**Client → Server**:
- `joinRoom`: Player joins a room
- `leaveRoom`: Player leaves a room
- `startGame`: Start new game
- `selectWord`: Drawer selects a word
- `draw`: Send drawing data
- `guess`: Player makes a guess
- `sendMessage`: Send chat message
- `clearCanvas`: Clear drawing canvas

**Server → Client**:
- `roomState`: Initial room state
- `playerJoined`: New player joined
- `playerLeft`: Player left room
- `gameStarted`: Game initialization
- `selectWord`: Tell drawer to select word
- `wordSelected`: Word selected, game starts
- `draw`: Receive drawing updates
- `canvasCleared`: Canvas was cleared
- `newMessage`: New chat message
- `correctGuess`: Someone guessed correctly
- `roundEnded`: Round ended
- `nextRound`: Start next round
- `gameEnded`: Game finished

## Deployment

### To Vercel
```bash
npm run deploy
```

### Environmental Variables
For production, you may need to set:
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Set to 'production'

## Game Rules

1. **Drawer Selection**: One random player per round becomes the drawer
2. **Word Selection**: Drawer chooses from 3 options
3. **Round Duration**: 80 seconds per round
4. **Guessing**: Only non-drawer players can guess
5. **Winning**: First correct guess wins the most points
6. **Scoring**:
   - Correct guess: 50 - (seconds/2) points, minimum 10
   - Drawer: Gets 50% of guesser's points
7. **Rounds**: 3 total rounds per game

## Customization

### To Change Round Duration
Edit `server/gameManager.js`, line 15:
```javascript
this.roundDuration = 80; // Change this value (in seconds)
```

### To Change Number of Rounds
Edit `server/gameManager.js`, line 16:
```javascript
this.totalRounds = 3; // Change this value
```

### To Add More Words
Edit `server/wordList.js` and add words to the `words` array.

## Troubleshooting

### "Cannot connect to server"
- Make sure the Node server is running on port 3001
- Check if port 3001 is not blocked by firewall
- Try restarting both frontend and server

### Socket connection timeout
- Ensure both frontend and server are running
- Check browser console for error messages
- Verify network connectivity

### Drawing not syncing
- Check that server is receiving draw events
- Ensure other players' browsers are updated
- Try refreshing the page

## Browser Support

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Notes

- Supports up to 50 players per room (recommended: 2-10)
- Drawing events are transmitted in real-time
- Leaderboard updates instantly
- Canvas rendering uses HTML5 Canvas API

## Future Enhancements

Possible improvements:
- Add undo/redo buttons
- Multiple game modes (hints, categories)
- Player profiles and statistics
- Custom word lists
- Different timer lengths
- Voice chat integration
- Mobile app version
- Replay system

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, check:
1. The troubleshooting section above
2. Browser console for error messages
3. Server console logs for backend issues
