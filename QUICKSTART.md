# Quick Start Guide

Get your game platforms up and running in minutes!

## System Requirements

- **Node.js** 18 or higher ([download](https://nodejs.org/))
- **npm** 9 or higher (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation (One Time)

```bash
# 1. Navigate to the project directory
cd WebGame

# 2. Install all dependencies
npm install
```

This will install all required packages for both frontend and backend.

## Running the Games

### Option A: Run Everything (Recommended for Multiplayer)

```bash
npm run dev:all
```

This command:
- Starts the frontend on `http://localhost:5173`
- Starts the backend on `http://localhost:3001`
- Both run simultaneously

Then open your browser to `http://localhost:5173`

### Option B: Run Frontend Only (For Tic Tac Toe)

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Option C: Manual - Run Separately

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
npm run dev:server
```

## Testing the Multiplayer Drawing Game

1. **First Player (Host)**:
   - Open `http://localhost:5173`
   - Click "Get Started"
   - Select "Skribbl Game"
   - Enter your name
   - Click "Generate" to create a room code
   - Click "Join Room"

2. **Second Player (Guest)**:
   - Open a new browser tab with `http://localhost:5173`
   - Click "Get Started"
   - Select "Skribbl Game"
   - Enter your name
   - Enter the room code from Player 1
   - Click "Join Room"

3. **Start Game**:
   - Back on Player 1's browser
   - Click "Start Game" button
   - Follow the on-screen instructions

4. **Play**:
   - Player 1 (drawer) draws the word
   - Player 2 types guesses in the chat box
   - Score points and complete 3 rounds!

## Troubleshooting

### "Cannot connect to server"
- Make sure `npm run dev:server` is running (port 3001)
- Check that the Node.js process hasn't crashed
- Restart the server: `npm run dev:server`

### Drawing canvas is blank
- Refresh your browser page
- Make sure you're the drawer in the current round
- Check that the drawing game started (not stuck in word selection)

### No players appear in lobby
- Verify both frontend and backend are running
- Try refreshing the page
- Make sure you're using the same room code

### Port already in use
- Another process is using port 5173 or 3001
- Either close that process, or change the port:
  ```bash
  # For frontend on different port
  npm run dev -- --port 5174
  
  # For backend, edit server/index.js and change PORT
  ```

## Next Steps

- **Customize the game**: See [server/README.md](server/README.md)
- **Deploy to Vercel**: Run `npm run deploy`
- **Read full documentation**: Check [README.md](README.md)

## Tips for Playing

- **Drawer**: Draw simple, recognizable shapes and strokes
- **Guesser**: Look for clues and common word patterns
- **Speed**: Guess quickly for more points!
- **Teamwork**: Better drawings = faster guesses = more points

## Need Help?

1. Check [README.md](README.md) for detailed documentation
2. See [server/README.md](server/README.md) for backend info
3. Check browser console (F12) for error messages
4. Check Terminal for server logs

---

**Happy Gaming!** 🎮🎨
