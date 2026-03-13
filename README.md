# WebGame — Challenge the Computer

A browser-based game platform built with React, TypeScript, Tailwind CSS, and React Native Web. Play classic board games against an AI opponent, or enjoy multiplayer drawing games with friends!

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?logo=socket.io&logoColor=white)

---

## Features

### Landing Page
- Animated gradient background with an elegant "Challenge the Computer" title
- Get Started call-to-action button
- Responsive design

### Game Selection
- **Tic Tac Toe** — Classic board game with AI
- **Skribbl Game** — NEW! Multiplayer drawing and guessing game

### Tic Tac Toe
- Smart AI using **Minimax** algorithm (perfect play)
- Local 2-player mode — take turns on the same screen
- Win detection with highlighted winning cells
- Persistent scoreboard across rounds
- Play Again and Change Grid options

### Skribbl Game (Multiplayer Drawing & Guessing)
- **Real-time multiplayer** — Play with friends online
- **Drawing canvas** — Full drawing tools with color picker and brush sizes
- **Smart guessing** — Real-time chat system for guesses
- **Scoring system** — Points for correct guesses and drawing
- **Countdown timer** — 80-second timed rounds
- **Leaderboard** — Track scores throughout the game
- **Room-based gameplay** — Join with room codes
- **Socket.io** — Real-time communication for multiplayer

---

## Tech Stack

| Layer          | Technology                                       |
| -------------- | ------------------------------------------------ |
| **Frontend**   | React 19 + TypeScript                            |
| **Styling**    | Tailwind CSS v4 (via `@tailwindcss/vite` plugin)  |
| **Components** | React Native Web (cross-platform primitives)      |
| **Bundler**    | Vite 7                                           |
| **Backend**    | Node.js + Express                                |
| **Real-time**  | Socket.io                                        |
| **Linting**    | ESLint 9 with React Hooks & Refresh plugins       |
| **Deployment** | Vercel                                           |

---

## Project Structure

```
WebGame/
├── public/                  # Static assets
├── server/                  # Backend (Node.js + Socket.io)
│   ├── index.js            # Main server & socket setup
│   ├── gameManager.js      # Game logic & room management
│   ├── wordList.js         # Word database for drawing game
│   └── README.md           # Server documentation
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx          # Hero / landing screen
│   │   ├── GameSelection.tsx        # Game picker
│   │   ├── ModeSelector.tsx         # vs Computer / 2 Players
│   │   ├── GridSelector.tsx         # Board size picker
│   │   ├── TicTacToe.tsx            # Tic Tac Toe game
│   │   ├── DrawingGame.tsx          # Multiplayer drawing game wrapper
│   │   ├── DrawingGameLobby.tsx     # Room lobby screen
│   │   ├── DrawingGameRoom.tsx      # Main game screen
│   │   ├── DrawingCanvas.tsx        # Canvas drawing component
│   │   └── Greeting.jsx             # Sample JS component
│   ├── App.tsx              # Page routing / state machine
│   ├── main.tsx             # Entry point
│   ├── index.css            # Tailwind import + global styles
│   └── App.css              # Global styles
├── index.html               # HTML shell
├── vercel.json              # Vercel deployment config
├── vite.config.ts           # Vite + Tailwind config
├── tsconfig.json            # TypeScript project references
├── tsconfig.app.json        # App-level TS config
├── tsconfig.node.json       # Node/tooling TS config
├── eslint.config.js         # ESLint flat config
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
git clone <repo-url> WebGame
cd WebGame
npm install
```

### Development

#### Run Frontend Only (Tic Tac Toe)
```bash
npm run dev
```
Opens at `http://localhost:5173`

#### Run Frontend + Backend (Multiplayer Drawing Game)
```bash
npm run dev:all
```
This runs both Vite frontend and Node.js server simultaneously.

#### Run Each Separately

**Terminal 1 — Frontend:**
```bash
npm run dev
```

**Terminal 2 — Backend:**
```bash
npm run dev:server
```

Backend runs on `http://localhost:3001`

### Build

```bash
npm run build
```

Outputs production-ready files to `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Multiplayer Drawing Game (Skribbl Game)

### How It Works

1. **Join a Room** — Players enter their name and room code
2. **Start Game** — Host starts when 2+ players ready
3. **Round Flow**:
   - One player selected as drawer
   - Drawer chooses from 3 word options
   - Drawer has 80 seconds to draw the word
   - Other players guess by typing in chat
   - First correct guess wins points
4. **Scoring**:
   - Correct guess: `50 - (seconds/2)` points (min. 10)
   - Drawer: Gets 50% of each correct guesser's points
5. **3 Rounds** — Default game, then final leaderboard

### Features

- Real-time drawing synchronization across all players
- Instant chat and guess validation
- Color picker and brush size controls
- Scoreboard with live updates
- Countdown timer for each round
- Complete game statistics and winner announcement

### For More Details

See [server/README.md](server/README.md) for:
- Complete architecture overview
- Socket event reference
- Customization options
- Troubleshooting guide

---

## Deployment (Vercel)

The project includes a `vercel.json` with SPA rewrite rules.

```bash
# First time — log in
npx vercel login

# Deploy to production
npm run deploy
```

Or connect the repo to [Vercel](https://vercel.com) for automatic deployments on push.

---

## App Flow

```
Landing Page
    │
    ▼ Get Started
Game Selection
    ├──▶ Tic Tac Toe
    │       │
    │       ▼
    │   Mode Select
    │       ├──▶ vs Computer
    │       └──▶ 2 Players (local)
    │               │
    │               ▼
    │           Grid Select (3×3)
    │               │
    │               ▼
    │           Game Board
    │
    └──▶ Skribbl Game (Drawing & Guessing)
            │
            ▼
        Lobby (Join Room)
            │
            ▼
        Game Room
            ├── Word Selection (Drawer)
            ├── Drawing Phase
            ├── Guessing Phase
            ├── Round Results
            └── Final Leaderboard
```

---

## AI Details (Tic Tac Toe)

- **3×3 board**: Full **Minimax** search — the AI plays perfectly and will never lose.
- **Larger boards** (if re-enabled): Heuristic scoring with line evaluation, center bias, and offensive weighting.

---

## Scripts Reference

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start Vite dev server (frontend)         |
| `npm run dev:server` | Start Node.js backend server           |
| `npm run dev:all` | Run frontend + backend simultaneously     |
| `npm run build`   | Type-check + production build            |
| `npm run preview` | Serve the `dist/` build locally          |
| `npm run lint`    | Run ESLint                               |
| `npm run deploy`  | Deploy to Vercel (production)            |

---

## Customization

### Tic Tac Toe
- Modify AI difficulty in `src/components/TicTacToe.tsx`
- Change board size in grid selector

### Skribbl Game
- Change round duration: Edit `server/gameManager.js`
- Add more words: Edit `server/wordList.js`
- Adjust scoring: Modify `makeGuess()` in `gameManager.js`
- Change number of rounds: Edit `totalRounds` in game manager

---

## Browser Support

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Troubleshooting

### Skribbl Game Issues

**Cannot connect to server:**
- Ensure Node server is running: `npm run dev:server`
- Check port 3001 is not blocked
- Verify frontend can reach `http://localhost:3001`

**Drawing not syncing:**
- Check WebSocket connection in browser console
- Ensure all players' servers are on same network
- Try refreshing page

**Game not starting:**
- Make sure 2+ players are in the room
- Check browser console for errors
- Restart server if stuck

See [server/README.md](server/README.md) for more troubleshooting.

---

## Future Enhancements

- [ ] Mobile app (React Native)
- [ ] More game modes
- [ ] Player profiles and statistics
- [ ] Custom word lists
- [ ] Hints system
- [ ] Voice chat
- [ ] Replay system
- [ ] Achievements/badges
- [ ] Tournament mode

---

## License

This project is open source and available for educational purposes.

## Contributing

Pull requests welcome! Please ensure code passes lint checks.

```bash
npm run lint
```

---

## License

This project is private. All rights reserved.
